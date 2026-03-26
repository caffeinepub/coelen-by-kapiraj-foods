import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Stripe "stripe/stripe";
import MixinAuthorization "authorization/MixinAuthorization";
import OutCall "http-outcalls/outcall";
import AccessControl "authorization/access-control";


// Restore old state on upgrade using migration module

actor {
  // Include authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Type Definitions
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Text;
    category : Text;
    isAvailable : Bool;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      switch (product1.id, product2.id) {
        case (id1, id2) {
          if (id1 < id2) { #less } else if (id1 > id2) { #greater } else {
            Text.compare(product1.name, product2.name);
          };
        };
      };
    };
  };

  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type OrderItem = {
    productName : Text;
    quantity : Text;
    price : Text;
  };

  type FoodOrder = {
    id : Nat;
    customerName : Text;
    phone : Text;
    address : Text;
    items : [OrderItem];
    timestamp : Int;
    paymentStatus : Text;
    owner : Principal;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  // Stripe config, initially null (not configured)
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Data storage
  let productCatalog = Map.empty<Nat, Product>();
  let contactInquiries = Map.empty<Nat, Inquiry>();
  let foodOrders = List.empty<FoodOrder>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextInquiryId = 1;
  var nextOrderId = 1;
  var nextProductId = 100;

  // Seed product catalog with all 30 food powder products
  let initialProducts : [Product] = [
    // Spices
    { id = 1;  name = "Turmeric Powder";      description = "Vibrant golden turmeric, sun-dried and stone-ground. Rich in curcumin for colour and wellness.";                                                                              price = "120"; category = "Spices";     isAvailable = true; },
    { id = 2;  name = "Kashmiri Chilli Powder"; description = "Bright red, mildly hot Kashmiri chilli that gives dishes a stunning colour without overpowering heat.";                                                                   price = "150"; category = "Spices";     isAvailable = true; },
    { id = 4;  name = "Coriander Powder";      description = "Earthy, citrusy coriander seeds cleaned and freshly milled to a fine powder. Excellent for curries.";                                                                        price = "110"; category = "Spices";     isAvailable = true; },
    { id = 6;  name = "Cumin Powder";          description = "Toasted cumin seeds ground to release their nutty, smoky aroma. A kitchen essential.";                                                                                       price = "130"; category = "Spices";     isAvailable = true; },
    { id = 14; name = "Black Pepper Powder";   description = "Bold and pungent black pepper freshly ground from handpicked whole peppercorns. The king of spices.";                                                                       price = "160"; category = "Spices";     isAvailable = true; },
    { id = 15; name = "Cardamom Powder";       description = "Fragrant green cardamom pods finely ground to release their floral, sweet aroma. Perfect for sweets, chai, and biryanis.";                                                  price = "350"; category = "Spices";     isAvailable = true; },
    { id = 16; name = "Fenugreek Powder";      description = "Slightly bitter, nutty fenugreek seeds milled to a smooth powder. A digestive spice essential in Indian cooking.";                                                          price = "100"; category = "Spices";     isAvailable = true; },
    { id = 17; name = "Dry Ginger Powder";     description = "Sun-dried ginger root ground to a pungent, warming powder. Great for teas, curries, and digestive health.";                                                                 price = "140"; category = "Spices";     isAvailable = true; },
    // Masalas
    { id = 3;  name = "Garam Masala";          description = "A warming blend of whole spices slow-roasted and freshly ground. Aromatic and deeply flavourful.";                                                                          price = "180"; category = "Masalas";    isAvailable = true; },
    { id = 18; name = "Sambar Powder";         description = "Authentic South Indian sambar masala with the perfect balance of lentils, chillies, and aromatic spices.";                                                                   price = "160"; category = "Masalas";    isAvailable = true; },
    { id = 19; name = "Rasam Powder";          description = "Tangy, peppery rasam masala with cumin, coriander, and dried red chillies. The secret to a comforting South Indian rasam.";                                                 price = "150"; category = "Masalas";    isAvailable = true; },
    { id = 20; name = "Chole Masala";          description = "Bold, smoky blend of roasted spices crafted for authentic Punjabi chole. Delivers rich, deep flavour.";                                                                    price = "170"; category = "Masalas";    isAvailable = true; },
    { id = 21; name = "Pav Bhaji Masala";      description = "The signature spice blend for Mumbai-style pav bhaji — buttery, tangy, and beautifully aromatic.";                                                                          price = "165"; category = "Masalas";    isAvailable = true; },
    { id = 22; name = "Kitchen King Masala";   description = "A versatile all-in-one masala blend that transforms any vegetable or paneer dish into a restaurant-quality meal.";                                                          price = "190"; category = "Masalas";    isAvailable = true; },
    // Beverages
    { id = 5;  name = "Chai Masala";           description = "A fragrant blend of ginger, cardamom, cinnamon, and clove — perfect for a comforting cup of chai.";                                                                         price = "200"; category = "Beverages";  isAvailable = true; },
    { id = 23; name = "Haldi Doodh Mix";       description = "Traditional golden milk mix with turmeric, ashwagandha, and warming spices. Stir into warm milk for a nourishing bedtime drink.";                                         price = "220"; category = "Beverages";  isAvailable = true; },
    { id = 24; name = "Moringa Latte Mix";     description = "Creamy moringa green latte blend with oat powder and vanilla. A nourishing, earthy alternative to coffee.";                                                                 price = "250"; category = "Beverages";  isAvailable = true; },
    { id = 25; name = "Tulsi Green Tea Powder"; description = "Antioxidant-rich holy basil combined with fine green tea powder. A calming, immune-boosting drink.";                                                                      price = "230"; category = "Beverages";  isAvailable = true; },
    { id = 26; name = "Ashwagandha Milk Mix";  description = "Adaptogenic ashwagandha blended with warm spices and honey powder. Mix into milk for a stress-relieving night drink.";                                                     price = "280"; category = "Beverages";  isAvailable = true; },
    // Wellness
    { id = 8;  name = "Amla Powder";           description = "Pure Indian gooseberry dried and powdered. A superfood powerhouse for immunity and vitality.";                                                                              price = "160"; category = "Wellness";   isAvailable = true; },
    { id = 27; name = "Moringa Powder";        description = "Nutrient-dense moringa leaf powder. Rich in iron, calcium, and antioxidants for daily wellness.";                                                                          price = "200"; category = "Wellness";   isAvailable = true; },
    { id = 28; name = "Ashwagandha Powder";    description = "Pure ashwagandha root powder, an ancient adaptogen that reduces stress and boosts energy and immunity.";                                                                   price = "250"; category = "Wellness";   isAvailable = true; },
    { id = 29; name = "Neem Powder";           description = "Pure neem leaf powder known for its powerful antibacterial, antifungal, and skin-purifying properties.";                                                                   price = "120"; category = "Wellness";   isAvailable = true; },
    { id = 30; name = "Wheatgrass Powder";     description = "Young wheat shoots dried and powdered into a nutrient-packed superfood. Great for detox and energy.";                                                                     price = "180"; category = "Wellness";   isAvailable = true; },
    { id = 31; name = "Triphala Powder";       description = "Traditional Ayurvedic blend of three fruits — amla, bibhitaki, and haritaki — for digestion and detox.";                                                                 price = "190"; category = "Wellness";   isAvailable = true; },
    // Dehydrated
    { id = 9;  name = "Onion Powder";          description = "Farm-fresh onions dehydrated and finely milled. Adds instant rich onion flavour to any dish without chopping.";                                                           price = "130"; category = "Dehydrated"; isAvailable = true; },
    { id = 10; name = "Garlic Powder";         description = "Sun-dried whole garlic cloves ground to a smooth powder. Concentrated flavour for marinades, sauces, and curries.";                                                       price = "140"; category = "Dehydrated"; isAvailable = true; },
    { id = 11; name = "Banana Powder";         description = "Ripe bananas slow-dried and milled into a fine powder. Naturally sweet, great for smoothies, baby food, and baking.";                                                   price = "150"; category = "Dehydrated"; isAvailable = true; },
    { id = 12; name = "Beetroot Powder";       description = "Vibrant deep-red beetroots dehydrated and powdered. Rich in nitrates and antioxidants — perfect for juices and lattes.";                                               price = "170"; category = "Dehydrated"; isAvailable = true; },
    { id = 13; name = "Spinach Powder";        description = "Fresh spinach leaves dehydrated and milled to a fine powder. Packed with iron and vitamins for smoothies and cooking.";                                               price = "140"; category = "Dehydrated"; isAvailable = true; },
  ];

  for (product in initialProducts.values()) {
    productCatalog.add(product.id, product);
  };

  // Transform function for HTTP outcalls
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Catalog Management
  public query func getProducts() : async [Product] {
    productCatalog.values().toArray().sort();
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    productCatalog.values().toArray().filter(
      func(product) {
        Text.compare(category, product.category) == #equal;
      }
    );
  };

  public query func isProductAvailable(id : Nat) : async Bool {
    switch (productCatalog.get(id)) {
      case (null) { Runtime.trap("Product does not exist.") };
      case (?product) { product.isAvailable };
    };
  };

  public shared ({ caller }) func submitContactInquiry(name : Text, email : Text, message : Text) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactInquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
  };

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Text, category : Text, isAvailable : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      category;
      isAvailable;
    };
    productCatalog.add(nextProductId, product);
    nextProductId += 1;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, price : Text, category : Text, isAvailable : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (productCatalog.get(id)) {
      case (null) { Runtime.trap("Product does not exist.") };
      case (?_) {
        let product : Product = {
          id;
          name;
          description;
          price;
          category;
          isAvailable;
        };
        productCatalog.add(id, product);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    switch (productCatalog.get(id)) {
      case (null) { Runtime.trap("Product does not exist.") };
      case (?_) {
        productCatalog.remove(id);
      };
    };
  };

  // Food Order Management
  public shared ({ caller }) func placeOrder(customerName : Text, phone : Text, address : Text, items : [OrderItem]) : async () {
    let order : FoodOrder = {
      id = nextOrderId;
      customerName;
      phone;
      address;
      items;
      timestamp = Time.now();
      paymentStatus = "COD";
      owner = caller;
    };
    foodOrders.add(order);
    nextOrderId += 1;
  };

  public query ({ caller }) func getOrders() : async [FoodOrder] {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      foodOrders.toArray();
    } else {
      foodOrders.toArray().filter(
        func(order : FoodOrder) : Bool {
          Principal.equal(order.owner, caller);
        }
      );
    };
  };

  public query ({ caller }) func getContactInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact inquiries");
    };
    contactInquiries.values().toArray();
  };

  // Stripe Payment Integration

  /// Returns whether the Stripe is configured or not
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set Stripe configuration");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  // Helper Functions

  func parseRupees(price : Text) : Nat {
    var result = 0;
    var found = false;
    for (c in price.chars()) {
      if (c >= '0' and c <= '9') {
        result := result * 10 + (Nat32.toNat(Char.toNat32(c)) - 48);
        found := true;
      } else if (found) {
        return result;
      };
    };
    result;
  };

  func textToNat(t : Text) : Nat {
    var result = 0;
    for (c in t.chars()) {
      if (c >= '0' and c <= '9') {
        result := result * 10 + (Nat32.toNat(Char.toNat32(c)) - 48);
      };
    };
    result;
  };
};

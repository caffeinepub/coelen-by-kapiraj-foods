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

  // Seed product catalog with sample food powder products
  let initialProducts : [Product] = [
    {
      id = 1;
      name = "Turmeric Powder";
      description = "Pure turmeric powder with vibrant color and aroma.";
      price = "\u{20B9}50 for 200g";
      category = "Spices";
      isAvailable = true;
    },
    {
      id = 2;
      name = "Red Chili Powder";
      description = "Fiery red chili powder made from quality chilies.";
      price = "\u{20B9}60 for 200g";
      category = "Spices";
      isAvailable = true;
    },
    {
      id = 3;
      name = "Coriander Powder";
      description = "Roasted coriander seeds, ground to perfection.";
      price = "\u{20B9}40 for 200g";
      category = "Spices";
      isAvailable = true;
    },
    {
      id = 4;
      name = "Cumin Powder";
      description = "Aromatic cumin powder for flavorful Indian dishes.";
      price = "\u{20B9}55 for 200g";
      category = "Spices";
      isAvailable = true;
    },
    {
      id = 5;
      name = "Garam Masala";
      description = "Premium blend of authentic Indian spices.";
      price = "\u{20B9}80 for 100g";
      category = "Spices";
      isAvailable = true;
    },
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

import { useGetProducts } from "@/hooks/useQueries";
import { Search } from "lucide-react";
import type { Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../backend.d";
import { useNavigation } from "../context/NavigationContext";

export const PRODUCT_IMAGES: Record<string, string> = {
  "Turmeric Powder": "/assets/generated/product-turmeric.dim_400x300.jpg",
  "Kashmiri Chilli Powder":
    "/assets/generated/product-kashmiri-chilli.dim_400x300.jpg",
  "Garam Masala": "/assets/generated/product-garam-masala.dim_400x300.jpg",
  "Coriander Powder": "/assets/generated/product-coriander.dim_400x300.jpg",
  "Chai Masala": "/assets/generated/product-chai-masala.dim_400x300.jpg",
  "Cumin Powder": "/assets/generated/product-cumin.dim_400x300.jpg",
  "Amla Powder": "/assets/generated/product-amla.dim_400x300.jpg",
  "Onion Powder": "/assets/generated/product-onion.dim_400x300.jpg",
  "Garlic Powder": "/assets/generated/product-garlic.dim_400x300.jpg",
  "Banana Powder": "/assets/generated/product-banana.dim_400x300.jpg",
  "Beetroot Powder": "/assets/generated/product-beetroot.dim_400x300.jpg",
  "Spinach Powder": "/assets/generated/product-spinach.dim_400x300.jpg",
  "Black Pepper Powder":
    "/assets/generated/product-black-pepper.dim_400x300.jpg",
  "Cardamom Powder": "/assets/generated/product-cardamom.dim_400x300.jpg",
  "Fenugreek Powder": "/assets/generated/product-fenugreek.dim_400x300.jpg",
  "Dry Ginger Powder": "/assets/generated/product-dry-ginger.dim_400x300.jpg",
  "Sambar Powder": "/assets/generated/product-sambar.dim_400x300.jpg",
  "Rasam Powder": "/assets/generated/product-rasam.dim_400x300.jpg",
  "Chole Masala": "/assets/generated/product-chole-masala.dim_400x300.jpg",
  "Pav Bhaji Masala":
    "/assets/generated/product-pav-bhaji-masala.dim_400x300.jpg",
  "Kitchen King Masala":
    "/assets/generated/product-kitchen-king-masala.dim_400x300.jpg",
  "Haldi Doodh Mix": "/assets/generated/product-haldi-doodh.dim_400x300.jpg",
  "Moringa Latte Mix":
    "/assets/generated/product-moringa-latte.dim_400x300.jpg",
  "Tulsi Green Tea Powder":
    "/assets/generated/product-tulsi-green-tea.dim_400x300.jpg",
  "Ashwagandha Milk Mix":
    "/assets/generated/product-ashwagandha-milk.dim_400x300.jpg",
  "Moringa Powder": "/assets/generated/product-moringa.dim_400x300.jpg",
  "Ashwagandha Powder": "/assets/generated/product-ashwagandha.dim_400x300.jpg",
  "Neem Powder": "/assets/generated/product-neem.dim_400x300.jpg",
  "Wheatgrass Powder": "/assets/generated/product-wheatgrass.dim_400x300.jpg",
  "Triphala Powder": "/assets/generated/product-triphala.dim_400x300.jpg",
};

// Category glow colors for the new dark glassmorphism cards
export const CATEGORY_GLOW: Record<string, string> = {
  Spices: "rgba(249,115,22,0.35)",
  Masalas: "rgba(239,68,68,0.35)",
  Beverages: "rgba(20,184,166,0.35)",
  Wellness: "rgba(34,197,94,0.35)",
  Dehydrated: "rgba(168,85,247,0.35)",
};

export const CATEGORY_ACCENT_COLOR: Record<string, string> = {
  Spices: "oklch(0.62 0.19 50)",
  Masalas: "oklch(0.58 0.22 25)",
  Beverages: "oklch(0.55 0.15 195)",
  Wellness: "oklch(0.52 0.17 155)",
  Dehydrated: "oklch(0.55 0.20 310)",
};

export const CATEGORY_BADGE_BG: Record<string, string> = {
  Spices: "rgba(249,115,22,0.15)",
  Masalas: "rgba(239,68,68,0.15)",
  Beverages: "rgba(20,184,166,0.15)",
  Wellness: "rgba(34,197,94,0.15)",
  Dehydrated: "rgba(168,85,247,0.15)",
};

// Legacy exports used by ProductDetailPage
export const CATEGORY_COLORS: Record<string, string> = {
  Spices: "from-orange-50 to-amber-50 border-orange-200",
  Masalas: "from-rose-50 to-red-50 border-rose-200",
  Beverages: "from-teal-50 to-cyan-50 border-teal-200",
  Wellness: "from-green-50 to-emerald-50 border-green-200",
  Dehydrated: "from-yellow-50 to-lime-50 border-yellow-200",
};
export const CATEGORY_BADGE_COLORS: Record<string, string> = {
  Spices: "bg-orange-100 text-orange-800 border-orange-300",
  Masalas: "bg-rose-100 text-rose-800 border-rose-300",
  Beverages: "bg-teal-100 text-teal-800 border-teal-300",
  Wellness: "bg-green-100 text-green-800 border-green-300",
  Dehydrated: "bg-yellow-100 text-yellow-800 border-yellow-300",
};
export const CATEGORY_ACCENT: Record<string, string> = {
  Spices: "bg-gradient-to-r from-amber-400 to-orange-400",
  Masalas: "bg-gradient-to-r from-red-400 to-rose-500",
  Beverages: "bg-gradient-to-r from-teal-400 to-cyan-500",
  Wellness: "bg-gradient-to-r from-green-400 to-emerald-500",
  Dehydrated: "bg-gradient-to-r from-yellow-400 to-lime-500",
};
export const CATEGORY_BTN: Record<string, string> = {
  Spices: "bg-orange-500 hover:bg-orange-600 text-white",
  Masalas: "bg-rose-500 hover:bg-rose-600 text-white",
  Beverages: "bg-teal-600 hover:bg-teal-700 text-white",
  Wellness: "bg-green-600 hover:bg-green-700 text-white",
  Dehydrated: "bg-yellow-600 hover:bg-yellow-700 text-white",
};
export const CATEGORY_BTN_OUTLINE: Record<string, string> = {
  Spices: "border-orange-500 text-orange-600 hover:bg-orange-50",
  Masalas: "border-rose-500 text-rose-600 hover:bg-rose-50",
  Beverages: "border-teal-600 text-teal-700 hover:bg-teal-50",
  Wellness: "border-green-600 text-green-700 hover:bg-green-50",
  Dehydrated: "border-yellow-600 text-yellow-700 hover:bg-yellow-50",
};
export const CATEGORY_WEIGHT_ACTIVE: Record<string, string> = {
  Spices: "bg-orange-500 text-white border-orange-500",
  Masalas: "bg-rose-500 text-white border-rose-500",
  Beverages: "bg-teal-600 text-white border-teal-600",
  Wellness: "bg-green-600 text-white border-green-600",
  Dehydrated: "bg-yellow-600 text-white border-yellow-600",
};
export const CATEGORY_PRICE_COLOR: Record<string, string> = {
  Spices: "text-orange-700 font-extrabold",
  Masalas: "text-rose-700 font-extrabold",
  Beverages: "text-teal-700 font-extrabold",
  Wellness: "text-green-700 font-extrabold",
  Dehydrated: "text-yellow-700 font-extrabold",
};
export const CATEGORY_PRICE_BG: Record<string, string> = {
  Spices: "bg-orange-100 rounded-lg px-3 py-1",
  Masalas: "bg-rose-100 rounded-lg px-3 py-1",
  Beverages: "bg-teal-100 rounded-lg px-3 py-1",
  Wellness: "bg-green-100 rounded-lg px-3 py-1",
  Dehydrated: "bg-yellow-100 rounded-lg px-3 py-1",
};

const CATEGORY_FILTER_COLORS: Record<string, { active: string; glow: string }> =
  {
    All: { active: "oklch(0.62 0.19 50)", glow: "rgba(232,112,10,0.35)" },
    Spices: { active: "oklch(0.62 0.19 50)", glow: "rgba(249,115,22,0.35)" },
    Masalas: { active: "oklch(0.58 0.22 25)", glow: "rgba(239,68,68,0.35)" },
    Beverages: {
      active: "oklch(0.55 0.15 195)",
      glow: "rgba(20,184,166,0.35)",
    },
    Wellness: { active: "oklch(0.52 0.17 155)", glow: "rgba(34,197,94,0.35)" },
    Dehydrated: {
      active: "oklch(0.55 0.20 310)",
      glow: "rgba(168,85,247,0.35)",
    },
  };

export const STATIC_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Turmeric Powder",
    category: "Spices",
    description:
      "Vibrant golden turmeric, sun-dried and stone-ground. Rich in curcumin for colour and wellness.",
    price: "120",
    isAvailable: true,
  },
  {
    id: 2n,
    name: "Kashmiri Chilli Powder",
    category: "Spices",
    description:
      "Bright red, mildly hot Kashmiri chilli that gives dishes a stunning colour without overpowering heat.",
    price: "150",
    isAvailable: true,
  },
  {
    id: 4n,
    name: "Coriander Powder",
    category: "Spices",
    description:
      "Earthy, citrusy coriander seeds cleaned and freshly milled to a fine powder. Excellent for curries.",
    price: "110",
    isAvailable: true,
  },
  {
    id: 6n,
    name: "Cumin Powder",
    category: "Spices",
    description:
      "Toasted cumin seeds ground to release their nutty, smoky aroma. A kitchen essential.",
    price: "130",
    isAvailable: true,
  },
  {
    id: 14n,
    name: "Black Pepper Powder",
    category: "Spices",
    description:
      "Bold and pungent black pepper freshly ground from handpicked whole peppercorns.",
    price: "160",
    isAvailable: true,
  },
  {
    id: 15n,
    name: "Cardamom Powder",
    category: "Spices",
    description:
      "Fragrant green cardamom pods finely ground to release their floral, sweet aroma.",
    price: "350",
    isAvailable: true,
  },
  {
    id: 16n,
    name: "Fenugreek Powder",
    category: "Spices",
    description:
      "Slightly bitter, nutty fenugreek seeds milled to a smooth powder.",
    price: "100",
    isAvailable: true,
  },
  {
    id: 17n,
    name: "Dry Ginger Powder",
    category: "Spices",
    description: "Sun-dried ginger root ground to a pungent, warming powder.",
    price: "140",
    isAvailable: true,
  },
  {
    id: 3n,
    name: "Garam Masala",
    category: "Masalas",
    description:
      "A warming blend of whole spices slow-roasted and freshly ground. Aromatic and deeply flavourful.",
    price: "180",
    isAvailable: true,
  },
  {
    id: 18n,
    name: "Sambar Powder",
    category: "Masalas",
    description:
      "Authentic South Indian sambar masala with the perfect balance of lentils, chillies, and aromatic spices.",
    price: "160",
    isAvailable: true,
  },
  {
    id: 19n,
    name: "Rasam Powder",
    category: "Masalas",
    description:
      "Tangy, peppery rasam masala with cumin, coriander, and dried red chillies.",
    price: "150",
    isAvailable: true,
  },
  {
    id: 20n,
    name: "Chole Masala",
    category: "Masalas",
    description:
      "Bold, smoky blend of roasted spices crafted for authentic Punjabi chole.",
    price: "170",
    isAvailable: true,
  },
  {
    id: 21n,
    name: "Pav Bhaji Masala",
    category: "Masalas",
    description:
      "The signature spice blend for Mumbai-style pav bhaji — buttery, tangy, and beautifully aromatic.",
    price: "165",
    isAvailable: true,
  },
  {
    id: 22n,
    name: "Kitchen King Masala",
    category: "Masalas",
    description:
      "A versatile all-in-one masala blend that transforms any vegetable or paneer dish.",
    price: "190",
    isAvailable: true,
  },
  {
    id: 5n,
    name: "Chai Masala",
    category: "Beverages",
    description:
      "A fragrant blend of ginger, cardamom, cinnamon, and clove — perfect for a comforting cup of chai.",
    price: "200",
    isAvailable: true,
  },
  {
    id: 23n,
    name: "Haldi Doodh Mix",
    category: "Beverages",
    description:
      "Traditional golden milk mix with turmeric, ashwagandha, and warming spices.",
    price: "220",
    isAvailable: true,
  },
  {
    id: 24n,
    name: "Moringa Latte Mix",
    category: "Beverages",
    description:
      "Creamy moringa green latte blend with oat powder and vanilla.",
    price: "250",
    isAvailable: true,
  },
  {
    id: 25n,
    name: "Tulsi Green Tea Powder",
    category: "Beverages",
    description:
      "Antioxidant-rich holy basil combined with fine green tea powder.",
    price: "230",
    isAvailable: true,
  },
  {
    id: 26n,
    name: "Ashwagandha Milk Mix",
    category: "Beverages",
    description:
      "Adaptogenic ashwagandha blended with warm spices and honey powder.",
    price: "280",
    isAvailable: true,
  },
  {
    id: 8n,
    name: "Amla Powder",
    category: "Wellness",
    description:
      "Pure Indian gooseberry dried and powdered. A superfood powerhouse for immunity and vitality.",
    price: "160",
    isAvailable: true,
  },
  {
    id: 27n,
    name: "Moringa Powder",
    category: "Wellness",
    description:
      "Pure drumstick leaves dried and ground into a nutrient-dense superfood powder.",
    price: "180",
    isAvailable: true,
  },
  {
    id: 28n,
    name: "Ashwagandha Powder",
    category: "Wellness",
    description:
      "Premium adaptogenic root powder to combat stress, boost energy, and support hormonal balance.",
    price: "220",
    isAvailable: true,
  },
  {
    id: 29n,
    name: "Neem Powder",
    category: "Wellness",
    description:
      "Bitter neem leaf powder with powerful antibacterial and blood-purifying properties.",
    price: "120",
    isAvailable: true,
  },
  {
    id: 30n,
    name: "Wheatgrass Powder",
    category: "Wellness",
    description:
      "Young wheat shoots cold-dried and powdered to preserve maximum chlorophyll and nutrients.",
    price: "200",
    isAvailable: true,
  },
  {
    id: 31n,
    name: "Triphala Powder",
    category: "Wellness",
    description:
      "The classic Ayurvedic blend of three fruits — amla, haritaki, and bibhitaki.",
    price: "175",
    isAvailable: true,
  },
  {
    id: 9n,
    name: "Onion Powder",
    category: "Dehydrated",
    description:
      "Farm-fresh onions dehydrated and finely milled into a pure powder.",
    price: "130",
    isAvailable: true,
  },
  {
    id: 10n,
    name: "Garlic Powder",
    category: "Dehydrated",
    description: "Sun-dried whole garlic cloves ground to a smooth powder.",
    price: "140",
    isAvailable: true,
  },
  {
    id: 11n,
    name: "Banana Powder",
    category: "Dehydrated",
    description:
      "Ripe bananas slow-dried and milled into a fine powder. Naturally sweet.",
    price: "150",
    isAvailable: true,
  },
  {
    id: 12n,
    name: "Beetroot Powder",
    category: "Dehydrated",
    description:
      "Vibrant deep-red beetroots dehydrated and powdered. Rich in nitrates and antioxidants.",
    price: "170",
    isAvailable: true,
  },
  {
    id: 13n,
    name: "Spinach Powder",
    category: "Dehydrated",
    description:
      "Fresh spinach leaves air-dried and ground into a fine powder. Packed with iron and vitamins.",
    price: "145",
    isAvailable: true,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  useGetProducts();
  const { setActivePage, homeSearchQuery, setHomeSearchQuery } =
    useNavigation();
  const { ref: headerRef, visible: headerVisible } = useScrollReveal();

  useEffect(() => {
    if (homeSearchQuery) {
      setSearchQuery(homeSearchQuery);
      setHomeSearchQuery("");
    }
  }, [homeSearchQuery, setHomeSearchQuery]);

  const products = STATIC_PRODUCTS;
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q)
      );
    });

  const openProductDetail = (productId: string) => {
    setActivePage("product-detail", productId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="products"
      data-ocid="products.section"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.97 0.018 90)" }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          className="text-center mb-12"
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3 font-semibold font-body"
            style={{ color: "oklch(0.62 0.19 50)" }}
          >
            Our Collection
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "oklch(0.20 0.08 155)" }}
          >
            Premium Food Powders
          </h2>
          <p
            className="mt-4 font-body text-base max-w-lg mx-auto"
            style={{ color: "oklch(0.45 0.05 155)" }}
          >
            Every product in the Ècoelen range is a promise of purity,
            freshness, and authentic flavour.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
              style={{ color: "oklch(0.30 0.10 155)" }}
            />
            <input
              type="text"
              data-ocid="products.search_input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full text-sm font-body focus:outline-none transition-all shadow-sm"
              style={{
                background: "white",
                border: "2px solid oklch(0.88 0.04 155)",
                color: "oklch(0.20 0.08 155)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.30 0.10 155)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.88 0.04 155)";
              }}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const colors =
              CATEGORY_FILTER_COLORS[cat] ?? CATEGORY_FILTER_COLORS.All;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                data-ocid="products.filter.tab"
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold font-body transition-all duration-200"
                style={{
                  background: isActive ? colors.active : "white",
                  color: isActive ? "white" : "oklch(0.40 0.06 155)",
                  border: isActive
                    ? `2px solid ${colors.active}`
                    : "2px solid oklch(0.88 0.04 155)",
                  boxShadow: isActive ? `0 4px 16px ${colors.glow}` : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => {
              const productId = String(product.id);
              const imgSrc = PRODUCT_IMAGES[product.name];
              const glow =
                CATEGORY_GLOW[product.category] ?? "rgba(15,76,53,0.3)";
              const accentColor =
                CATEGORY_ACCENT_COLOR[product.category] ??
                "oklch(0.62 0.19 50)";
              return (
                <motion.div
                  key={productId}
                  variants={cardVariants}
                  layout
                  data-ocid={`products.item.${i + 1}`}
                  onClick={() => openProductDetail(productId)}
                  className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: "white",
                    border: "1.5px solid oklch(0.90 0.03 155)",
                    boxShadow: "0 2px 12px rgba(15,76,53,0.07)",
                  }}
                  whileHover={{
                    boxShadow: `0 12px 36px ${glow}, 0 2px 12px rgba(0,0,0,0.08)`,
                  }}
                >
                  <div className="relative overflow-hidden">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={product.name}
                        className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-108"
                        style={{ transform: "scale(1)" }}
                      />
                    ) : (
                      <div
                        className="w-full h-44"
                        style={{ background: "oklch(0.92 0.04 155)" }}
                      />
                    )}
                    {/* Category color bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ background: accentColor }}
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(15,76,53,0.45)" }}
                    >
                      <span
                        className="text-xs font-semibold font-body px-4 py-2 rounded-full"
                        style={{
                          background: "white",
                          color: "oklch(0.25 0.10 155)",
                        }}
                      >
                        View Details →
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-3.5">
                    <h3
                      className="font-display font-semibold text-sm leading-snug text-center"
                      style={{ color: "oklch(0.22 0.08 155)" }}
                    >
                      {product.name}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div
            data-ocid="products.empty_state"
            className="text-center py-20"
            style={{ color: "oklch(0.55 0.06 155)" }}
          >
            <p className="font-display text-2xl mb-2">No products found</p>
            <p className="font-body text-sm">
              Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

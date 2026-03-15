import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProducts } from "@/hooks/useQueries";
import type { Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import { parsePrice, useCart } from "../context/CartContext";

const PRODUCT_IMAGES: Record<string, string> = {
  "Turmeric Powder": "/assets/generated/product-turmeric.dim_400x300.jpg",
  "Kashmiri Chilli Powder":
    "/assets/generated/product-kashmiri-chilli.dim_400x300.jpg",
  "Garam Masala": "/assets/generated/product-garam-masala.dim_400x300.jpg",
  "Coriander Powder": "/assets/generated/product-coriander.dim_400x300.jpg",
  "Chai Masala": "/assets/generated/product-chai-masala.dim_400x300.jpg",
  "Cumin Powder": "/assets/generated/product-cumin.dim_400x300.jpg",
  "Amla Powder": "/assets/generated/product-amla.dim_400x300.jpg",
};

const CATEGORY_COLORS: Record<string, string> = {
  Spices: "from-orange-50 to-amber-50 border-orange-200",
  Masalas: "from-rose-50 to-red-50 border-rose-200",
  Beverages: "from-teal-50 to-cyan-50 border-teal-200",
  Wellness: "from-green-50 to-emerald-50 border-green-200",
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  Spices: "bg-orange-100 text-orange-800 border-orange-300",
  Masalas: "bg-rose-100 text-rose-800 border-rose-300",
  Beverages: "bg-teal-100 text-teal-800 border-teal-300",
  Wellness: "bg-green-100 text-green-800 border-green-300",
};

const CATEGORY_ACCENT: Record<string, string> = {
  Spices: "bg-gradient-to-r from-amber-400 to-orange-400",
  Masalas: "bg-gradient-to-r from-red-400 to-rose-500",
  Beverages: "bg-gradient-to-r from-teal-400 to-cyan-500",
  Wellness: "bg-gradient-to-r from-green-400 to-emerald-500",
};

const CATEGORY_BTN: Record<string, string> = {
  Spices: "bg-orange-500 hover:bg-orange-600 text-white",
  Masalas: "bg-rose-500 hover:bg-rose-600 text-white",
  Beverages: "bg-teal-600 hover:bg-teal-700 text-white",
  Wellness: "bg-green-600 hover:bg-green-700 text-white",
};

const CATEGORY_PRICE_COLOR: Record<string, string> = {
  Spices: "text-orange-700 font-extrabold",
  Masalas: "text-rose-700 font-extrabold",
  Beverages: "text-teal-700 font-extrabold",
  Wellness: "text-green-700 font-extrabold",
};

const CATEGORY_PRICE_BG: Record<string, string> = {
  Spices: "bg-orange-100 rounded-lg px-3 py-1",
  Masalas: "bg-rose-100 rounded-lg px-3 py-1",
  Beverages: "bg-teal-100 rounded-lg px-3 py-1",
  Wellness: "bg-green-100 rounded-lg px-3 py-1",
};

const CATEGORY_FILTER_ACTIVE: Record<string, string> = {
  All: "bg-amber-500 text-white border-amber-500 shadow-md",
  Spices: "bg-orange-500 text-white border-orange-500 shadow-md",
  Masalas: "bg-rose-500 text-white border-rose-500 shadow-md",
  Beverages: "bg-teal-500 text-white border-teal-500 shadow-md",
  Wellness: "bg-green-500 text-white border-green-500 shadow-md",
};

const STATIC_PRODUCTS: Product[] = [
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
    id: 3n,
    name: "Garam Masala",
    category: "Masalas",
    description:
      "A warming blend of whole spices slow-roasted and freshly ground. Aromatic and deeply flavourful.",
    price: "180",
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
    id: 5n,
    name: "Chai Masala",
    category: "Beverages",
    description:
      "A fragrant blend of ginger, cardamom, cinnamon, and clove — perfect for a comforting cup of chai.",
    price: "200",
    isAvailable: true,
  },
  {
    id: 6n,
    name: "Cumin Powder",
    category: "Spices",
    description:
      "Toasted cumin seeds ground to release their nutty, smoky aroma. A kitchen essential.",
    price: "130",
    isAvailable: false,
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
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const skeletonKeys = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

function AddToCartButton({
  product,
  btnClass,
  ocid,
}: {
  product: Product;
  btnClass: string;
  ocid: string;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <Button
      size="sm"
      disabled={!product.isAvailable || added}
      data-ocid={ocid}
      onClick={handleAdd}
      className={`w-full text-sm font-semibold rounded-xl mt-3 ${btnClass} transition-all duration-200 disabled:opacity-50`}
    >
      {!product.isAvailable
        ? "Out of Stock"
        : added
          ? "Added! \u2713"
          : "Add to Cart"}
    </Button>
  );
}

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: backendProducts, isLoading } = useGetProducts();

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : STATIC_PRODUCTS;
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      id="products"
      data-ocid="products.section"
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3 font-semibold">
            Our Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Premium Food Powders
          </h2>
          <p className="mt-4 text-muted-foreground font-body text-base max-w-lg mx-auto">
            Every product in the Ècoelen range is a promise of purity,
            freshness, and authentic flavour.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid="products.filter.tab"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-body border transition-all duration-200 ${
                activeCategory === cat
                  ? (CATEGORY_FILTER_ACTIVE[cat] ??
                    "bg-amber-500 text-white border-amber-500 shadow-md")
                  : "bg-card border-border text-foreground/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="products.loading_state"
          >
            {skeletonKeys.map((k) => (
              <div
                key={k}
                className="rounded-2xl overflow-hidden bg-card shadow-sm"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-5 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => {
                const colorClass =
                  CATEGORY_COLORS[product.category] ??
                  "from-stone-50 to-slate-50 border-slate-200";
                const badgeClass =
                  CATEGORY_BADGE_COLORS[product.category] ??
                  "bg-stone-100 text-stone-800 border-stone-300";
                const accentClass =
                  CATEGORY_ACCENT[product.category] ??
                  "bg-gradient-to-r from-stone-400 to-slate-500";
                const btnClass =
                  CATEGORY_BTN[product.category] ??
                  "bg-primary hover:bg-primary/90 text-primary-foreground";
                const priceColorClass =
                  CATEGORY_PRICE_COLOR[product.category] ??
                  "text-gray-800 font-extrabold";
                const priceBgClass =
                  CATEGORY_PRICE_BG[product.category] ??
                  "bg-gray-100 rounded-lg px-3 py-1";
                const imgSrc = PRODUCT_IMAGES[product.name];
                return (
                  <motion.div
                    key={String(product.id)}
                    variants={cardVariants}
                    layout
                    data-ocid={`products.item.${i + 1}`}
                    className={`group bg-gradient-to-b ${colorClass} border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1`}
                  >
                    <div className="relative overflow-hidden">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={product.name}
                          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-44 bg-muted" />
                      )}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1.5 ${accentClass}`}
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-display font-semibold text-lg text-foreground leading-snug">
                          {product.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`shrink-0 text-xs font-semibold border ${badgeClass}`}
                        >
                          {product.category}
                        </Badge>
                      </div>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed flex-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
                        <span
                          className={`font-display text-2xl ${priceColorClass} ${priceBgClass}`}
                        >
                          &#8377;{parsePrice(product.price)}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            product.isAvailable
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          {product.isAvailable ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <AddToCartButton
                        product={product}
                        btnClass={btnClass}
                        ocid={`products.primary_button.${i + 1}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div
            data-ocid="products.empty_state"
            className="text-center py-20 text-muted-foreground"
          >
            <p className="font-display text-2xl mb-2">No products found</p>
            <p className="font-body text-sm">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

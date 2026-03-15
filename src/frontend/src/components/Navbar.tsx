import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { type Page, useNavigation } from "../context/NavigationContext";
import { CartDrawer } from "./CartDrawer";

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Products", page: "products" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();
  const { activePage, setActivePage } = useNavigation();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showScrolled = activePage !== "home" || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 py-2 md:py-3">
          {/* Logo — always visible */}
          <motion.button
            type="button"
            data-ocid="nav.link"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Logo image with colorful spinning ring */}
            <div className="relative flex-shrink-0">
              {/* Spinning rainbow ring — uses CSS class so the keyframe is guaranteed */}
              <div
                className="rainbow-spin absolute -inset-1 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #f97316, #eab308, #ef4444, #22c55e, #06b6d4, #a855f7, #f97316)",
                  borderRadius: "9999px",
                }}
              />
              {/* Logo container sits on top of the spinning ring */}
              <div
                className="relative rounded-full p-[3px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, #f97316, #eab308, #ef4444, #22c55e, #06b6d4, #a855f7, #f97316)",
                  zIndex: 1,
                }}
              >
                <div className="rounded-full bg-white p-1">
                  <img
                    src="/assets/generated/ecoelen-logo-transparent.dim_200x200.png"
                    alt="Ècoelen"
                    className="h-20 w-20 md:h-28 md:w-28 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Brand text — NO filter on gradient text to prevent glitch */}
            <div className="flex flex-col leading-none">
              <span
                className="font-display font-extrabold text-3xl md:text-4xl tracking-tight gradient-text"
                style={{
                  background: showScrolled
                    ? "linear-gradient(135deg, #f97316 0%, #ef4444 35%, #eab308 65%, #22c55e 100%)"
                    : "linear-gradient(135deg, #fde68a 0%, #fbbf24 30%, #fb923c 60%, #f87171 100%)",
                }}
              >
                Ècoelen
              </span>
              <span
                className={`text-[11px] font-body tracking-widest uppercase transition-colors duration-300 font-semibold ${
                  showScrolled ? "text-muted-foreground" : "text-amber-200/90"
                }`}
              >
                by Kapiraj Foods
              </span>
            </div>
          </motion.button>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.page}>
                <button
                  type="button"
                  data-ocid={`nav.${link.page}.link`}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activePage === link.page
                      ? "text-primary bg-primary/10 font-semibold"
                      : showScrolled
                        ? "text-foreground/80 hover:text-primary hover:bg-primary/5"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-ocid="nav.cart_button"
              onClick={() => setCartOpen(true)}
              className={`relative p-2 rounded-md transition-colors ${
                showScrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/15"
              }`}
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center leading-none px-1">
                  {cartCount}
                </span>
              )}
            </button>

            <Button
              variant="default"
              size="sm"
              className={`hidden md:flex transition-all duration-300 ${
                showScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-white/20 text-white border border-white/40 backdrop-blur-sm hover:bg-white/30"
              }`}
              data-ocid="nav.cta.button"
              onClick={() => handleNavClick("contact")}
            >
              Get in Touch
            </Button>

            <button
              type="button"
              className={`md:hidden p-2 rounded-md transition-colors ${
                showScrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/15"
              }`}
              data-ocid="nav.menu.toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
            >
              <ul className="flex flex-col px-4 py-3 gap-1">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <button
                      type="button"
                      data-ocid={`mobile.nav.${link.page}.link`}
                      onClick={() => handleNavClick(link.page)}
                      className={`w-full text-left block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        activePage === link.page
                          ? "text-primary bg-primary/10 font-semibold"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2 pb-1">
                  <Button
                    className="w-full bg-primary text-primary-foreground"
                    data-ocid="mobile.nav.cta.button"
                    onClick={() => handleNavClick("contact")}
                  >
                    Get in Touch
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

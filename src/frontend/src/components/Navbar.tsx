import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { type Page, useNavigation } from "../context/NavigationContext";
import { CartDrawer } from "./CartDrawer";

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Products", page: "products" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
  { label: "My Account", page: "account" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { cartCount } = useCart();
  const { activePage, setActivePage, setHomeSearchQuery } = useNavigation();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setHomeSearchQuery(searchValue.trim());
      setActivePage("products");
      window.scrollTo({ top: 0, behavior: "instant" });
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const showScrolled = activePage !== "home" || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          showScrolled ? "shadow-warm-lg border-b" : "bg-transparent"
        }`}
        style={{
          background: showScrolled
            ? "oklch(0.20 0.08 155 / 0.97)"
            : "transparent",
          borderBottomColor: showScrolled
            ? "rgba(255,255,255,0.08)"
            : "transparent",
          backdropFilter: showScrolled ? "blur(16px)" : "none",
        }}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <motion.button
            type="button"
            data-ocid="nav.link"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 group"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="/assets/uploads/1000284461-removebg-preview-1.png"
              alt="Ècoelen"
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </motion.button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.page}>
                <button
                  type="button"
                  data-ocid={`nav.${link.page}.link`}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative px-4 py-2 rounded-md text-sm font-semibold font-body transition-colors duration-200 ${
                    activePage === link.page
                      ? "text-golden"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {activePage === link.page && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: "oklch(0.83 0.17 85)" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Desktop search */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center relative"
            >
              <AnimatePresence initial={false}>
                {searchOpen ? (
                  <motion.div
                    key="open"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full pl-4 pr-3 py-1.5 rounded-full text-sm focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        color: "white",
                      }}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <button
                type={searchOpen ? "submit" : "button"}
                onClick={() => !searchOpen && setSearchOpen(true)}
                className="p-2 rounded-md text-white/80 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              {searchOpen && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchValue("");
                  }}
                  className="p-1.5 rounded-md text-white/60 hover:text-white transition-colors"
                  aria-label="Close search"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {/* Cart */}
            <button
              type="button"
              data-ocid="nav.cart_button"
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-md text-white/80 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center leading-none px-1"
                  style={{
                    background: "oklch(0.62 0.19 50)",
                    color: "white",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-body transition-all duration-300 cta-shimmer"
              data-ocid="nav.cta.button"
              onClick={() => handleNavClick("contact")}
            >
              Get in Touch
            </button>

            <button
              type="button"
              className="md:hidden p-2 rounded-md text-white/80 hover:text-white transition-colors"
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
              className="md:hidden overflow-hidden border-t"
              style={{
                background: "oklch(0.18 0.08 155 / 0.98)",
                borderTopColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="px-4 pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-full text-sm focus:outline-none"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "white",
                    }}
                  />
                </div>
              </form>

              <ul className="flex flex-col px-4 py-3 gap-1">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <button
                      type="button"
                      data-ocid={`mobile.nav.${link.page}.link`}
                      onClick={() => handleNavClick(link.page)}
                      className={`w-full text-left block px-3 py-2.5 rounded-lg text-sm font-semibold font-body transition-colors ${
                        activePage === link.page
                          ? "text-golden"
                          : "text-white/70 hover:text-white"
                      }`}
                      style={{
                        background:
                          activePage === link.page
                            ? "rgba(245,200,66,0.1)"
                            : "transparent",
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2 pb-1">
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-full text-sm font-bold font-body cta-shimmer"
                    data-ocid="mobile.nav.cta.button"
                    onClick={() => handleNavClick("contact")}
                  >
                    Get in Touch
                  </button>
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

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AboutSection } from "./components/AboutSection";
import { AccountPage } from "./components/AccountPage";
import { AdminPage } from "./components/AdminPage";
import { ContactSection } from "./components/ContactSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { MarqueeStrip } from "./components/MarqueeStrip";
import { Navbar } from "./components/Navbar";
import { ProcessSection } from "./components/ProcessSection";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { ProductsSection } from "./components/ProductsSection";
import { SplashScreen } from "./components/SplashScreen";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CartProvider } from "./context/CartContext";
import { NavigationProvider, useNavigation } from "./context/NavigationContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

function PageContent() {
  const { activePage } = useNavigation();
  const prevPage = useRef(activePage);

  useEffect(() => {
    if (prevPage.current !== activePage) {
      prevPage.current = activePage;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={activePage}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {activePage === "home" && (
          <>
            <HeroSection />
            <MarqueeStrip />
            <FeaturesSection />
          </>
        )}
        {activePage === "products" && (
          <>
            <ProductsSection />
            <ProcessSection />
          </>
        )}
        {activePage === "product-detail" && <ProductDetailPage />}
        {activePage === "about" && (
          <>
            <AboutSection />
            <TestimonialsSection />
          </>
        )}
        {activePage === "contact" && <ContactSection />}
        {activePage === "account" && <AccountPage />}
      </motion.main>
    </AnimatePresence>
  );
}

function AppContent() {
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "success") {
      toast.success("Payment successful! Your order has been placed.");
      params.delete("payment");
      window.history.replaceState(
        {},
        "",
        params.toString() ? `?${params.toString()}` : window.location.pathname,
      );
    } else if (payment === "cancelled") {
      toast.error("Payment was cancelled.");
      params.delete("payment");
      window.history.replaceState(
        {},
        "",
        params.toString() ? `?${params.toString()}` : window.location.pathname,
      );
    }
  }, []);

  return (
    <CartProvider>
      <SplashScreen />
      <Navbar />
      <PageContent />
      <Footer onAdminClick={() => setAdminOpen(true)} />
      <Toaster richColors position="top-right" />
      {adminOpen && <AdminPage onClose={() => setAdminOpen(false)} />}
    </CartProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </QueryClientProvider>
  );
}

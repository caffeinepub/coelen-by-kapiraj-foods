import { createContext, useContext, useEffect, useState } from "react";

export type Page =
  | "home"
  | "products"
  | "about"
  | "contact"
  | "product-detail"
  | "account";

interface NavContextValue {
  activePage: Page;
  setActivePage: (page: Page, productId?: string | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  homeSearchQuery: string;
  setHomeSearchQuery: (q: string) => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavigationProvider({
  children,
}: { children: React.ReactNode }) {
  const [activePage, setActivePageState] = useState<Page>("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [homeSearchQuery, setHomeSearchQuery] = useState("");

  const setActivePage = (page: Page, productId?: string | null) => {
    const state = { page, productId: productId ?? null };
    window.history.pushState(state, "", window.location.pathname);
    setActivePageState(page);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const page: Page = (e.state?.page as Page) ?? "home";
      const productId: string | null = e.state?.productId ?? null;
      setActivePageState(page);
      setSelectedProductId(productId);
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("popstate", handlePopState);
    // Set initial history state
    window.history.replaceState(
      { page: "home", productId: null },
      "",
      window.location.pathname,
    );
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <NavContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        homeSearchQuery,
        setHomeSearchQuery,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNavigation must be within NavigationProvider");
  return ctx;
}

import { createContext, useContext, useState } from "react";

export type Page = "home" | "products" | "about" | "contact";

interface NavContextValue {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavigationProvider({
  children,
}: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState<Page>("home");
  return (
    <NavContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNavigation must be within NavigationProvider");
  return ctx;
}

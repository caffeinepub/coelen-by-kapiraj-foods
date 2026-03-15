import { createContext, useContext, useState } from "react";
import type { Product } from "../backend.d";

export interface WeightOption {
  label: string;
  grams: number;
  multiplier: number;
}

export const WEIGHT_OPTIONS: WeightOption[] = [
  { label: "100 gms", grams: 100, multiplier: 1 },
  { label: "200 gms", grams: 200, multiplier: 2 },
  { label: "500 gms", grams: 500, multiplier: 5 },
];

export interface CartItem {
  product: Product;
  quantity: number;
  weight: WeightOption;
}

/** Extracts the first numeric value from a price string.
 * Works for plain numbers like "120" and descriptive text like "₹50 for 200g".
 */
export function parsePrice(price: string): number {
  const match = price.match(/\d+\.?\d*/);
  return match ? Number.parseFloat(match[0]) : 0;
}

export function itemPrice(item: CartItem): number {
  return (
    parsePrice(item.product.price) * item.weight.multiplier * item.quantity
  );
}

interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, weight: WeightOption) => void;
  removeFromCart: (productId: bigint, weightGrams: number) => void;
  updateQuantity: (productId: bigint, weightGrams: number, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + itemPrice(item), 0);

  const addToCart = (product: Product, weight: WeightOption) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.weight.grams === weight.grams,
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.weight.grams === weight.grams
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { product, quantity: 1, weight }];
    });
  };

  const removeFromCart = (productId: bigint, weightGrams: number) => {
    setCartItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.weight.grams === weightGrams),
      ),
    );
  };

  const updateQuantity = (
    productId: bigint,
    weightGrams: number,
    qty: number,
  ) => {
    if (qty <= 0) {
      removeFromCart(productId, weightGrams);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.weight.grams === weightGrams
          ? { ...i, quantity: qty }
          : i,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

import { useMutation, useQuery } from "@tanstack/react-query";
import type { FoodOrder, OrderItem, Product, ShoppingItem } from "../backend.d";
import { useActor } from "./useActor";

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<FoodOrder[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactInquiry(name, email, message);
    },
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      customerName,
      phone,
      address,
      items,
    }: {
      customerName: string;
      phone: string;
      address: string;
      items: OrderItem[];
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.placeOrder(customerName, phone, address, items);
    },
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (items: ShoppingItem[]) => {
      if (!actor) throw new Error("Not connected");
      const successUrl = `${window.location.origin}?payment=success`;
      const cancelUrl = `${window.location.origin}?payment=cancelled`;
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      secretKey,
      allowedCountries,
    }: {
      secretKey: string;
      allowedCountries: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.setStripeConfiguration({ secretKey, allowedCountries });
    },
  });
}

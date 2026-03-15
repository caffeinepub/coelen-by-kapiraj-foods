import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Product {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    category: string;
    price: string;
}
export interface FoodOrder {
    id: bigint;
    customerName: string;
    paymentStatus: string;
    owner: Principal;
    address: string;
    timestamp: bigint;
    phone: string;
    items: Array<OrderItem>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface OrderItem {
    productName: string;
    quantity: string;
    price: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
    address: string;
    phone: string;
}
export interface http_header {
    value: string;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, price: string, category: string, isAvailable: boolean): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteProduct(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInquiries(): Promise<Array<Inquiry>>;
    getOrders(): Promise<Array<FoodOrder>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isProductAvailable(id: bigint): Promise<boolean>;
    /**
     * / Returns whether the Stripe is configured or not
     */
    isStripeConfigured(): Promise<boolean>;
    placeOrder(customerName: string, phone: string, address: string, items: Array<OrderItem>): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContactInquiry(name: string, email: string, message: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateProduct(id: bigint, name: string, description: string, price: string, category: string, isAvailable: boolean): Promise<void>;
}

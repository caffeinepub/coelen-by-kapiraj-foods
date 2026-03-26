import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useCreateCheckoutSession,
  useIsStripeConfigured,
  usePlaceOrder,
} from "@/hooks/useQueries";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { itemPrice, parsePrice, useCart } from "../context/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Props) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const placeOrder = usePlaceOrder();
  const createCheckout = useCreateCheckoutSession();
  const { data: stripeConfigured } = useIsStripeConfigured();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!phone.trim()) e.phone = "Phone is required";
    if (!address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    try {
      await placeOrder.mutateAsync({
        customerName: name,
        phone,
        address,
        items: cartItems.map((i) => ({
          productName: `${i.product.name} (${i.weight.label})`,
          quantity: String(i.quantity),
          price: String(parsePrice(i.product.price) * i.weight.multiplier),
        })),
      });
      clearCart();
      setName("");
      setPhone("");
      setAddress("");
      onClose();
      toast.success("Order placed successfully! We'll contact you shortly.");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handlePayOnline = async () => {
    if (!validate()) return;
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    try {
      const items = cartItems.map((i) => ({
        productName: `${i.product.name} (${i.weight.label})`,
        productDescription: i.product.description || i.product.name,
        currency: "inr",
        quantity: BigInt(i.quantity),
        priceInCents: BigInt(
          Math.round(parsePrice(i.product.price) * i.weight.multiplier * 100),
        ),
      }));
      const checkoutUrl = await createCheckout.mutateAsync(items);
      window.location.href = checkoutUrl;
    } catch {
      toast.error("Failed to start payment. Please try again.");
    }
  };

  const isPayingOnline = createCheckout.isPending;
  const itemsSubtotal = Math.round(cartTotal * (100 / 105));
  const gstAmount = cartTotal - itemsSubtotal;

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    background: "rgba(15,76,53,0.04)",
    border: "1.5px solid oklch(0.88 0.04 155)",
    color: "oklch(0.20 0.08 155)",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0 h-full"
        data-ocid="cart.drawer"
        style={{
          background: "oklch(0.97 0.018 90)",
          borderLeft: "1.5px solid oklch(0.90 0.04 155)",
        }}
      >
        {/* Header */}
        <SheetHeader
          className="px-6 py-5 flex-shrink-0"
          style={{
            borderBottom: "1.5px solid oklch(0.90 0.04 155)",
            background: "white",
          }}
        >
          <SheetTitle
            className="font-display text-xl flex items-center gap-2"
            style={{ color: "oklch(0.18 0.08 155)" }}
          >
            <ShoppingBag
              className="w-5 h-5"
              style={{ color: "oklch(0.30 0.10 155)" }}
            />
            Your Cart
            {cartItems.length > 0 && (
              <span
                className="ml-auto text-sm font-body"
                style={{ color: "oklch(0.55 0.06 155)" }}
              >
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex-1 flex flex-col items-center justify-center gap-4 px-6"
            style={{ color: "oklch(0.60 0.06 155)" }}
          >
            <ShoppingBag className="w-16 h-16 opacity-20" />
            <p
              className="font-display text-lg"
              style={{ color: "oklch(0.30 0.10 155)" }}
            >
              Your cart is empty
            </p>
            <p
              className="font-body text-sm text-center"
              style={{ color: "oklch(0.55 0.06 155)" }}
            >
              Add some products to get started!
            </p>
            <button
              type="button"
              onClick={onClose}
              data-ocid="cart.close_button"
              className="px-6 py-2.5 rounded-full text-sm font-semibold font-body transition-all"
              style={{
                border: "2px solid oklch(0.30 0.10 155)",
                color: "oklch(0.30 0.10 155)",
                background: "transparent",
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-6 py-4 space-y-4">
                {/* Items */}
                {cartItems.map((item, i) => (
                  <div
                    key={`${String(item.product.id)}-${item.weight.grams}`}
                    data-ocid={`cart.item.${i + 1}`}
                    className="flex gap-3 items-start rounded-xl p-3"
                    style={{
                      background: "white",
                      border: "1.5px solid oklch(0.90 0.04 155)",
                      boxShadow: "0 2px 8px rgba(15,76,53,0.06)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-display font-semibold text-sm truncate"
                        style={{ color: "oklch(0.20 0.08 155)" }}
                      >
                        {item.product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p
                          className="text-xs font-body"
                          style={{ color: "oklch(0.55 0.06 155)" }}
                        >
                          {item.product.category}
                        </p>
                        <span
                          className="inline-block text-xs font-semibold font-body rounded px-1.5 py-0.5"
                          style={{
                            background: "rgba(15,76,53,0.08)",
                            color: "oklch(0.30 0.10 155)",
                          }}
                        >
                          {item.weight.label}
                        </span>
                      </div>
                      <p
                        className="font-display font-bold mt-1"
                        style={{ color: "oklch(0.30 0.10 155)" }}
                      >
                        &#8377;{itemPrice(item).toFixed(0)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{ border: "1.5px solid oklch(0.88 0.04 155)" }}
                      >
                        <button
                          type="button"
                          className="px-2 py-1.5 transition-colors"
                          style={{ background: "transparent" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(15,76,53,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.weight.grams,
                              item.quantity - 1,
                            )
                          }
                        >
                          <Minus
                            className="w-3 h-3"
                            style={{ color: "oklch(0.40 0.08 155)" }}
                          />
                        </button>
                        <span
                          className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center font-body"
                          style={{ color: "oklch(0.22 0.08 155)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-1.5 transition-colors"
                          style={{ background: "transparent" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(15,76,53,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.weight.grams,
                              item.quantity + 1,
                            )
                          }
                        >
                          <Plus
                            className="w-3 h-3"
                            style={{ color: "oklch(0.40 0.08 155)" }}
                          />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="p-1.5 rounded-md transition-colors"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(239,68,68,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                        onClick={() =>
                          removeFromCart(item.product.id, item.weight.grams)
                        }
                        data-ocid={`cart.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <Separator style={{ background: "oklch(0.90 0.04 155)" }} />

                {/* Price breakout */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1.5px solid oklch(0.88 0.04 155)" }}
                >
                  <div
                    className="px-4 py-2.5"
                    style={{
                      background: "rgba(15,76,53,0.06)",
                      borderBottom: "1px solid oklch(0.90 0.04 155)",
                    }}
                  >
                    <p
                      className="font-display font-semibold text-sm"
                      style={{ color: "oklch(0.20 0.08 155)" }}
                    >
                      Price Breakout
                    </p>
                  </div>
                  <div
                    className="px-4 py-3 space-y-2.5"
                    style={{ background: "white" }}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className="font-body text-sm"
                        style={{ color: "oklch(0.55 0.06 155)" }}
                      >
                        Items
                      </span>
                      <span
                        className="font-body text-sm font-medium"
                        style={{ color: "oklch(0.22 0.08 155)" }}
                      >
                        &#8377;{itemsSubtotal.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className="font-body text-sm"
                        style={{ color: "oklch(0.55 0.06 155)" }}
                      >
                        GST (5% incl.)
                      </span>
                      <span
                        className="font-body text-sm font-medium"
                        style={{ color: "oklch(0.22 0.08 155)" }}
                      >
                        &#8377;{gstAmount.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className="font-body text-sm"
                        style={{ color: "oklch(0.55 0.06 155)" }}
                      >
                        Delivery charges
                      </span>
                      <span
                        className="font-body text-sm font-bold"
                        style={{ color: "oklch(0.52 0.17 155)" }}
                      >
                        FREE
                      </span>
                    </div>
                    <Separator style={{ background: "oklch(0.90 0.04 155)" }} />
                    <div className="flex justify-between items-center">
                      <span
                        className="font-display font-bold text-sm"
                        style={{ color: "oklch(0.20 0.08 155)" }}
                      >
                        Total (incl. all taxes)
                      </span>
                      <span
                        className="font-display font-bold text-lg"
                        style={{ color: "oklch(0.30 0.10 155)" }}
                      >
                        &#8377;{cartTotal.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: "oklch(0.52 0.17 155)" }}
                      />
                      <p
                        className="text-xs font-body"
                        style={{ color: "oklch(0.60 0.05 100)" }}
                      >
                        Price is inclusive of all taxes &amp; charges
                      </p>
                    </div>
                  </div>
                </div>

                <Separator style={{ background: "oklch(0.90 0.04 155)" }} />

                {/* Delivery form */}
                <div data-ocid="cart.checkout_form" className="space-y-4 pb-2">
                  <h3
                    className="font-display font-semibold text-base"
                    style={{ color: "oklch(0.20 0.08 155)" }}
                  >
                    Delivery Details
                  </h3>

                  <div>
                    <label
                      htmlFor="cart-name"
                      className="font-body text-sm mb-1.5 block font-medium"
                      style={{ color: "oklch(0.40 0.06 155)" }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="cart-name"
                      data-ocid="cart.input"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        ...inputStyle,
                        borderColor: errors.name
                          ? "oklch(0.55 0.22 25)"
                          : "oklch(0.88 0.04 155)",
                      }}
                    />
                    {errors.name && (
                      <p
                        className="text-xs mt-1 font-body"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cart-phone"
                      className="font-body text-sm mb-1.5 block font-medium"
                      style={{ color: "oklch(0.40 0.06 155)" }}
                    >
                      Phone Number *
                    </label>
                    <input
                      id="cart-phone"
                      data-ocid="cart.input"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        ...inputStyle,
                        borderColor: errors.phone
                          ? "oklch(0.55 0.22 25)"
                          : "oklch(0.88 0.04 155)",
                      }}
                    />
                    {errors.phone && (
                      <p
                        className="text-xs mt-1 font-body"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cart-address"
                      className="font-body text-sm mb-1.5 block font-medium"
                      style={{ color: "oklch(0.40 0.06 155)" }}
                    >
                      Delivery Address *
                    </label>
                    <textarea
                      id="cart-address"
                      data-ocid="cart.textarea"
                      placeholder="Full delivery address with pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      style={{
                        ...inputStyle,
                        resize: "none",
                        borderColor: errors.address
                          ? "oklch(0.55 0.22 25)"
                          : "oklch(0.88 0.04 155)",
                      }}
                    />
                    {errors.address && (
                      <p
                        className="text-xs mt-1 font-body"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                      >
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Sticky action bar */}
            <div
              className="flex-shrink-0 px-6 py-4 space-y-3"
              style={{
                borderTop: "1.5px solid oklch(0.90 0.04 155)",
                background: "white",
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  data-ocid="cart.submit_button"
                  onClick={handlePlaceOrder}
                  disabled={placeOrder.isPending || isPayingOnline}
                  className="py-3 rounded-xl font-semibold font-body text-sm transition-all disabled:opacity-60"
                  style={{
                    border: "2px solid oklch(0.30 0.10 155)",
                    color: "oklch(0.30 0.10 155)",
                    background: "transparent",
                  }}
                >
                  {placeOrder.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Placing...
                    </span>
                  ) : (
                    "Place Order (COD)"
                  )}
                </button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="block">
                        <button
                          type="button"
                          data-ocid="cart.primary_button"
                          onClick={handlePayOnline}
                          disabled={
                            !stripeConfigured ||
                            isPayingOnline ||
                            placeOrder.isPending
                          }
                          className="w-full py-3 rounded-xl font-semibold font-body text-sm text-white cta-shimmer disabled:opacity-60"
                        >
                          {isPayingOnline ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Redirecting...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              Pay Online
                            </span>
                          )}
                        </button>
                      </span>
                    </TooltipTrigger>
                    {!stripeConfigured && (
                      <TooltipContent side="top">
                        <p>Online payment not available yet</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>

              <p
                className="text-center text-xs font-body"
                style={{ color: "oklch(0.60 0.05 100)" }}
              >
                COD: we&apos;ll confirm via phone · Online: secure Stripe
                checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

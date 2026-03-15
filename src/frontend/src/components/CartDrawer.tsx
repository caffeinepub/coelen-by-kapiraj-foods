import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
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
  CreditCard,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { parsePrice, useCart } from "../context/CartContext";

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
          productName: i.product.name,
          quantity: String(i.quantity),
          price: i.product.price,
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
        productName: i.product.name,
        productDescription: i.product.description || i.product.name,
        currency: "inr",
        quantity: BigInt(i.quantity),
        priceInCents: BigInt(Math.round(parsePrice(i.product.price) * 100)),
      }));
      const checkoutUrl = await createCheckout.mutateAsync(items);
      window.location.href = checkoutUrl;
    } catch {
      toast.error("Failed to start payment. Please try again.");
    }
  };

  const isPayingOnline = createCheckout.isPending;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0 h-full"
        data-ocid="cart.drawer"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border flex-shrink-0">
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
            {cartItems.length > 0 && (
              <span className="ml-auto text-sm font-body text-muted-foreground">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground px-6"
          >
            <ShoppingBag className="w-16 h-16 opacity-20" />
            <p className="font-display text-lg">Your cart is empty</p>
            <p className="font-body text-sm text-center">
              Add some products to get started!
            </p>
            <Button
              variant="outline"
              onClick={onClose}
              data-ocid="cart.close_button"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Scrollable content area */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-6 py-4 space-y-4">
                {cartItems.map((item, i) => (
                  <div
                    key={String(item.product.id)}
                    data-ocid={`cart.item.${i + 1}`}
                    className="flex gap-3 items-start bg-muted/40 rounded-xl p-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-sm text-foreground truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs font-body text-muted-foreground mt-0.5">
                        {item.product.category}
                      </p>
                      <p className="font-display font-bold text-primary mt-1">
                        ₹
                        {(
                          parsePrice(item.product.price) * item.quantity
                        ).toFixed(0)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          type="button"
                          className="px-2 py-1.5 hover:bg-muted transition-colors"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-1.5 hover:bg-muted transition-colors"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                        onClick={() => removeFromCart(item.product.id)}
                        data-ocid={`cart.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <Separator className="my-5" />

                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="font-body font-medium text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-display font-bold text-xl text-primary">
                    ₹{cartTotal.toFixed(0)}
                  </span>
                </div>

                <Separator className="my-2" />

                {/* Delivery details form */}
                <div data-ocid="cart.checkout_form" className="space-y-4 pb-2">
                  <h3 className="font-display font-semibold text-base">
                    Delivery Details
                  </h3>
                  <div>
                    <Label
                      htmlFor="cart-name"
                      className="font-body text-sm mb-1.5 block"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="cart-name"
                      data-ocid="cart.input"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="cart-phone"
                      className="font-body text-sm mb-1.5 block"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="cart-phone"
                      data-ocid="cart.input"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="cart-address"
                      className="font-body text-sm mb-1.5 block"
                    >
                      Delivery Address *
                    </Label>
                    <Textarea
                      id="cart-address"
                      data-ocid="cart.textarea"
                      placeholder="Full delivery address with pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Sticky action bar — outside ScrollArea */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-border bg-background space-y-3">
              {/* Two action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="font-semibold py-5 rounded-xl border-primary/40 hover:bg-primary/5"
                  data-ocid="cart.submit_button"
                  onClick={handlePlaceOrder}
                  disabled={placeOrder.isPending || isPayingOnline}
                >
                  {placeOrder.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Placing...
                    </>
                  ) : (
                    "Place Order (COD)"
                  )}
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="block">
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 rounded-xl"
                          data-ocid="cart.primary_button"
                          onClick={handlePayOnline}
                          disabled={
                            !stripeConfigured ||
                            isPayingOnline ||
                            placeOrder.isPending
                          }
                        >
                          {isPayingOnline ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Redirecting...
                            </>
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Pay Online
                            </>
                          )}
                        </Button>
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

              <p className="text-center text-xs text-muted-foreground font-body">
                COD: we'll confirm via phone · Online: secure Stripe checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

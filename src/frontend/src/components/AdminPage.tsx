import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetOrders,
  useGetProducts,
  useIsStripeConfigured,
  useSetStripeConfiguration,
} from "@/hooks/useQueries";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  LogIn,
  LogOut,
  Package,
  ShoppingCart,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

export function AdminPage({ onClose }: Props) {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: products, isLoading: productsLoading } = useGetProducts();
  const { data: orders, isLoading: ordersLoading } = useGetOrders();
  const {
    data: stripeConfigured,
    isLoading: stripeLoading,
    refetch: refetchStripe,
  } = useIsStripeConfigured();
  const setStripeConfig = useSetStripeConfiguration();

  const [stripeKey, setStripeKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleSaveStripe = async () => {
    if (!stripeKey.trim()) {
      toast.error("Please enter a Stripe secret key");
      return;
    }
    try {
      await setStripeConfig.mutateAsync({
        secretKey: stripeKey.trim(),
        allowedCountries: ["IN"],
      });
      toast.success("Stripe configuration saved!");
      setStripeKey("");
      refetchStripe();
    } catch {
      toast.error("Failed to save Stripe configuration.");
    }
  };

  const formatDate = (timestamp: bigint) => {
    const ms = Number(timestamp / 1_000_000n);
    return new Date(ms).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <Skeleton className="w-32 h-8" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center gap-6">
        <button
          type="button"
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-muted"
          onClick={onClose}
          data-ocid="admin.close_button"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-primary mb-2">
            Admin Panel
          </h1>
          <p className="font-body text-muted-foreground">
            Sign in to manage products and orders
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => login()}
          disabled={loginStatus === "logging-in"}
          data-ocid="admin.primary_button"
          className="bg-primary text-primary-foreground"
        >
          <LogIn className="mr-2 w-4 h-4" />
          {loginStatus === "logging-in" ? "Signing in..." : "Sign In"}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-primary">
          Ècoelen Admin
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-body hidden sm:block">
            {identity?.getPrincipal().toString().slice(0, 12)}...
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={clear}
            data-ocid="admin.secondary_button"
          >
            <LogOut className="mr-1.5 w-3.5 h-3.5" />
            Sign Out
          </Button>
          <button
            type="button"
            className="p-2 rounded-md hover:bg-muted transition-colors"
            onClick={onClose}
            data-ocid="admin.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden px-6 py-6">
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger
              value="products"
              data-ocid="admin.products.tab"
              className="flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" />
              Products
              {products && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {products.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              data-ocid="admin.orders.tab"
              className="flex items-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4" />
              Orders
              {orders && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {orders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              data-ocid="admin.payments.tab"
              className="flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Product Catalog</CardTitle>
                <CardDescription className="font-body">
                  All products listed on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="admin.products.loading_state"
                  >
                    {[1, 2, 3].map((k) => (
                      <Skeleton key={k} className="h-12 w-full" />
                    ))}
                  </div>
                ) : (
                  <ScrollArea className="h-[60vh]">
                    <Table data-ocid="admin.products.table">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products?.map((p, i) => (
                          <TableRow
                            key={String(p.id)}
                            data-ocid={`admin.products.row.${i + 1}`}
                          >
                            <TableCell className="font-medium">
                              {p.name}
                            </TableCell>
                            <TableCell>{p.category}</TableCell>
                            <TableCell>{p.price}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  p.isAvailable ? "default" : "secondary"
                                }
                                className="text-xs"
                              >
                                {p.isAvailable ? "Available" : "Unavailable"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Orders</CardTitle>
                <CardDescription className="font-body">
                  Customer orders placed through the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div
                    className="space-y-3"
                    data-ocid="admin.orders.loading_state"
                  >
                    {[1, 2, 3].map((k) => (
                      <Skeleton key={k} className="h-12 w-full" />
                    ))}
                  </div>
                ) : orders && orders.length === 0 ? (
                  <div
                    data-ocid="admin.orders.empty_state"
                    className="text-center py-12 text-muted-foreground"
                  >
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-display text-lg">No orders yet</p>
                    <p className="font-body text-sm">
                      Orders will appear here once customers make purchases.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[60vh]">
                    <Table data-ocid="admin.orders.table">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders?.map((order, i) => {
                          const total = order.items.reduce(
                            (sum, item) =>
                              sum +
                              (Number.parseFloat(item.price) || 0) *
                                (Number.parseInt(item.quantity) || 1),
                            0,
                          );
                          return (
                            <TableRow
                              key={String(order.id)}
                              data-ocid={`admin.orders.row.${i + 1}`}
                            >
                              <TableCell className="font-mono text-xs">
                                #{String(order.id).slice(0, 8)}
                              </TableCell>
                              <TableCell className="font-medium">
                                {order.customerName}
                              </TableCell>
                              <TableCell className="font-body text-sm">
                                {order.phone}
                              </TableCell>
                              <TableCell className="max-w-[200px]">
                                <div className="text-xs text-muted-foreground">
                                  {order.items
                                    .map(
                                      (item) =>
                                        `${item.productName} ×${item.quantity}`,
                                    )
                                    .join(", ")}
                                </div>
                              </TableCell>
                              <TableCell className="font-display font-semibold text-primary">
                                ₹{total.toFixed(0)}
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground font-body">
                                {formatDate(order.timestamp)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Settings
                </CardTitle>
                <CardDescription className="font-body">
                  Configure Stripe to enable online payments at checkout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status banner */}
                {stripeLoading ? (
                  <Skeleton
                    className="h-12 w-full"
                    data-ocid="admin.payments.loading_state"
                  />
                ) : (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl border ${
                      stripeConfigured
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-amber-50 border-amber-200 text-amber-800"
                    }`}
                    data-ocid="admin.payments.panel"
                  >
                    {stripeConfigured ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold font-body text-sm">
                        {stripeConfigured
                          ? "Stripe is configured and active"
                          : "Stripe is not yet configured"}
                      </p>
                      <p className="text-xs mt-0.5 opacity-80">
                        {stripeConfigured
                          ? "Customers can pay online using cards at checkout."
                          : "Enter your Stripe secret key below to enable online payments."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Key input */}
                <div className="space-y-3">
                  <div>
                    <Label
                      htmlFor="stripe-key"
                      className="font-body text-sm font-medium mb-1.5 block"
                    >
                      Stripe Secret Key
                    </Label>
                    <p className="text-xs text-muted-foreground mb-2 font-body">
                      Find this in your{" "}
                      <a
                        href="https://dashboard.stripe.com/apikeys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-foreground"
                      >
                        Stripe Dashboard → API keys
                      </a>
                      . Use the <strong>Secret key</strong> (starts with{" "}
                      <code className="bg-muted px-1 rounded text-xs">
                        sk_live_
                      </code>{" "}
                      or{" "}
                      <code className="bg-muted px-1 rounded text-xs">
                        sk_test_
                      </code>
                      ).
                    </p>
                    <div className="relative">
                      <Input
                        id="stripe-key"
                        data-ocid="admin.payments.input"
                        type={showKey ? "text" : "password"}
                        placeholder="sk_live_..."
                        value={stripeKey}
                        onChange={(e) => setStripeKey(e.target.value)}
                        className="pr-20 font-mono text-sm"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => setShowKey((s) => !s)}
                      >
                        {showKey ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground font-body bg-muted/50 rounded-lg p-3">
                    <strong>Allowed countries:</strong> India (IN) — can be
                    expanded on request.
                  </div>

                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    data-ocid="admin.payments.save_button"
                    onClick={handleSaveStripe}
                    disabled={setStripeConfig.isPending || !stripeKey.trim()}
                  >
                    {setStripeConfig.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Stripe Configuration"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

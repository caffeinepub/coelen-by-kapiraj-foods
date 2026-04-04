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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import { useGetOrders } from "@/hooks/useQueries";
import {
  Loader2,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { UserProfile } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type DeliveryStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

const statusColors: Record<DeliveryStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Processing: "bg-blue-100 text-blue-800 border border-blue-300",
  Shipped: "bg-orange-100 text-orange-800 border border-orange-300",
  Delivered: "bg-green-100 text-green-800 border border-green-300",
};

function formatDate(timestamp: bigint) {
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AccountPage() {
  const { identity, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const isAuthenticated = !!identity;
  const principal = identity?.getPrincipal().toString();

  return (
    <section
      className="min-h-screen pt-28 pb-16 px-4"
      style={{ background: "oklch(0.12 0.05 155)" }}
    >
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="text-center mb-10">
            <h1
              className="font-display text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "oklch(0.95 0.03 90)" }}
            >
              My Account
            </h1>
            <p
              className="font-body text-base"
              style={{ color: "oklch(0.72 0.05 155)" }}
            >
              {isAuthenticated
                ? "Manage your profile, orders, and settings"
                : "Sign in to access your account"}
            </p>
          </div>

          {!isAuthenticated ? (
            <SignInCard
              onLogin={login}
              isLoggingIn={isLoggingIn}
              isInitializing={isInitializing}
            />
          ) : (
            <AccountTabs principal={principal ?? ""} onSignOut={clear} />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SignInCard({
  onLogin,
  isLoggingIn,
  isInitializing,
}: {
  onLogin: () => void;
  isLoggingIn: boolean;
  isInitializing: boolean;
}) {
  return (
    <Card
      className="mx-auto max-w-md shadow-xl"
      style={{
        background: "oklch(0.18 0.07 155)",
        border: "1.5px solid oklch(0.28 0.09 155)",
      }}
      data-ocid="account.modal"
    >
      <CardHeader className="text-center pb-4">
        <div
          className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: "oklch(0.25 0.10 155)" }}
        >
          <User className="w-8 h-8" style={{ color: "oklch(0.83 0.17 85)" }} />
        </div>
        <CardTitle
          className="font-display text-2xl"
          style={{ color: "oklch(0.95 0.03 90)" }}
        >
          Welcome Back
        </CardTitle>
        <CardDescription
          className="font-body"
          style={{ color: "oklch(0.65 0.05 155)" }}
        >
          Sign in with Internet Identity to access your account, view orders,
          and manage your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          data-ocid="account.primary_button"
          className="w-full py-3 font-body font-semibold text-base cta-shimmer"
          onClick={onLogin}
          disabled={isLoggingIn || isInitializing}
        >
          {isLoggingIn ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </span>
          )}
        </Button>
        <p
          className="text-center text-xs font-body"
          style={{ color: "oklch(0.55 0.05 155)" }}
        >
          New users automatically get an account after their first sign-in.
        </p>
      </CardContent>
    </Card>
  );
}

function AccountTabs({
  principal,
  onSignOut,
}: {
  principal: string;
  onSignOut: () => void;
}) {
  return (
    <Tabs defaultValue="profile">
      <TabsList
        className="w-full mb-8 h-12"
        style={{
          background: "oklch(0.18 0.07 155)",
          border: "1.5px solid oklch(0.28 0.09 155)",
        }}
      >
        <TabsTrigger
          data-ocid="account.profile.tab"
          value="profile"
          className="flex-1 font-body font-semibold data-[state=active]:text-white"
          style={{ color: "oklch(0.65 0.05 155)" }}
        >
          <User className="w-4 h-4 mr-1.5" /> My Profile
        </TabsTrigger>
        <TabsTrigger
          data-ocid="account.orders.tab"
          value="orders"
          className="flex-1 font-body font-semibold data-[state=active]:text-white"
          style={{ color: "oklch(0.65 0.05 155)" }}
        >
          <Package className="w-4 h-4 mr-1.5" /> My Orders
        </TabsTrigger>
        <TabsTrigger
          data-ocid="account.signout.tab"
          value="signout"
          className="flex-1 font-body font-semibold data-[state=active]:text-white"
          style={{ color: "oklch(0.65 0.05 155)" }}
        >
          <LogOut className="w-4 h-4 mr-1.5" /> Sign Out
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileTab />
      </TabsContent>

      <TabsContent value="orders">
        <OrdersTab />
      </TabsContent>

      <TabsContent value="signout">
        <SignOutTab principal={principal} onSignOut={onSignOut} />
      </TabsContent>
    </Tabs>
  );
}

function ProfileTab() {
  const { actor } = useActor();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!actor) return;
    actor
      .getCallerUserProfile()
      .then((p) => {
        if (p) setProfile(p);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [actor]);

  const handleSave = async () => {
    if (!actor) return;
    setSaving(true);
    try {
      await actor.saveCallerUserProfile(profile);
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const cardStyle = {
    background: "oklch(0.18 0.07 155)",
    border: "1.5px solid oklch(0.28 0.09 155)",
  };
  const labelStyle = { color: "oklch(0.72 0.05 155)" };
  const inputStyle = {
    background: "oklch(0.22 0.08 155)",
    border: "1.5px solid oklch(0.30 0.09 155)",
    color: "oklch(0.95 0.03 90)",
  };

  return (
    <Card style={cardStyle} data-ocid="account.profile.card">
      <CardHeader>
        <CardTitle
          className="font-display text-xl flex items-center gap-2"
          style={{ color: "oklch(0.95 0.03 90)" }}
        >
          <ShieldCheck
            className="w-5 h-5"
            style={{ color: "oklch(0.83 0.17 85)" }}
          />
          My Profile
        </CardTitle>
        <CardDescription
          className="font-body"
          style={{ color: "oklch(0.60 0.05 155)" }}
        >
          Update your personal information and delivery details
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div data-ocid="account.profile.loading_state" className="space-y-4">
            {[1, 2, 3, 4].map((k) => (
              <div
                key={k}
                className="h-10 rounded-lg animate-pulse"
                style={{ background: "oklch(0.25 0.08 155)" }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="acc-name"
                className="font-body text-sm font-medium flex items-center gap-1.5"
                style={labelStyle}
              >
                <User className="w-3.5 h-3.5" /> Full Name
              </Label>
              <Input
                id="acc-name"
                data-ocid="account.profile.input"
                placeholder="Your full name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
                style={inputStyle}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="acc-email"
                className="font-body text-sm font-medium flex items-center gap-1.5"
                style={labelStyle}
              >
                <Mail className="w-3.5 h-3.5" /> Email Address
              </Label>
              <Input
                id="acc-email"
                data-ocid="account.profile.input"
                type="email"
                placeholder="your@email.com"
                value={profile.email}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, email: e.target.value }))
                }
                style={inputStyle}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="acc-phone"
                className="font-body text-sm font-medium flex items-center gap-1.5"
                style={labelStyle}
              >
                <Phone className="w-3.5 h-3.5" /> Phone Number
              </Label>
              <Input
                id="acc-phone"
                data-ocid="account.profile.input"
                placeholder="10-digit mobile number"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, phone: e.target.value }))
                }
                style={inputStyle}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="acc-address"
                className="font-body text-sm font-medium flex items-center gap-1.5"
                style={labelStyle}
              >
                <MapPin className="w-3.5 h-3.5" /> Delivery Address
              </Label>
              <Input
                id="acc-address"
                data-ocid="account.profile.input"
                placeholder="Full address with pincode"
                value={profile.address}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, address: e.target.value }))
                }
                style={inputStyle}
              />
            </div>
            <Button
              data-ocid="account.profile.save_button"
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 font-body font-semibold cta-shimmer"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OrdersTab() {
  const { data: orders, isLoading } = useGetOrders();

  const cardStyle = {
    background: "oklch(0.18 0.07 155)",
    border: "1.5px solid oklch(0.28 0.09 155)",
  };

  return (
    <Card style={cardStyle} data-ocid="account.orders.card">
      <CardHeader>
        <CardTitle
          className="font-display text-xl flex items-center gap-2"
          style={{ color: "oklch(0.95 0.03 90)" }}
        >
          <Package
            className="w-5 h-5"
            style={{ color: "oklch(0.83 0.17 85)" }}
          />
          My Orders
        </CardTitle>
        <CardDescription
          className="font-body"
          style={{ color: "oklch(0.60 0.05 155)" }}
        >
          Track and view all your past orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div data-ocid="account.orders.loading_state" className="space-y-3">
            {[1, 2, 3].map((k) => (
              <div
                key={k}
                className="h-20 rounded-xl animate-pulse"
                style={{ background: "oklch(0.25 0.08 155)" }}
              />
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          <div
            data-ocid="account.orders.empty_state"
            className="text-center py-12"
          >
            <Package
              className="w-16 h-16 mx-auto mb-4 opacity-20"
              style={{ color: "oklch(0.72 0.05 155)" }}
            />
            <p
              className="font-display text-lg mb-1"
              style={{ color: "oklch(0.72 0.05 155)" }}
            >
              No orders yet
            </p>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.55 0.05 155)" }}
            >
              Your orders will appear here once you make a purchase.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const statusKey = `order_status_${String(order.id)}`;
              const deliveryStatus =
                (localStorage.getItem(statusKey) as DeliveryStatus) ||
                "Pending";
              const total = order.items.reduce(
                (sum, item) =>
                  sum +
                  (Number.parseFloat(item.price) || 0) *
                    (Number.parseInt(item.quantity) || 1),
                0,
              );

              return (
                <div
                  key={String(order.id)}
                  data-ocid={`account.orders.item.${i + 1}`}
                  className="rounded-xl p-4 space-y-3"
                  style={{
                    background: "oklch(0.22 0.08 155)",
                    border: "1.5px solid oklch(0.30 0.09 155)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="font-mono text-xs mb-0.5"
                        style={{ color: "oklch(0.60 0.05 155)" }}
                      >
                        Order #{String(order.id).slice(0, 8)}
                      </p>
                      <p
                        className="font-body text-xs"
                        style={{ color: "oklch(0.55 0.05 155)" }}
                      >
                        {formatDate(order.timestamp)}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold font-body rounded-full px-3 py-1 ${statusColors[deliveryStatus]}`}
                    >
                      {deliveryStatus}
                    </span>
                  </div>

                  <Separator style={{ background: "oklch(0.28 0.08 155)" }} />

                  <div className="space-y-1">
                    {order.items.map((item, j) => (
                      <div
                        key={`${item.productName}-${j}`}
                        className="flex justify-between items-center"
                      >
                        <span
                          className="font-body text-sm"
                          style={{ color: "oklch(0.85 0.04 90)" }}
                        >
                          {item.productName} ×{item.quantity}
                        </span>
                        <span
                          className="font-body text-sm font-medium"
                          style={{ color: "oklch(0.72 0.05 155)" }}
                        >
                          ₹
                          {(
                            Number.parseFloat(item.price) *
                            Number.parseInt(item.quantity || "1")
                          ).toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator style={{ background: "oklch(0.28 0.08 155)" }} />

                  <div className="flex justify-between items-center">
                    <span
                      className="font-display font-semibold text-sm"
                      style={{ color: "oklch(0.72 0.05 155)" }}
                    >
                      Total
                    </span>
                    <span
                      className="font-display font-bold text-base"
                      style={{ color: "oklch(0.83 0.17 85)" }}
                    >
                      ₹{total.toFixed(0)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SignOutTab({
  principal,
  onSignOut,
}: {
  principal: string;
  onSignOut: () => void;
}) {
  const cardStyle = {
    background: "oklch(0.18 0.07 155)",
    border: "1.5px solid oklch(0.28 0.09 155)",
  };

  return (
    <Card style={cardStyle} data-ocid="account.signout.card">
      <CardHeader>
        <CardTitle
          className="font-display text-xl flex items-center gap-2"
          style={{ color: "oklch(0.95 0.03 90)" }}
        >
          <LogOut
            className="w-5 h-5"
            style={{ color: "oklch(0.83 0.17 85)" }}
          />
          Sign Out
        </CardTitle>
        <CardDescription
          className="font-body"
          style={{ color: "oklch(0.60 0.05 155)" }}
        >
          You are currently signed in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.22 0.08 155)",
            border: "1.5px solid oklch(0.30 0.09 155)",
          }}
        >
          <p
            className="font-body text-xs mb-1"
            style={{ color: "oklch(0.55 0.05 155)" }}
          >
            Your Principal ID
          </p>
          <p
            className="font-mono text-xs break-all"
            style={{ color: "oklch(0.72 0.05 155)" }}
          >
            {principal}
          </p>
        </div>
        <Badge
          className="w-full justify-center py-2 font-body"
          style={{
            background: "oklch(0.28 0.12 155)",
            color: "oklch(0.83 0.17 85)",
          }}
        >
          ✓ Verified with Internet Identity
        </Badge>
        <Button
          data-ocid="account.signout.button"
          variant="destructive"
          className="w-full py-3 font-body font-semibold"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}

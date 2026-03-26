import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactInquiry } from "@/hooks/useQueries";
import { CheckCircle, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitContactInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutation.mutateAsync({ name, email, message });
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send. Please try again.");
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: "info@kapirajfoods.com" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210" },
    {
      icon: MapPin,
      label: "Address",
      value: "Kapiraj Foods Pvt. Ltd., Industrial Area, Phase II, India",
    },
  ];

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 md:py-28"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.18 0.08 155) 0%, oklch(0.22 0.10 155) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3 font-semibold font-body"
            style={{ color: "oklch(0.83 0.17 85)" }}
          >
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            We’d Love to Hear From You
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-2xl font-semibold text-white mb-4">
              Kapiraj Foods
            </h3>
            <p
              className="font-body text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Have questions about our products, bulk orders, or want to partner
              with us? Drop us a message and our team will respond within 24
              hours.
            </p>
            <div className="space-y-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(232,112,10,0.2)" }}
                  >
                    <item.icon
                      size={16}
                      style={{ color: "oklch(0.83 0.17 85)" }}
                    />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-white">
                      {item.label}
                    </p>
                    <p
                      className="font-body text-sm"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <CheckCircle
                  size={48}
                  className="mb-4"
                  style={{ color: "oklch(0.83 0.17 85)" }}
                />
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p
                  className="font-body"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Thank you for reaching out. We’ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl p-7"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                data-ocid="contact.panel"
              >
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-name"
                    className="font-body text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Your Name
                  </Label>
                  <input
                    id="contact-name"
                    data-ocid="contact.input"
                    placeholder="Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-body focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-email"
                    className="font-body text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Email Address
                  </Label>
                  <input
                    id="contact-email"
                    data-ocid="contact.input"
                    type="email"
                    placeholder="priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-body focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="font-body text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Message
                  </Label>
                  <textarea
                    id="contact-message"
                    data-ocid="contact.textarea"
                    placeholder="Tell us about your inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-body focus:outline-none transition-all resize-none"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={mutation.isPending}
                  className="w-full py-3 rounded-xl font-bold font-body text-white transition-all duration-300 cta-shimmer disabled:opacity-60"
                >
                  {mutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
                {mutation.isError && (
                  <p
                    data-ocid="contact.error_state"
                    className="text-sm font-body text-center"
                    style={{ color: "oklch(0.72 0.22 25)" }}
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

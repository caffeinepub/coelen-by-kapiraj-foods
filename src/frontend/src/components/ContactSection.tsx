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

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3 font-semibold">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            We'd Love to Hear From You
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Kapiraj Foods
            </h3>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
              Have questions about our products, bulk orders, or want to partner
              with us? Drop us a message and our team will respond within 24
              hours.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground text-sm">
                    Email
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    info@kapirajfoods.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground text-sm">
                    Phone
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    +91 98765 43210
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground text-sm">
                    Address
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    Kapiraj Foods Pvt. Ltd.
                    <br />
                    Industrial Area, Phase II
                    <br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="h-full flex flex-col items-center justify-center text-center p-10 bg-primary/5 rounded-2xl border border-primary/15"
              >
                <CheckCircle size={48} className="text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="font-body text-muted-foreground">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-card rounded-2xl p-7 shadow-warm"
                data-ocid="contact.panel"
              >
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-name"
                    className="font-body text-sm font-medium"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.input"
                    placeholder="Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="font-body"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-email"
                    className="font-body text-sm font-medium"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    data-ocid="contact.input"
                    type="email"
                    placeholder="priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="font-body"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="font-body text-sm font-medium"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    data-ocid="contact.textarea"
                    placeholder="Tell us about your inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="font-body resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={mutation.isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-5"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
                {mutation.isError && (
                  <p
                    data-ocid="contact.error_state"
                    className="text-destructive text-sm font-body text-center"
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

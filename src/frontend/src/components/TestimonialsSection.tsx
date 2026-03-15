import { Star } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";

const testimonials = [
  {
    id: "priya",
    name: "Priya Sharma",
    location: "Mumbai",
    initials: "PS",
    rating: 5,
    text: "Ècoelen's turmeric powder is the most vibrant and aromatic I've ever used. You can smell the difference the moment you open the packet. My curries have never tasted better!",
  },
  {
    id: "rajan",
    name: "Rajan Nair",
    location: "Bangalore",
    initials: "RN",
    rating: 5,
    text: "The Garam Masala is absolutely exceptional. It smells like it was freshly ground — because it basically is. Kapiraj Foods has set a new standard for what masala should be.",
  },
  {
    id: "anita",
    name: "Anita Desai",
    location: "Pune",
    initials: "AD",
    rating: 5,
    text: "I switched to Ècoelen's Chai Masala and won't go back. The blend is perfect — spicy, warm, and deeply fragrant. My morning chai ritual is now something I truly look forward to.",
  },
  {
    id: "meera",
    name: "Meera Krishnan",
    location: "Chennai",
    initials: "MK",
    rating: 5,
    text: "The Amla Powder has become part of my daily wellness routine. It dissolves perfectly, has zero bitterness, and I genuinely feel the difference. Pure, honest product — I trust this brand completely.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const starKeys = ["s1", "s2", "s3", "s4", "s5"];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-ocid="testimonials.section"
      className="py-20 md:py-28 bg-primary overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3 font-semibold">
            What Our Customers Say
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
            Loved by Home Cooks
          </h2>

          {/* Star rating summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 inline-flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-1">
              {starKeys.map((k) => (
                <Star
                  key={k}
                  size={22}
                  className="text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="font-body text-primary-foreground/80 text-sm">
              <span className="font-bold text-primary-foreground text-base">
                4.9 / 5
              </span>{" "}
              from over{" "}
              <span className="font-semibold text-accent">
                5,000+ customers
              </span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              data-ocid={`testimonials.item.${i + 1}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/15 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {starKeys.slice(0, t.rating).map((k) => (
                  <Star key={k} size={16} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="font-body text-primary-foreground/85 text-sm leading-relaxed mb-6 italic flex-1">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-sm text-accent-foreground">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-primary-foreground text-sm">
                    {t.name}
                  </p>
                  <p className="font-body text-primary-foreground/60 text-xs">
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

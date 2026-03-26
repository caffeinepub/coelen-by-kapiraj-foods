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
    text: "Ècoelen's turmeric powder is the most vibrant and aromatic I've ever used. My curries have never tasted better!",
  },
  {
    id: "rajan",
    name: "Rajan Nair",
    location: "Bangalore",
    initials: "RN",
    rating: 5,
    text: "The Garam Masala is absolutely exceptional. It smells like it was freshly ground. Kapiraj Foods has set a new standard.",
  },
  {
    id: "anita",
    name: "Anita Desai",
    location: "Pune",
    initials: "AD",
    rating: 5,
    text: "I switched to Ècoelen's Chai Masala and won't go back. The blend is perfect — spicy, warm, and deeply fragrant.",
  },
  {
    id: "meera",
    name: "Meera Krishnan",
    location: "Chennai",
    initials: "MK",
    rating: 5,
    text: "The Amla Powder has become part of my daily wellness routine. Pure, honest product — I trust this brand completely.",
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
      className="py-20 md:py-28 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.08 155) 0%, oklch(0.25 0.12 155) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,112,10,0.12) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,200,66,0.10) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3 font-semibold font-body"
            style={{ color: "oklch(0.83 0.17 85)" }}
          >
            What Our Customers Say
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Loved by Home Cooks
          </h2>
          <div className="mt-5 inline-flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {starKeys.map((k) => (
                <Star
                  key={k}
                  size={20}
                  style={{
                    color: "oklch(0.83 0.17 85)",
                    fill: "oklch(0.83 0.17 85)",
                  }}
                />
              ))}
            </div>
            <p
              className="font-body text-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <span className="font-bold text-white text-base">4.9 / 5</span>{" "}
              from over{" "}
              <span
                className="font-semibold"
                style={{ color: "oklch(0.83 0.17 85)" }}
              >
                5,000+ customers
              </span>
            </p>
          </div>
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
              className="rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div className="flex gap-0.5 mb-4">
                {starKeys.slice(0, t.rating).map((k) => (
                  <Star
                    key={k}
                    size={14}
                    style={{
                      color: "oklch(0.83 0.17 85)",
                      fill: "oklch(0.83 0.17 85)",
                    }}
                  />
                ))}
              </div>
              <p
                className="font-body text-sm leading-relaxed mb-6 italic flex-1"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm"
                  style={{
                    background: "rgba(232,112,10,0.25)",
                    color: "oklch(0.83 0.17 85)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-white">
                    {t.name}
                  </p>
                  <p
                    className="font-body text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
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

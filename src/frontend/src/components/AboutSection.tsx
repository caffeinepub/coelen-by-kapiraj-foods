import { Award, Leaf, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { id: "natural", icon: Leaf, label: "Natural Ingredients", value: "100%" },
  { id: "certified", icon: Award, label: "Quality Certified", value: "FSSAI" },
  { id: "customers", icon: Users, label: "Happy Customers", value: "5,000+" },
  { id: "regions", icon: MapPin, label: "Sourcing Regions", value: "12+" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "oklch(0.97 0.018 90)" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4 font-semibold font-body"
              style={{ color: "oklch(0.62 0.19 50)" }}
            >
              Our Story
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ color: "oklch(0.20 0.08 155)" }}
            >
              Born from a Passion for{" "}
              <span style={{ color: "oklch(0.30 0.10 155)" }}>
                Authentic Flavours
              </span>
            </h2>
            <div
              className="space-y-4 font-body text-base leading-relaxed"
              style={{ color: "oklch(0.45 0.05 155)" }}
            >
              <p>
                At{" "}
                <strong style={{ color: "oklch(0.20 0.08 155)" }}>
                  Kapiraj Foods
                </strong>
                , we bring you{" "}
                <strong style={{ color: "oklch(0.30 0.10 155)" }}>
                  Ècoelen
                </strong>{" "}
                — a brand born from a deep passion for pure, authentic flavours
                that have graced Indian kitchens for generations.
              </p>
              <p>
                Our powders are sourced from the finest farms across the country
                and processed with meticulous care to preserve nature’s
                goodness. From the golden fields of turmeric in Erode to the
                lush cardamom estates of Kerala, every ingredient tells a story.
              </p>
              <p>
                We believe great food begins with great ingredients. That’s why
                Ècoelen products contain no artificial additives, preservatives,
                or fillers — just the pure essence of nature, packaged for your
                kitchen.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  className="flex items-center gap-3 rounded-xl p-4"
                  style={{
                    background: "white",
                    border: "1.5px solid oklch(0.90 0.04 155)",
                    boxShadow: "0 2px 12px rgba(15,76,53,0.07)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(15,76,53,0.08)" }}
                  >
                    <stat.icon
                      size={18}
                      style={{ color: "oklch(0.30 0.10 155)" }}
                    />
                  </div>
                  <div>
                    <div
                      className="font-display font-bold text-xl"
                      style={{ color: "oklch(0.20 0.08 155)" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-body text-xs"
                      style={{ color: "oklch(0.55 0.06 155)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 24px 64px rgba(15,76,53,0.2)" }}
            >
              <img
                src="/assets/generated/about-team.dim_600x450.jpg"
                alt="Kapiraj Foods team and facility"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Overlay badge */}
              <div
                className="absolute bottom-6 left-6 rounded-2xl px-5 py-3"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 8px 32px rgba(15,76,53,0.15)",
                }}
              >
                <p
                  className="font-display font-bold text-2xl"
                  style={{ color: "oklch(0.30 0.10 155)" }}
                >
                  Est. 2026
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "oklch(0.55 0.06 155)" }}
                >
                  Kapiraj Foods
                </p>
              </div>
            </div>
            {/* Decorative shapes */}
            <div
              className="absolute -top-5 -right-5 w-24 h-24 rounded-2xl -z-10"
              style={{ background: "rgba(232,112,10,0.15)" }}
            />
            <div
              className="absolute -bottom-5 -left-5 w-16 h-16 rounded-xl -z-10"
              style={{ background: "rgba(15,76,53,0.12)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

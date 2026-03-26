import { ChefHat, FlaskConical, Sprout, Wind } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: Sprout,
    title: "Field Sourcing",
    desc: "Handpicked from trusted farms across India, selected for peak aroma and nutrient density.",
    accent: "oklch(0.52 0.17 155)",
    bg: "rgba(15,76,53,0.08)",
    border: "rgba(15,76,53,0.2)",
  },
  {
    number: "02",
    icon: Wind,
    title: "Natural Processing",
    desc: "Sun-dried and cold-ground to preserve natural oils, nutrients, and authentic flavours.",
    accent: "oklch(0.55 0.15 195)",
    bg: "rgba(20,184,166,0.07)",
    border: "rgba(20,184,166,0.2)",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Quality Testing",
    desc: "Every batch is tested for aroma, purity, and taste before it leaves our facility.",
    accent: "oklch(0.55 0.20 310)",
    bg: "rgba(168,85,247,0.07)",
    border: "rgba(168,85,247,0.2)",
  },
  {
    number: "04",
    icon: ChefHat,
    title: "To Your Kitchen",
    desc: "Packed fresh and delivered to your door, sealed to lock in freshness and flavour.",
    accent: "oklch(0.62 0.19 50)",
    bg: "rgba(232,112,10,0.07)",
    border: "rgba(232,112,10,0.2)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function ProcessSection() {
  return (
    <section
      id="process"
      data-ocid="process.section"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "oklch(0.97 0.018 90)" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3 font-semibold font-body"
            style={{ color: "oklch(0.62 0.19 50)" }}
          >
            Our Promise
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "oklch(0.20 0.08 155)" }}
          >
            Farm to Your Kitchen
          </h2>
          <p
            className="mt-4 font-body text-base max-w-lg mx-auto"
            style={{ color: "oklch(0.50 0.06 155)" }}
          >
            Every Ècoelen product travels a carefully crafted journey before it
            reaches you.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px z-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.52 0.17 155), oklch(0.55 0.15 195), oklch(0.55 0.20 310), oklch(0.62 0.19 50))",
              opacity: 0.4,
            }}
          />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative z-10 rounded-2xl p-6 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: step.bg,
                  border: `1.5px solid ${step.border}`,
                  boxShadow: "0 2px 16px rgba(15,76,53,0.06)",
                }}
              >
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "white",
                      border: `1.5px solid ${step.border}`,
                    }}
                  >
                    <Icon size={24} style={{ color: step.accent }} />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 font-display font-black text-xs w-6 h-6 flex items-center justify-center rounded-full"
                    style={{
                      color: step.accent,
                      background: "white",
                      border: `1.5px solid ${step.border}`,
                    }}
                  >
                    {step.number.slice(1)}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-display font-bold text-lg mb-1"
                    style={{ color: step.accent }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "oklch(0.50 0.06 155)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

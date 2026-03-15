import type { Variants } from "motion/react";
import { motion } from "motion/react";

const features = [
  {
    id: "natural",
    emoji: "\u{1F33F}",
    title: "100% Natural",
    description:
      "No artificial colors, flavors, or preservatives. Every powder is pure nature in a packet.",
    bg: "bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200",
    emoji_bg: "bg-green-100",
  },
  {
    id: "additives",
    emoji: "\u{1F6AB}",
    title: "Zero Additives",
    description:
      "What you see on the label is exactly what's inside. Pure ingredients, nothing hidden.",
    bg: "bg-gradient-to-br from-rose-50 to-pink-100 border border-rose-200",
    emoji_bg: "bg-rose-100",
  },
  {
    id: "fresh",
    emoji: "\u{1F33E}",
    title: "Farm Fresh",
    description:
      "Sourced directly from trusted farms. Freshness locked in from harvest to your kitchen.",
    bg: "bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200",
    emoji_bg: "bg-amber-100",
  },
  {
    id: "quality",
    emoji: "\u2B50",
    title: "Premium Quality",
    description:
      "Every batch is carefully tested and graded to meet the highest standards of aroma and taste.",
    bg: "bg-gradient-to-br from-sky-50 to-blue-100 border border-sky-200",
    emoji_bg: "bg-sky-100",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function FeaturesSection() {
  return (
    <section
      id="features"
      data-ocid="features.section"
      className="py-20 md:py-28 bg-gradient-to-b from-amber-50/60 to-background"
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
            Why Choose Ècoelen
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Nature's Best, Every Time
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              data-ocid={`features.card.${i + 1}`}
              className={`${feature.bg} rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div
                className={`w-14 h-14 ${feature.emoji_bg} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.emoji}
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

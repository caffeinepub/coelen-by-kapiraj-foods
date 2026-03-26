import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    id: "natural",
    emoji: "🌿",
    title: "100% Natural",
    description:
      "No artificial colors, flavors, or preservatives. Every powder is pure nature in a packet.",
    accent: "oklch(0.52 0.17 155)",
    bg: "rgba(15,76,53,0.06)",
    border: "rgba(15,76,53,0.15)",
  },
  {
    id: "additives",
    emoji: "🚫",
    title: "Zero Additives",
    description:
      "What you see on the label is exactly what's inside. Pure ingredients, nothing hidden.",
    accent: "oklch(0.58 0.22 25)",
    bg: "rgba(232,112,10,0.06)",
    border: "rgba(232,112,10,0.15)",
  },
  {
    id: "fresh",
    emoji: "🌾",
    title: "Farm Fresh",
    description:
      "Sourced directly from trusted farms. Freshness locked in from harvest to your kitchen.",
    accent: "oklch(0.62 0.19 50)",
    bg: "rgba(245,200,66,0.08)",
    border: "rgba(245,200,66,0.2)",
  },
  {
    id: "quality",
    emoji: "⭐",
    title: "Premium Quality",
    description:
      "Every batch is carefully tested and graded to meet the highest standards of aroma and taste.",
    accent: "oklch(0.55 0.20 310)",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.15)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function StatCounter({
  value,
  label,
  active,
}: { value: number; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="text-center">
      <div
        className="font-display font-bold text-3xl md:text-4xl"
        style={{ color: "oklch(0.83 0.17 85)" }}
      >
        {count}
        {label}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="features"
      data-ocid="features.section"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.97 0.018 90)" }}
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
            style={{ color: "oklch(0.62 0.19 50)" }}
          >
            Why Choose Ècoelen
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "oklch(0.20 0.08 155)" }}
          >
            Nature&apos;s Best, Every Time
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
              className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 group cursor-default"
              style={{
                background: feature.bg,
                border: `1.5px solid ${feature.border}`,
                boxShadow: "0 2px 16px rgba(15,76,53,0.06)",
              }}
              whileHover={{
                boxShadow: `0 12px 36px ${feature.border}, 0 2px 12px rgba(0,0,0,0.06)`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: feature.border,
                  border: `1px solid ${feature.border}`,
                }}
              >
                {feature.emoji}
              </div>
              <h3
                className="font-display font-bold text-xl mb-2"
                style={{ color: "oklch(0.22 0.08 155)" }}
              >
                {feature.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.50 0.06 155)" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated stat counters */}
        <div
          ref={statsRef}
          className="mt-20 rounded-3xl py-12 px-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.10 155) 0%, oklch(0.28 0.12 155) 100%)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: 30, label: "+", desc: "Products" },
              { num: 5000, label: "+", desc: "Happy Customers" },
              { num: 12, label: "+", desc: "Sourcing Regions" },
              { num: 100, label: "%", desc: "Natural" },
            ].map((s) => (
              <div key={s.desc} className="text-center">
                <div
                  className="font-display font-bold text-3xl md:text-4xl mb-1"
                  style={{ color: "oklch(0.83 0.17 85)" }}
                >
                  <StatCounter
                    value={s.num}
                    label={s.label}
                    active={statsVisible}
                  />
                </div>
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

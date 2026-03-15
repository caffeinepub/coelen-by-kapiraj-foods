import { ChefHat, FlaskConical, Sprout, Wind } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: Sprout,
    title: "Field Sourcing",
    desc: "Handpicked from trusted farms across India, selected for peak aroma and nutrient density.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    numColor: "text-green-500",
    dotColor: "bg-green-400",
  },
  {
    number: "02",
    icon: Wind,
    title: "Natural Processing",
    desc: "Sun-dried and cold-ground to preserve natural oils, nutrients, and authentic flavours.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    numColor: "text-sky-500",
    dotColor: "bg-sky-400",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Quality Testing",
    desc: "Every batch is tested for aroma, purity, and taste before it leaves our facility.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    numColor: "text-violet-500",
    dotColor: "bg-violet-400",
  },
  {
    number: "04",
    icon: ChefHat,
    title: "To Your Kitchen",
    desc: "Packed fresh and delivered to your door, sealed to lock in freshness and flavour.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    numColor: "text-amber-500",
    dotColor: "bg-amber-400",
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
      className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3 font-semibold">
            Our Promise
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Farm to Your Kitchen
          </h2>
          <p className="mt-4 text-muted-foreground font-body text-base max-w-lg mx-auto">
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
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-green-300 via-sky-300 via-violet-300 to-amber-300 z-0" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`relative z-10 rounded-2xl border ${step.border} ${step.bg} p-6 text-center flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-white border ${step.border} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className={`${step.color}`} size={24} />
                  </div>
                  <span
                    className={`absolute -top-2 -right-2 font-display font-black text-xs ${step.numColor} bg-white rounded-full w-6 h-6 flex items-center justify-center border ${step.border} shadow-sm`}
                  >
                    {step.number.slice(1)}
                  </span>
                </div>
                <div>
                  <h3
                    className={`font-display font-bold text-lg ${step.color} mb-1`}
                  >
                    {step.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
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

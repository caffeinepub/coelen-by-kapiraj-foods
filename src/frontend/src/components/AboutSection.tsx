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
      className="py-20 md:py-28 bg-muted overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-4 font-semibold">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Born from a Passion for
              <span className="text-primary block">Authentic Flavours</span>
            </h2>
            <div className="space-y-4 font-body text-foreground/75 text-base leading-relaxed">
              <p>
                At{" "}
                <strong className="text-foreground font-semibold">
                  Kapiraj Foods
                </strong>
                , we bring you{" "}
                <strong className="text-primary font-semibold">Ècoelen</strong>{" "}
                — a brand born from a deep passion for pure, authentic flavours
                that have graced Indian kitchens for generations.
              </p>
              <p>
                Our powders are sourced from the finest farms across the country
                and processed with meticulous care to preserve nature's
                goodness. From the golden fields of turmeric in Erode to the
                lush cardamom estates of Kerala, every ingredient tells a story.
              </p>
              <p>
                We believe great food begins with great ingredients. That's why
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
                  className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <stat.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-foreground">
                      {stat.value}
                    </div>
                    <div className="font-body text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-warm-lg">
              <img
                src="/assets/generated/about-image.dim_600x600.jpg"
                alt="Kapiraj Foods kitchen and spices"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-warm">
                <p className="font-display font-bold text-2xl text-primary">
                  Est. 2020
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  Kapiraj Foods
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/15 rounded-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

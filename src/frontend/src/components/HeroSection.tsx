import { ChevronDown, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigation } from "../context/NavigationContext";

const FLOATING_SPICES = [
  { emoji: "🌿", x: "6%", y: "25%", delay: 0, dur: 5.2 },
  { emoji: "✨", x: "80%", y: "18%", delay: 1.1, dur: 6.5 },
  { emoji: "🌶️", x: "90%", y: "58%", delay: 0.6, dur: 5.8 },
  { emoji: "⭐", x: "5%", y: "65%", delay: 1.7, dur: 7 },
  { emoji: "🍃", x: "18%", y: "75%", delay: 0.4, dur: 6.2 },
  { emoji: "🧄", x: "74%", y: "78%", delay: 2.0, dur: 5.4 },
  { emoji: "🫙", x: "93%", y: "30%", delay: 0.9, dur: 6.8 },
  { emoji: "🌾", x: "12%", y: "42%", delay: 1.5, dur: 5.2 },
];

const PARTICLES = [
  {
    x: "22%",
    y: "14%",
    size: 7,
    color: "oklch(0.83 0.17 85)",
    dur: 4.5,
    delay: 0,
  },
  {
    x: "55%",
    y: "8%",
    size: 5,
    color: "oklch(0.62 0.19 50)",
    dur: 5.5,
    delay: 0.7,
  },
  {
    x: "75%",
    y: "12%",
    size: 9,
    color: "oklch(0.83 0.17 85)",
    dur: 4,
    delay: 1.2,
  },
  {
    x: "38%",
    y: "20%",
    size: 4,
    color: "oklch(0.62 0.19 50)",
    dur: 6,
    delay: 0.3,
  },
  {
    x: "88%",
    y: "20%",
    size: 6,
    color: "oklch(0.83 0.17 85)",
    dur: 5,
    delay: 1.8,
  },
  {
    x: "10%",
    y: "30%",
    size: 5,
    color: "oklch(0.62 0.19 50)",
    dur: 4.8,
    delay: 0.5,
  },
];

export function HeroSection() {
  const { setActivePage, setHomeSearchQuery } = useNavigation();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setHomeSearchQuery(query.trim());
      setActivePage("products");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="home"
        data-ocid="hero.section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.18 0.08 155)" }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x600.jpg"
            alt="Ècoelen premium food powders"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.18 0.08 155) 0%, oklch(0.22 0.10 155 / 0.8) 40%, oklch(0.14 0.05 155) 100%)",
            }}
          />
        </div>

        {/* Glowing orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "10%",
            top: "20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,112,10,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            right: "8%",
            bottom: "20%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,200,66,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: "40%",
            top: "5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(15,76,53,0.5) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: static particles
            key={i}
            className="absolute rounded-full pointer-events-none hidden md:block"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 10px 2px ${p.color}`,
            }}
            animate={{
              y: [0, -16, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.35, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: p.dur,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating spice emojis */}
        {FLOATING_SPICES.map((item) => (
          <motion.span
            key={item.emoji}
            className="absolute text-2xl pointer-events-none z-10 hidden md:block"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -16, 0],
              rotate: [0, 6, -6, 0],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: item.dur,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.span>
        ))}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block text-xs tracking-[0.4em] uppercase mb-5 font-body font-semibold px-4 py-1.5 rounded-full"
            style={{
              color: "oklch(0.83 0.17 85)",
              background: "rgba(245,200,66,0.12)",
              border: "1px solid rgba(245,200,66,0.25)",
            }}
          >
            Kapiraj Foods presents
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.92] tracking-tight mb-6"
          >
            <span className="hero-headline-gradient">Pure.</span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Natural.
            </span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.19 50) 0%, oklch(0.83 0.17 85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Authentic.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-body text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Discover Ècoelen's range of premium food powders crafted from the
            finest farms, free from additives, and full of nature's goodness.
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex items-center max-w-lg mx-auto mb-8"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none"
                style={{ color: "rgba(255,255,255,0.4)" }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search turmeric, chai masala, moringa..."
                className="w-full pl-12 pr-4 py-4 rounded-l-full text-sm font-body focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRight: "none",
                  color: "white",
                }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 rounded-r-full font-bold text-sm font-body text-white transition-all duration-200"
              style={{
                background: "oklch(0.62 0.19 50)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderLeft: "none",
              }}
            >
              Search
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => setActivePage("products")}
              className="cta-shimmer px-10 py-4 rounded-full text-base font-bold font-body text-white shadow-glow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Explore Products
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => setActivePage("about")}
              className="px-8 py-4 rounded-full text-base font-semibold font-body transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Our Story
            </button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown style={{ color: "rgba(255,255,255,0.4)" }} size={28} />
        </motion.div>
      </section>

      {/* Section divider */}
      <div
        className="h-1.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.30 0.10 155) 0%, oklch(0.62 0.19 50) 40%, oklch(0.83 0.17 85) 60%, oklch(0.62 0.19 50) 80%, oklch(0.30 0.10 155) 100%)",
        }}
      />
    </>
  );
}

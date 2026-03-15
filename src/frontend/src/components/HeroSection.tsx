import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useNavigation } from "../context/NavigationContext";

const FLOATING_ITEMS = [
  {
    emoji: "\uD83C\uDF3F",
    x: "8%",
    y: "22%",
    delay: 0,
    duration: 5,
    size: "text-3xl",
  },
  {
    emoji: "\u2728",
    x: "78%",
    y: "15%",
    delay: 1.2,
    duration: 6.5,
    size: "text-2xl",
  },
  {
    emoji: "\uD83C\uDF36\uFE0F",
    x: "88%",
    y: "60%",
    delay: 0.6,
    duration: 5.8,
    size: "text-4xl",
  },
  {
    emoji: "\u2B50",
    x: "6%",
    y: "68%",
    delay: 1.8,
    duration: 7,
    size: "text-xl",
  },
  {
    emoji: "\uD83C\uDF43",
    x: "20%",
    y: "78%",
    delay: 0.4,
    duration: 6.2,
    size: "text-3xl",
  },
  {
    emoji: "\uD83E\uDDC4",
    x: "72%",
    y: "80%",
    delay: 2.1,
    duration: 5.4,
    size: "text-2xl",
  },
  {
    emoji: "\uD83E\uDEFA",
    x: "92%",
    y: "32%",
    delay: 0.9,
    duration: 6.8,
    size: "text-3xl",
  },
  {
    emoji: "\uD83C\uDF3E",
    x: "15%",
    y: "40%",
    delay: 1.5,
    duration: 5.2,
    size: "text-2xl",
  },
  {
    emoji: "\uD83E\uDED9",
    x: "60%",
    y: "10%",
    delay: 2.4,
    duration: 7.2,
    size: "text-xl",
  },
  {
    emoji: "\uD83C\uDF38",
    x: "45%",
    y: "85%",
    delay: 0.3,
    duration: 5.6,
    size: "text-2xl",
  },
];

// Animated colorful orbs for the upper area
const COLOR_ORBS = [
  { color: "#f97316", x: "5%", y: "8%", size: 180, delay: 0 },
  { color: "#eab308", x: "25%", y: "3%", size: 120, delay: 0.8 },
  { color: "#ef4444", x: "50%", y: "2%", size: 200, delay: 0.4 },
  { color: "#22c55e", x: "72%", y: "5%", size: 140, delay: 1.2 },
  { color: "#06b6d4", x: "88%", y: "4%", size: 160, delay: 0.6 },
  { color: "#a855f7", x: "40%", y: "12%", size: 100, delay: 1.5 },
];

const SPARKLE_COLORS = [
  "#f97316",
  "#eab308",
  "#ef4444",
  "#22c55e",
  "#06b6d4",
  "#a855f7",
];
const SPARKLE_DOTS = [
  {
    id: "s1",
    left: "8%",
    top: "6%",
    size: 8,
    colorIdx: 0,
    delay: 0,
    duration: 2.5,
  },
  {
    id: "s2",
    left: "15.5%",
    top: "11%",
    size: 5,
    colorIdx: 1,
    delay: 0.2,
    duration: 2.8,
  },
  {
    id: "s3",
    left: "23%",
    top: "16%",
    size: 3,
    colorIdx: 2,
    delay: 0.4,
    duration: 3.1,
  },
  {
    id: "s4",
    left: "30.5%",
    top: "6%",
    size: 8,
    colorIdx: 3,
    delay: 0.6,
    duration: 3.4,
  },
  {
    id: "s5",
    left: "38%",
    top: "11%",
    size: 5,
    colorIdx: 4,
    delay: 0.8,
    duration: 3.7,
  },
  {
    id: "s6",
    left: "45.5%",
    top: "16%",
    size: 3,
    colorIdx: 5,
    delay: 1.0,
    duration: 4.0,
  },
  {
    id: "s7",
    left: "53%",
    top: "6%",
    size: 8,
    colorIdx: 0,
    delay: 1.2,
    duration: 4.3,
  },
  {
    id: "s8",
    left: "60.5%",
    top: "11%",
    size: 5,
    colorIdx: 1,
    delay: 1.4,
    duration: 4.6,
  },
  {
    id: "s9",
    left: "68%",
    top: "16%",
    size: 3,
    colorIdx: 2,
    delay: 1.6,
    duration: 4.9,
  },
  {
    id: "s10",
    left: "75.5%",
    top: "6%",
    size: 8,
    colorIdx: 3,
    delay: 1.8,
    duration: 5.2,
  },
  {
    id: "s11",
    left: "83%",
    top: "11%",
    size: 5,
    colorIdx: 4,
    delay: 2.0,
    duration: 5.5,
  },
  {
    id: "s12",
    left: "90.5%",
    top: "16%",
    size: 3,
    colorIdx: 5,
    delay: 2.2,
    duration: 5.8,
  },
];

export function HeroSection() {
  const { setActivePage } = useNavigation();

  return (
    <>
      <section
        id="home"
        data-ocid="hero.section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* THICK rainbow band at very top */}
        <div
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
          style={{ height: "8px" }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, #f97316 0%, #eab308 16%, #ef4444 32%, #22c55e 50%, #06b6d4 68%, #a855f7 84%, #f97316 100%)",
            }}
          />
        </div>

        {/* Second decorative colorful band below navbar */}
        <motion.div
          className="absolute left-0 right-0 z-10 pointer-events-none"
          style={{ top: "72px", height: "4px" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, #a855f7 0%, #06b6d4 25%, #22c55e 50%, #ef4444 75%, #f97316 100%)",
            }}
          />
        </motion.div>

        {/* Background image + overlays */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x600.jpg"
            alt="Ècoelen premium food powders"
            className="w-full h-full object-cover"
          />
          {/* Dark base overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/50" />
          {/* Colorful upper gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(249,115,22,0.35) 0%, rgba(234,179,8,0.2) 15%, rgba(239,68,68,0.15) 30%, transparent 55%)",
            }}
          />
          {/* Bottom dark for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 hero-color-cycle opacity-15" />
        </div>

        {/* Colorful glowing orbs in upper area */}
        {COLOR_ORBS.map((orb) => (
          <motion.div
            key={`orb-${orb.color}`}
            className="absolute pointer-events-none hidden md:block"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}55 0%, ${orb.color}22 50%, transparent 70%)`,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4 + orb.delay,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating spice emojis */}
        {FLOATING_ITEMS.map((item) => (
          <motion.span
            key={item.emoji}
            className={`absolute ${item.size} pointer-events-none z-10 hidden md:block`}
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -18, 0],
              rotate: [0, 8, -8, 0],
              opacity: [0.55, 0.85, 0.55],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: item.duration,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.span>
        ))}

        {/* Upper colorful sparkle dots */}
        {SPARKLE_DOTS.map((dot) => {
          const color = SPARKLE_COLORS[dot.colorIdx];
          return (
            <motion.div
              key={dot.id}
              className="absolute pointer-events-none hidden md:block rounded-full z-10"
              style={{
                left: dot.left,
                top: dot.top,
                width: dot.size,
                height: dot.size,
                background: color,
                boxShadow: `0 0 8px 2px ${color}88`,
              }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.4, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: dot.duration,
                delay: dot.delay,
                ease: "easeInOut",
              }}
            />
          );
        })}

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="inline-block text-amber-300 font-body text-sm tracking-[0.3em] uppercase mb-4 font-medium drop-shadow">
              Kapiraj Foods presents
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-4"
          >
            <span className="relative inline-block">
              <span className="absolute -inset-6 blur-3xl hero-glow-aura rounded-full opacity-40 pointer-events-none" />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #fde68a 0%, #fb923c 40%, #f87171 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Pure.
              </span>
            </span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #6ee7b7 0%, #34d399 30%, #22c55e 60%, #86efac 100%)",
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
                  "linear-gradient(135deg, #93c5fd 0%, #60a5fa 30%, #06b6d4 65%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Powerful.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="font-body text-white text-lg md:text-xl max-w-xl mx-auto mt-6 mb-10 leading-relaxed drop-shadow-lg"
          >
            Discover Ècoelen’s range of premium food powders crafted from the
            finest farms, free from additives, and full of nature’s goodness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              onClick={() => setActivePage("products")}
              className="hero-cta-btn font-bold px-10 py-6 text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 text-white"
            >
              Explore Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero.secondary_button"
              onClick={() => setActivePage("about")}
              className="border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-medium px-8 py-6 text-base transition-all duration-300"
            >
              Our Story
            </Button>
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
          <ChevronDown className="text-white/60" size={28} />
        </motion.div>
      </section>

      {/* Colorful gradient section divider below hero */}
      <div
        className="h-2 w-full"
        style={{
          background:
            "linear-gradient(90deg, #f97316 0%, #eab308 20%, #ef4444 40%, #22c55e 60%, #06b6d4 80%, #a855f7 100%)",
        }}
      />
    </>
  );
}

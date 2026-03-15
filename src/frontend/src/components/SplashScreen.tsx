import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem("ecoelen_splash_shown");
  });

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("ecoelen_splash_shown", "1");
    }, 2400);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
        >
          {/* Background radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.12) 0%, rgba(168,85,247,0.08) 50%, transparent 100%)",
            }}
          />

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col items-center gap-5 relative"
          >
            {/* Logo with animated ring — uses framer-motion rotate for reliability */}
            <div className="relative">
              {/* Outer glow (decorative only, behind everything) */}
              <div
                className="absolute -inset-6 rounded-full opacity-30 blur-xl pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, #f97316, #eab308, #ef4444, #22c55e, #06b6d4, #a855f7, #f97316)",
                }}
              />
              {/* Spinning rainbow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #f97316, #eab308, #ef4444, #22c55e, #06b6d4, #a855f7, #f97316)",
                  borderRadius: "9999px",
                }}
              />
              {/* Logo container */}
              <div
                className="relative rounded-full p-[3px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, #f97316, #eab308, #ef4444, #22c55e, #06b6d4, #a855f7, #f97316)",
                  zIndex: 1,
                }}
              >
                <div className="rounded-full bg-[#0a0a0a] p-3">
                  <img
                    src="/assets/generated/ecoelen-logo-transparent.dim_200x200.png"
                    alt="Ècoelen"
                    className="h-24 w-24 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Brand name — NO filter property to prevent gradient-text glitch */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="font-display font-extrabold text-5xl tracking-tight gradient-text"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ef4444 30%, #eab308 60%, #22c55e 100%)",
                }}
              >
                Ècoelen
              </span>
              <span className="text-sm font-body tracking-widest uppercase text-amber-200/60 font-medium">
                by Kapiraj Foods
              </span>
            </motion.div>

            {/* Pulsing tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.5, 0.7] }}
              transition={{
                delay: 0.8,
                duration: 1.2,
                times: [0, 0.3, 0.6, 1],
              }}
              className="text-xs text-amber-100/40 tracking-[0.3em] uppercase"
            >
              Pure · Natural · Authentic
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

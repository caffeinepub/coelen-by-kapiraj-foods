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
            {/* New rectangular logo — no circular ring wrappers */}
            <img
              src="/assets/generated/ecoelen-logo-transparent.dim_600x300.png"
              alt="Ècoelen"
              className="h-32 w-auto object-contain"
            />

            {/* Brand tagline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center gap-1"
            >
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

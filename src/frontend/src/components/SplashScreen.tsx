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
    }, 2600);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "oklch(0.18 0.08 155)" }}
        >
          {/* Radial forest glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(15,76,53,0.7) 0%, rgba(232,112,10,0.12) 55%, transparent 100%)",
            }}
          />

          {/* Floating particles */}
          {[
            { x: "15%", y: "20%", size: 6, dur: 4, delay: 0 },
            { x: "80%", y: "25%", size: 10, dur: 5.5, delay: 0.5 },
            { x: "70%", y: "72%", size: 7, dur: 4.8, delay: 1.1 },
            { x: "25%", y: "75%", size: 5, dur: 6, delay: 0.3 },
            { x: "88%", y: "50%", size: 8, dur: 5, delay: 0.8 },
            { x: "10%", y: "55%", size: 5, dur: 4.5, delay: 1.4 },
          ].map((p, i) => (
            <motion.div
              // biome-ignore lint/suspicious/noArrayIndexKey: static splash particles
              key={i}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                background:
                  i % 2 === 0 ? "oklch(0.62 0.19 50)" : "oklch(0.83 0.17 85)",
                boxShadow:
                  i % 2 === 0
                    ? "0 0 12px 3px rgba(232,112,10,0.6)"
                    : "0 0 12px 3px rgba(245,200,66,0.5)",
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: p.dur,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.55, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col items-center gap-6 relative"
          >
            {/* Glowing ring */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(232,112,10,0.45) 0%, rgba(245,200,66,0.2) 60%, transparent 100%)",
                  transform: "scale(1.8)",
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              />
              <img
                src="/assets/uploads/1000284461-removebg-preview-1.png"
                alt="Ècoelen"
                className="relative h-36 w-auto object-contain drop-shadow-2xl"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <p
                className="text-xs tracking-[0.4em] uppercase font-body"
                style={{ color: "oklch(0.83 0.17 85)" }}
              >
                Pure · Natural · Authentic
              </p>
              {/* Loading bar */}
              <div
                className="w-32 h-0.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.62 0.19 50), oklch(0.83 0.17 85))",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

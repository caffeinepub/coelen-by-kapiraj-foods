const ITEMS = [
  { emoji: "🌿", text: "100% Natural" },
  { emoji: "🌾", text: "Farm Fresh" },
  { emoji: "✅", text: "Zero Additives" },
  { emoji: "🏅", text: "FSSAI Certified" },
  { emoji: "⭐", text: "Premium Quality" },
  { emoji: "🇮🇳", text: "Authentically Indian" },
  { emoji: "❄️", text: "Cold-Ground" },
  { emoji: "🫙", text: "Small-Batch Crafted" },
];

export function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden py-4 select-none"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.20 0.08 155) 0%, oklch(0.28 0.12 155) 50%, oklch(0.20 0.08 155) 100%)",
      }}
    >
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static marquee
            key={i}
            className="inline-flex items-center gap-2.5 px-6 text-sm font-semibold tracking-widest uppercase font-body whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <span className="text-base">{item.emoji}</span>
            {item.text}
            <span style={{ color: "oklch(0.83 0.17 85)", marginLeft: "4px" }}>
              ✦
            </span>
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, oklch(0.20 0.08 155), transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, oklch(0.20 0.08 155), transparent)",
        }}
      />
    </div>
  );
}

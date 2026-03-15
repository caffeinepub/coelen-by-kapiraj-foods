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
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 py-3.5 select-none">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 43.2s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static marquee
            key={i}
            className="inline-flex items-center gap-2 px-5 text-sm font-semibold tracking-widest uppercase text-white font-body whitespace-nowrap"
          >
            <span className="text-base">{item.emoji}</span>
            {item.text}
            <span className="opacity-50 ml-2">✦</span>
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-amber-500 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-amber-500 to-transparent z-10 pointer-events-none" />
    </div>
  );
}

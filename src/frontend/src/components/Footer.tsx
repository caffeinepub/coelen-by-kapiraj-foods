import { Leaf, Settings } from "lucide-react";
import { type Page, useNavigation } from "../context/NavigationContext";

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Products", page: "products" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

interface Props {
  onAdminClick?: () => void;
}

export function Footer({ onAdminClick }: Props) {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  const { setActivePage } = useNavigation();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Footer logo — solid ring so it's always visible on dark background */}
              <div
                className="rounded-full p-[3px] shrink-0"
                style={{
                  background:
                    "conic-gradient(from 0deg, #f97316, #eab308, #ef4444, #22c55e, #06b6d4, #a855f7, #f97316)",
                }}
              >
                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center">
                  <img
                    src="/assets/generated/ecoelen-logo-transparent.dim_200x200.png"
                    alt="Ècoelen"
                    className="h-11 w-11 object-contain"
                  />
                </div>
              </div>
              <div>
                {/* Plain white text — no gradient-text needed in dark footer */}
                <p className="font-display font-bold text-xl leading-none text-white">
                  Ècoelen
                </p>
                <p className="text-[10px] tracking-widest uppercase text-white/50">
                  by Kapiraj Foods
                </p>
                <p className="text-[10px] tracking-widest uppercase text-white/40 mt-0.5">
                  Est. 2026
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Pure, natural, and powerful food powders sourced from the finest
              farms across India.
            </p>
          </div>

          <div>
            <p className="font-body font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.page}.link`}
                    onClick={() => setActivePage(link.page)}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Our Promise
            </p>
            <div className="space-y-2">
              {[
                "100% Natural",
                "No Additives",
                "Farm Fresh",
                "Premium Quality",
              ].map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <Leaf size={14} className="text-accent shrink-0" />
                  <span className="font-body text-sm text-white/60">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {year} Ècoelen by Kapiraj Foods. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {onAdminClick && (
              <button
                type="button"
                data-ocid="footer.admin.button"
                onClick={onAdminClick}
                className="font-body text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1"
              >
                <Settings size={12} />
                Admin
              </button>
            )}
            <p className="font-body text-xs text-white/40">
              Built with ❤️ using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 underline underline-offset-2 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

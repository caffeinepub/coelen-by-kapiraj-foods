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
              {/* Footer logo: white background so it stands out on dark footer */}
              <div
                className="bg-white rounded-2xl px-4 py-3 shadow-xl"
                style={{ display: "inline-block" }}
              >
                <img
                  src="/assets/generated/ecoelen-logo-transparent.dim_600x300.png"
                  alt="Ècoelen"
                  className="h-20 w-auto object-contain block"
                />
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Pure, natural, and powerful food powders sourced from the finest
              farms across India.
            </p>
            <p className="text-[10px] tracking-widest uppercase text-white/40 mt-2">
              by Kapiraj Foods · Est. 2026
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.page}.link`}
                    onClick={() => setActivePage(link.page)}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
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
                  <span className="text-sm text-white/60">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {year} Ècoelen by Kapiraj Foods. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {onAdminClick && (
              <button
                type="button"
                data-ocid="footer.admin.button"
                onClick={onAdminClick}
                className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1"
              >
                <Settings size={12} />
                Admin
              </button>
            )}
            <p className="text-xs text-white/40">
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

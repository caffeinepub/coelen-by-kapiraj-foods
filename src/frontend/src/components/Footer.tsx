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
    <footer
      style={{
        background:
          "linear-gradient(160deg, oklch(0.16 0.07 155) 0%, oklch(0.22 0.10 155) 100%)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.30 0.10 155) 0%, oklch(0.62 0.19 50) 40%, oklch(0.83 0.17 85) 60%, oklch(0.62 0.19 50) 80%, oklch(0.30 0.10 155) 100%)",
        }}
      />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/uploads/1000284461-removebg-preview-1.png"
                alt="Ècoelen"
                className="h-20 w-auto object-contain block"
              />
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs font-body"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Pure, natural, and wholesome food powders sourced from the finest
              farms across India.
            </p>
            <p
              className="text-[10px] tracking-widest uppercase mt-3 font-body"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              by Kapiraj Foods · Est. by 2026
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="font-semibold text-xs uppercase tracking-wider mb-5 font-body"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Navigation
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.page}.link`}
                    onClick={() => setActivePage(link.page)}
                    className="text-sm font-body transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "oklch(0.83 0.17 85)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Promise */}
          <div>
            <p
              className="font-semibold text-xs uppercase tracking-wider mb-5 font-body"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Our Promise
            </p>
            <div className="space-y-2.5">
              {[
                "100% Natural",
                "No Additives",
                "Farm Fresh",
                "Premium Quality",
              ].map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <Leaf
                    size={13}
                    style={{ color: "oklch(0.83 0.17 85)", flexShrink: 0 }}
                  />
                  <span
                    className="text-sm font-body"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="text-xs font-body"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            © {year} Ècoelen by Kapiraj Foods. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {onAdminClick && (
              <button
                type="button"
                data-ocid="footer.admin.button"
                onClick={onAdminClick}
                className="text-xs font-body flex items-center gap-1 transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.25)";
                }}
              >
                <Settings size={12} />
                Admin
              </button>
            )}
            <p
              className="text-xs font-body"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Built with ❤️ using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "rgba(255,255,255,0.3)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "oklch(0.83 0.17 85)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                }}
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

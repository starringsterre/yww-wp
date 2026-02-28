import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, Linkedin, ChevronDown } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import VraagbaakWidget from "@/components/VraagbaakWidget";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";

type NavChild = {
  href: string;
  label: string;
};

type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

const mainNavItems: NavItem[] = [
  {
    href: "/groepstrainingen",
    label: "Persoonlijke ontwikkeling",
    children: [
      { href: "/persoonlijke-ontwikkeling-weekend-training", label: "Weekend trainingen" },
      { href: "/groepstrainingen/ontwikkeling-workshops", label: "Dag workshops" },
    ],
  },
  {
    href: "/in-company",
    label: "Bedrijfstrajecten",
    children: [
      { href: "/in-company/jaarprogrammas", label: "Jaarprogramma's" },
      { href: "/in-company/losse-workshops", label: "Losse Workshops" },
    ],
  },
  {
    href: "/inspiratie",
    label: "Inspiratie",
    children: [
      { href: "/inspiratie/evenementen", label: "Evenementen" },
      { href: "/inspiratie/blogs", label: "Tools & Handvatten" },
      { href: "/inspiratie/podcasts", label: "Podcasts" },
    ],
  },
  { href: "/ons-verhaal", label: "Ons Verhaal" },
];

const footerLinks: NavChild[] = [
  { href: "/", label: "Home" },
  { href: "/groepstrainingen", label: "Persoonlijke ontwikkeling" },
  { href: "/in-company", label: "Bedrijfstrajecten" },
  { href: "/inspiratie", label: "Inspiratie" },
  { href: "/ons-verhaal", label: "Ons Verhaal" },
  { href: "/lid-worden", label: "Netwerk" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasCookieConsent, setHasCookieConsent] = useState(false);
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isDesktop = useIsDesktop();
  const { data: settings } = useGlobalSettings();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");

    if (hash) {
      const scrollToHashTarget = () => {
        const target = document.getElementById(decodeURIComponent(hash));
        if (!target) {
          return false;
        }

        const headerOffset = 96;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
        return true;
      };

      if (!scrollToHashTarget()) {
        const timeoutId = window.setTimeout(scrollToHashTarget, 120);
        return () => window.clearTimeout(timeoutId);
      }

      return;
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const cookieKey = "yww_cookie_consent_v1";

    const syncConsentState = () => {
      try {
        setHasCookieConsent(Boolean(window.localStorage.getItem(cookieKey)));
      } catch (_error) {
        // Some browser modes can block storage access; keep app usable.
        setHasCookieConsent(false);
      }
    };

    syncConsentState();
    window.addEventListener("storage", syncConsentState);
    window.addEventListener("yww:cookie-consent-updated", syncConsentState);

    return () => {
      window.removeEventListener("storage", syncConsentState);
      window.removeEventListener("yww:cookie-consent-updated", syncConsentState);
    };
  }, []);

  const isPathActive = (path: string) => {
    const normalizedPath = path.split("#")[0];
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === normalizedPath || location.pathname.startsWith(`${normalizedPath}/`);
  };

  const isItemActive = (item: NavItem) => {
    if (isPathActive(item.href)) {
      return true;
    }
    return item.children?.some((child) => isPathActive(child.href)) ?? false;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {isDesktop && <CustomCursor />}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: location.pathname === "/" && !hasScrolled ? "transparent" : "#FBF9F5",
          borderBottom: hasScrolled || location.pathname !== "/" ? "1px solid rgba(28, 40, 38, 0.1)" : "none",
        }}
      >
        <div className="max-w-full px-8">
          <div className="flex justify-between items-center h-20">
            {(location.pathname !== "/" || hasScrolled) && (
              <Link to="/" className="flex-shrink-0">
                <img loading="lazy"
                  src="/Logo-Young-Wise-Women.png"
                  alt="Young Wise Women"
                  className="h-20 w-auto"
                />
              </Link>
            )}

            <nav className="hidden md:flex items-center gap-10 flex-1 justify-center">
              {mainNavItems.map((item) => {
                if (location.pathname === "/" && !hasScrolled) {
                  return null;
                }

                const activeClass = isItemActive(item)
                  ? "text-primary"
                  : "text-gray-700 hover:text-[#B46555]";

                const topLevelLinkClass =
                  "relative text-sm font-medium transition-colors duration-300 inline-flex h-10 items-center origin-left after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#B46555] after:transition-transform after:duration-300 hover:after:scale-x-100";

                if (!item.children?.length) {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`${topLevelLinkClass} ${activeClass}`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.href} className="relative group flex items-center h-10">
                    <Link
                      to={item.href}
                      className={`${topLevelLinkClass} gap-1 ${activeClass}`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </Link>
                    <div className="pointer-events-none absolute left-0 top-full z-50 min-w-[14rem] pt-3 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto">
                      <div className="rounded-lg border border-gray-200 shadow-lg p-2" style={{ backgroundColor: "#FBF9F5" }}>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                              isPathActive(child.href)
                                ? "text-primary bg-gray-50"
                                : "text-gray-700 hover:text-[#B46555] hover:bg-gray-50"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-4 ml-auto">
              <Link
                to="/lid-worden"
                className="hidden md:inline-block px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: location.pathname === "/" && !hasScrolled ? "transparent" : "#6B705C",
                  color: "white",
                  border: location.pathname === "/" && !hasScrolled ? "1px solid white" : "none",
                  transitionProperty: "all",
                  transitionDuration: "300ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#B46555";
                  e.currentTarget.style.border = "none";
                }}
                onMouseLeave={(e) => {
                  if (location.pathname === "/" && !hasScrolled) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.border = "1px solid white";
                  } else {
                    e.currentTarget.style.backgroundColor = "#6B705C";
                    e.currentTarget.style.border = "none";
                  }
                }}
              >
                Join Netwerk
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              style={{ color: location.pathname === "/" && !hasScrolled ? "white" : "black" }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav
              className="md:hidden pb-4 flex flex-col gap-2 border-t pt-4"
              style={{ borderColor: "rgba(28, 40, 38, 0.1)" }}
            >
              {mainNavItems.map((item) => {
                if (location.pathname === "/" && !hasScrolled) {
                  return null;
                }

                return (
                  <div key={item.href} className="flex flex-col">
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm font-medium py-2 transition-colors ${
                        isItemActive(item) ? "text-primary" : "text-gray-700 hover:text-[#B46555]"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm py-1 pl-4 transition-colors ${
                          isPathActive(child.href)
                            ? "text-primary"
                            : "text-gray-600 hover:text-[#B46555]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              })}

              <Link
                to="/lid-worden"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 rounded-lg font-medium text-sm text-white bg-primary mt-3 transition-all duration-300 hover:scale-105 hover:bg-accent"
              >
                Join Netwerk
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow" style={{ paddingTop: location.pathname === "/" ? "0" : "80px" }}>
        {children}
      </main>

      <footer className="text-gray-700" style={{ backgroundColor: "#FBF9F5" }}>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-gray-900 font-medium mb-4">Young Wise Women</h3>
              <p className="text-sm text-gray-600">
                {settings?.footer.about_text || "Het netwerk waar jonge vrouwen reflectie, rust en ruimte ervaren en op zoek zijn naar persoonlijke groei en betekenis. Trainingen, Workshops en Bedrijfstrajecten op maat."}
              </p>
            </div>

            <div className="flex items-center">
              <img loading="lazy"
                src="/Logo-Young-Wise-Women.png"
                alt="Young Wise Women"
                className="h-40 w-auto"
              />
            </div>

            <div>
              <h4 className="text-gray-900 font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-foreground hover:text-gray-700 transition-all duration-300 hover:scale-110 inline-block origin-left"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-medium mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>{settings?.contact.email || "info@youngwisewomen.nl"}</p>
                <p>{settings?.contact.phone || "+31 (0)6 55334728"}</p>
              </div>
              <div className="flex gap-4">
                <a
                  href={settings?.social.instagram || "http://instagram.com/youngwisewomen"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#6B705C" }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={settings?.social.linkedin || "#"}
                  target={settings?.social.linkedin ? "_blank" : undefined}
                  rel={settings?.social.linkedin ? "noopener noreferrer" : undefined}
                  className="transition-colors"
                  style={{ color: "#6B705C" }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-500 pt-8">
            <p className="text-sm text-gray-600 text-center">
              © {currentYear} Young Wise Women. Alle rechten voorbehouden. By{" "}
              <a
                href="https://www.sterremolendijk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors"
              >
                <i>Starring</i>
              </a>
              .
            </p>
          </div>
        </div>
      </footer>

      {!hasCookieConsent && (
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("yww:open-cookie-settings"))}
          className="fixed bottom-4 left-4 z-[65] rounded-lg border border-[#1C2826]/20 bg-[#FBF9F5] px-4 py-2 text-sm font-medium text-[#1C2826] shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#B46555] hover:text-[#B46555]"
        >
          Beheer cookies
        </button>
      )}

      <CookieConsentBanner />
      <VraagbaakWidget />
    </div>
  );
}

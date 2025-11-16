import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, Linkedin } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/verhaal", label: "Retreats" },
    { href: "/kalender", label: "Kalender" },
    { href: "/contact", label: "Ons Verhaal" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: location.pathname === "/" && !hasScrolled
            ? "transparent"
            : "rgb(251, 249, 245)",
          borderBottom: hasScrolled || location.pathname !== "/" ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="max-w-full px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Only show on non-home pages or when scrolled */}
            {(location.pathname !== "/" || hasScrolled) && (
              <Link to="/" className="flex-shrink-0">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7d902ac805d74bcca6b1cd2c0ed07af5?format=webp&width=800"
                  alt="Young Wise Women"
                  className="h-10 w-auto"
                />
              </Link>
            )}

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex gap-12 flex-1 justify-center">
              {navLinks.map((link) => {
                // Hide "Home" link always, and hide all other links on splash screen
                if (link.href === "/") {
                  return null;
                }
                if (location.pathname === "/" && !hasScrolled) {
                  return null;
                }
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section - Button */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Lid worden Button */}
              <Link
                to="/lid-worden"
                className="hidden md:inline-block px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                style={{
                  backgroundColor: location.pathname === "/" && !hasScrolled ? "transparent" : "#98a481",
                  color: "white",
                  border: location.pathname === "/" && !hasScrolled ? "1px solid white" : "none",
                }}
              >
                Lid worden
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              style={{
                color: location.pathname === "/" && !hasScrolled ? "white" : "black",
              }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-3 border-t pt-4" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
              {navLinks.map((link) => {
                // Hide "Home" link always, and hide all other links on splash screen
                if (link.href === "/") {
                  return null;
                }
                if (location.pathname === "/" && !hasScrolled) {
                  return null;
                }
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium py-2 transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/lid-worden"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 rounded-lg font-medium transition-colors text-sm text-white mt-2"
                style={{ backgroundColor: "#98a481" }}
              >
                Lid worden
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow" style={{ paddingTop: location.pathname === "/" ? "0" : "80px" }}>{children}</main>

      {/* Footer */}
      <footer
        className="text-gray-700"
        style={{ backgroundColor: "rgb(229, 219, 206)" }}
      >
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div>
              <h3 className="text-gray-900 font-medium mb-4">Young Wise Women</h3>
              <p className="text-sm text-gray-600">
                Reflectie, rust en ruimte voor jonge vrouwen die op zoek zijn
                naar persoonlijke groei en betekenis.
              </p>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F264b1b44affb4c70ba84c30b9a51f9df%2F7d902ac805d74bcca6b1cd2c0ed07af5?format=webp&width=800"
                alt="Young Wise Women"
                className="h-40 w-auto"
              />
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-gray-900 font-medium mb-4">Navigatie</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-black hover:text-gray-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-gray-900 font-medium mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>info@youngwisewomen.nl</p>
                <p>+31 (0)6 55334728</p>
              </div>
              <div className="flex gap-4">
                <a
                  href="http://instagram.com/youngwisewomen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#98a481" }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: "#98a481" }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-500 pt-8">
            <p className="text-sm text-gray-600 text-center">
              © 2025 Young Wise Women. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

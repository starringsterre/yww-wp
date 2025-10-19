import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/verhaal", label: "Ons verhaal" },
    { href: "/kalender", label: "Community kalender" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-neutral-900">
                Young Wise Women
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
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
            <nav className="md:hidden pb-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="font-bold text-neutral-900 mb-4">
                Young Wise Women
              </h3>
              <p className="text-sm text-neutral-600">
                Weekend retreats voor jonge vrouwen op zoek naar persoonlijke
                groei, reflectie en betekenisvolle verbinding.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Navigatie</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-neutral-600">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@awarenessinbusiness.com"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    info@awarenessinbusiness.com
                  </a>
                </p>
                <p>
                  Telefoon:{" "}
                  <a
                    href="tel:+31655334728"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    +31 (0)6 55334728
                  </a>
                </p>
                <p>Blaricum, Nederland</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-neutral-200 pt-8">
            <p className="text-sm text-neutral-600 text-center">
              © {new Date().getFullYear()} Young Wise Women. Alle rechten
              voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

/**
 * Reusable Navbar Component
 * @param {string} title - Brand or logo name
 * @param {Array} navLinks - Array of nav items: { name, path }
 */
export default function Navbar({ title = "My App", navLinks = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link
          to="/"
          className="text-xl font-semibold text-emerald-700 tracking-wider"
        >
          {title}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`hover:text-emerald-600 transition ${
                  location.pathname === link.path
                    ? "text-emerald-700 font-semibold"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-emerald-700"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <ul className="md:hidden bg-white shadow-inner px-6 pb-4 space-y-3 text-sm text-gray-700">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={closeMenu}
                className="block py-1 hover:text-emerald-600"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

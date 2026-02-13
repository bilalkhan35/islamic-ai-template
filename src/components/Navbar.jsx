import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaMosque } from "react-icons/fa";

/**
 * Premium Navbar with glassmorphism and smooth mobile menu
 */
export default function Navbar({ title = "My App", navLinks = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-white" style={{
      borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.06)',
    }}>
      <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-3.5">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #059669, #047857)',
            borderRadius: '0.75rem',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
            transition: 'transform 0.3s ease',
          }}>
            <FaMosque className="text-white" size={18} />
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.25rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #047857, #064e3b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>
            {title}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.625rem',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#047857' : '#4b5563',
                    background: isActive ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.color = '#059669';
                      e.target.style.background = 'rgba(16, 185, 129, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.color = '#4b5563';
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '3px',
                      borderRadius: '2px',
                      background: 'linear-gradient(90deg, #10b981, #059669)',
                    }} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center"
          style={{
            background: isMenuOpen ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
            border: 'none',
            borderRadius: '0.625rem',
            padding: '0.625rem',
            color: isMenuOpen ? '#ef4444' : '#059669',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className="md:hidden animate-slide-down"
          style={{
            padding: '0.5rem 1.25rem 1.25rem',
            borderTop: '1px solid rgba(16, 185, 129, 0.08)',
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.625rem',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#047857' : '#374151',
                      background: isActive ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

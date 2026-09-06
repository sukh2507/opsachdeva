import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import { SITE_CONFIG, CATEGORIES } from '../data/siteConfig';

/**
 * Navbar
 * -------
 * Fixed nav bar. "Home" and each CATEGORIES entry are real routes
 * (react-router Link). "Contact" is a section on the Home page, so it
 * navigates to "/" and then scrolls to #contact once there.
 *
 * To add a nav link for a new top-level page, add it to NAV_ITEMS below
 * (or, for a new Bhawans/Jhankies/Singers-style category, just add it to
 * CATEGORIES in data/siteConfig.js and it shows up automatically).
 */
const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  ...CATEGORIES.map((c) => ({ path: c.path, label: c.name })),
  { path: '/#contact', label: 'Contact', isAnchor: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Whenever we land on "/" with a #contact hash, scroll to it.
  useEffect(() => {
    if (location.pathname === '/' && location.hash === '#contact') {
      const el = document.getElementById('contact');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  }, [location]);

  const handleNavClick = (item, e) => {
    setIsMobileMenuOpen(false);
    if (item.isAnchor) {
      e.preventDefault();
      if (location.pathname === '/') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/#contact');
      }
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('#')[0]) && path !== '/#contact';
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 navbar-glass ${
        isScrolled ? 'navbar-glass-scrolled py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <AnimatedLogo className="w-8 h-8" />
          <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-maroon-800">
            {SITE_CONFIG.brandName}
          </span>
        </Link>

        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavClick(item, e)}
              className={`text-[13.8px] tracking-widest uppercase transition-colors ${
                isActive(item.path) ? 'text-maroon-700 font-bold' : 'text-slate-600 hover:text-maroon-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full navbar-mobile-menu py-8 flex flex-col items-center gap-6 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavClick(item, e)}
              className="text-lg font-serif text-maroon-700 hover:text-maroon-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
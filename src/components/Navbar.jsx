import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import { SITE_CONFIG, CATEGORIES } from '../data/siteConfig';

const BHAWAN_OPTIONS = [
  {
    label: "Matarani Ji's Chowki-Jagran",
    path: '/bhawans?category=matarani',
  },
  {
    label: 'Shri Krishna Bhajan Sandhya',
    path: '/bhawans/krishna-bhajan-sandhya',
  },
  {
    label: "Shri Khatu Shyam Ji's Sankirtan",
    path: '/bhawans/khatu-shyam',
  },
  {
    label: 'Shri Sunderkand Path',
    path: '/bhawans/sunderkand',
  },
];

const OTHER_CATEGORIES = CATEGORIES.filter(
  (category) => !category.path.startsWith('/bhawans')
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBhawanOpen, setIsBhawanOpen] = useState(false);
  const [isMobileBhawanOpen, setIsMobileBhawanOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBhawanOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    setIsBhawanOpen(false);
    setIsMobileBhawanOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (location.pathname === '/' && location.hash === '#contact') {
      const el = document.getElementById('contact');
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          50
        );
      }
    }
  }, [location]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileBhawanOpen(false);
  };

  const handleContactClick = (event) => {
    event.preventDefault();
    closeMobileMenu();

    if (location.pathname === '/') {
      document
        .getElementById('contact')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#contact');
    }
  };

  const normalLinkClass = (path) =>
    `text-[13.8px] font-serif tracking-widest uppercase transition-colors ${
      location.pathname.startsWith(path)
        ? 'text-maroon-700 font-bold'
        : 'text-slate-600 hover:text-maroon-700'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 navbar-glass ${
        isScrolled ? 'navbar-glass-scrolled py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          onClick={closeMobileMenu}
        >
          <AnimatedLogo className="w-8 h-8" />

          <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-maroon-800">
            {SITE_CONFIG.brandName}
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-[13.8px] font-serif tracking-widest uppercase transition-colors ${
              location.pathname === '/'
                ? 'text-maroon-700 font-bold'
                : 'text-slate-600 hover:text-maroon-700'
            }`}
          >
            Home
          </Link>

          {/* Bhawan dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsBhawanOpen((open) => !open)}
              className={`flex items-center gap-1.5 text-[13.8px] font-serif tracking-widest uppercase transition-colors ${
                location.pathname.startsWith('/bhawans')
                  ? 'text-maroon-700 font-bold'
                  : 'text-slate-600 hover:text-maroon-700'
              }`}
              aria-expanded={isBhawanOpen}
            >
              Bhawans
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isBhawanOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isBhawanOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 w-[330px]">
                <div className="overflow-hidden rounded-2xl border border-maroon-700/10 bg-[#fdfaf4] shadow-2xl">
                  <div className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-[0.2em] font-bold text-maroon-700/70">
                    Choose Bhawan
                  </div>

                  {BHAWAN_OPTIONS.map((option) => (
                    <Link
                      key={option.path}
                      to={option.path}
                      onClick={() => setIsBhawanOpen(false)}
                      className="block px-5 py-3.5 font-serif text-sm text-slate-700 border-t border-maroon-700/5 hover:bg-maroon-700 hover:text-white transition-colors"
                    >
                      {option.label}
                    </Link>
                  ))}

                  <Link
                    to="/bhawans"
                    onClick={() => setIsBhawanOpen(false)}
                    className="block px-5 py-3 text-center text-[11px] uppercase tracking-widest font-bold text-maroon-700 bg-[#f7efe3] hover:bg-[#efe1cc] transition-colors"
                  >
                    View All Bhawans
                  </Link>
                </div>
              </div>
            )}
          </div>

          {OTHER_CATEGORIES.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={normalLinkClass(category.path)}
            >
              {category.name}
            </Link>
          ))}

          <a
            href="/#contact"
            onClick={handleContactClick}
            className="text-[13.8px] font-serif tracking-widest uppercase text-slate-600 hover:text-maroon-700 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-slate-800 p-1"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ================= MOBILE NAV ================= */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full max-h-[calc(100vh-72px)] overflow-y-auto bg-[#fdfaf4] border-t border-gold-500/20 shadow-xl md:hidden">
          <div className="px-5 py-5 flex flex-col">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="py-3.5 text-lg font-serif text-slate-700 border-b border-maroon-700/8"
            >
              Home
            </Link>

            <div className="border-b border-maroon-700/8">
              <button
                type="button"
                onClick={() => setIsMobileBhawanOpen((open) => !open)}
                className="w-full py-3.5 flex items-center justify-between text-lg font-serif text-slate-700"
                aria-expanded={isMobileBhawanOpen}
              >
                <span>Bhawans</span>
                <ChevronDown
                  className={`w-5 h-5 text-maroon-700 transition-transform duration-300 ${
                    isMobileBhawanOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isMobileBhawanOpen
                    ? 'grid-rows-[1fr]'
                    : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-3 pl-3">
                    {BHAWAN_OPTIONS.map((option) => (
                      <Link
                        key={option.path}
                        to={option.path}
                        onClick={closeMobileMenu}
                        className="block py-3 px-4 text-[15px] font-serif text-slate-600 border-l-2 border-maroon-700/15 hover:border-maroon-700 hover:text-maroon-700"
                      >
                        {option.label}
                      </Link>
                    ))}

                    <Link
                      to="/bhawans"
                      onClick={closeMobileMenu}
                      className="block py-3 px-4 text-xs uppercase tracking-widest font-bold text-maroon-700 border-l-2 border-maroon-700/15"
                    >
                      View All Bhawans
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {OTHER_CATEGORIES.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                onClick={closeMobileMenu}
                className="py-3.5 text-lg font-serif text-slate-700 border-b border-maroon-700/8"
              >
                {category.name}
              </Link>
            ))}

            <a
              href="/#contact"
              onClick={handleContactClick}
              className="py-3.5 text-lg font-serif text-slate-700"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

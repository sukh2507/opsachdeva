import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * Footer
 * Social icons are only rendered for platforms that have a URL set in
 * SITE_CONFIG.social - leave a field blank there to hide that icon.
 */
const SOCIAL_LINKS = [
  { id: 'instagram', icon: Instagram, url: SITE_CONFIG.social.instagram, label: 'Instagram' },
  { id: 'facebook', icon: Facebook, url: SITE_CONFIG.social.facebook, label: 'Facebook' },
  { id: 'youtube', icon: Youtube, url: SITE_CONFIG.social.youtube, label: 'YouTube' },
].filter((link) => link.url);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-maroon-900 border-t border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <AnimatedLogo className="w-6 h-6" />
          <span className="text-white font-bodoni font-bold text-xl">{SITE_CONFIG.brandName}</span>
        </div>

        <p className="text-slate-500 text-xs tracking-widest uppercase text-center">
          © {currentYear} {SITE_CONFIG.brandName} — {SITE_CONFIG.tagline}
        </p>

        {SOCIAL_LINKS.length > 0 && (
          <div className="flex gap-8">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-5 h-5 text-slate-500 hover:text-gold-500 cursor-pointer transition-colors"
                >
                  <Icon className="w-full h-full" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
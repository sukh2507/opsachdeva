import React from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { BRAND_ASSETS } from '../data/media';
import PhotoSlideshow from './PhotoSlideshow';
import SheetBackground from './SheetBackground';

/**
 * AboutSection
 * Company story + years-of-legacy badge. The photo card is a smooth
 * 2-photo slideshow (BRAND_ASSETS.philosophyPhotos: cov1.jpeg / cov2.jpeg).
 * The section background is the original hero photo (bg.jpeg, now that
 * des1 has taken over the Hero background), fitted so it's never
 * cropped/overflowing, with a translucent white sheet over it.
 */
const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <SheetBackground src={BRAND_ASSETS.philosophyBackground} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        <div className="relative group">
          <div className="absolute -inset-4 bg-gold-500/10 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-700" />
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gold-500/30">
            <PhotoSlideshow
              photos={BRAND_ASSETS.philosophyPhotos}
              intervalMs={3000}
              transitionMs={1500}
              className="relative w-full h-96 lg:h-[600px]"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-10 shadow-2xl rounded-2xl hidden md:block border border-gold-500/30">
            <p className="text-maroon-700 font-serif text-5xl font-bold">{SITE_CONFIG.yearsOfLegacy}</p>
            <p className="text-slate-400 text-xs uppercase tracking-widest mt-2">Years of Legacy</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <span className="text-maroon-700 uppercase tracking-widest text-s font-bold">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif text-slate-800 mt-6 leading-tight">
              Spreading <br />
              <span className="italic text-slate-700 font-bold">Divinity &amp; Devotion</span>
            </h2>
          </div>

          <p className="text-black text-xl font-semibold leading-relaxed">
            {SITE_CONFIG.description}
          </p>

          {/* Event types list - sourced from siteConfig so it's always
              in sync with the Hero typewriter and easy to extend. */}
          <div className="space-y-3">
            {SITE_CONFIG.eventTypes.map((event) => (
              <div key={event} className="flex gap-4 items-center">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0" />
                <p className="text-slate-800 font-medium">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
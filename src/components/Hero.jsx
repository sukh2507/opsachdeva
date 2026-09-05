import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import PhotoSlideshow from './PhotoSlideshow';
import { SITE_CONFIG } from '../data/siteConfig';
import { BRAND_ASSETS } from '../data/media';

/**
 * Hero
 * Animated logo/name reveal + typewriter effect cycling through the
 * event types listed in siteConfig.eventTypes. Add/remove event types
 * there - this component doesn't need to change.
 */
const Hero = () => {
  const [stage, setStage] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const services = SITE_CONFIG.eventTypes;

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Animation sequence stages
  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 0);
    const timer2 = setTimeout(() => setStage(2), 2000);
    const timer3 = setTimeout(() => setStage(3), 3000);
    const timer4 = setTimeout(() => setStage(4), 3800);
    return () => [timer1, timer2, timer3, timer4].forEach(clearTimeout);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (stage < 4) return;
    const currentText = services[textIndex];
    const charCount = currentText.length;
    const typingSpeed = 300 / charCount;
    const pauseTime = 1500;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % services.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, services, stage]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white box-border pt-24 pb-12 md:pt-28"
    >
      {/* Full-bleed - deliberately starts at the very top (behind the
          glass navbar) so there's no plain-white gap anywhere in the
          section; the navbar's own blur/translucency handles legibility
          up there. Section content below is separately padded down so
          it isn't visually covered by the navbar. */}
      <div className="absolute inset-0 z-0">
        <PhotoSlideshow
          photos={[BRAND_ASSETS.heroBackground]}
          intervalMs={3000}
          transitionMs={1500}
          fit="cover"
          className="absolute inset-0"
        />
        {/* Translucent white "sheet" wash so the hero photo reads clearly
            while text stays legible. */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center relative mb-8 w-full">
          <div
            className={`z-20 bg-white rounded-full p-2 transform transition-all duration-1000 ${
              stage >= 2 ? 'md:-translate-x-80 scale-100 opacity-100' : stage >= 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            <AnimatedLogo className="w-20 h-20 md:w-32 md:h-32" />
          </div>

          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center overflow-visible pointer-events-none w-full justify-center mt-4 md:mt-0">
            <div
              className={`whitespace-nowrap transition-all duration-1000 ${
                stage >= 2 ? 'opacity-100 md:translate-x-24' : 'opacity-0 md:translate-x-0 translate-y-4 md:translate-y-0'
              }`}
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-maroon-700 via-gold-500 to-maroon-700 bg-clip-text text-transparent tracking-tight">
                {SITE_CONFIG.brandName}
              </h1>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className={`transition-opacity duration-1000 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-slate-800 italic">
              {SITE_CONFIG.tagline} 🙏
            </h2>
          </div>

          <div className={`transition-opacity duration-800 ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-16 flex items-center justify-center">
              <p className="text-base md:text-xl text-slate-700 text-center">
                We organise{' '}
                <span className="font-semibold text-maroon-700">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={scrollToAbout}
            className={`mt-6 px-10 py-4 bg-white/80 border border-maroon-300 text-maroon-800 rounded-full text-sm tracking-widest uppercase transition-all shadow-sm flex items-center gap-3 mx-auto hover:scale-105 hover:bg-maroon-50 ${
              stage >= 4 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Explore Our Events <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-20 bg-gradient-to-b from-maroon-600 to-transparent opacity-40" />
      </div>
    </section>
  );
};

export default Hero;
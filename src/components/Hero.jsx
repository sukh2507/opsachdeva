import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { SITE_CONFIG } from '../data/siteConfig';

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

  const legacyHighlights = [
    '35+ Years of Trusted Spiritual Legacy',
    'Renowned Singers and Live Devotional Artists',
    'Grand, Custom-designed Royal Bhawan Setup',
    '100% Hassle-free Event Planning & Execution',
    '7,000+ Grand Spiritual Events Successfully Delivered',
    'Punctual, Professional & Seamless Management',
  ];

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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden box-border pt-24 pb-12 md:pt-28"
    >
      <div className="relative z-10 flex flex-col items-center px-6 max-w-6xl mx-auto -translate-y-10 sm:-translate-y-12 md:-translate-y-16 lg:-translate-y-20">
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
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-maroon-700 tracking-tight">
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


      {/*
        Responsive marquee positioning:
        - Phone: sits in the vertical space between Explore Our Events and the
          floating Call / WhatsApp buttons.
        - Laptop/Desktop: sits horizontally between the two floating buttons,
          aligned close to their bottom level.
      */}
      <div
        className="
          absolute z-30 overflow-hidden bg-[#f8f3e8]/95
          border-y border-maroon-700/15 shadow-sm
          left-0 right-0 bottom-24 py-3
          sm:left-24 sm:right-24 sm:bottom-6 sm:py-4
          md:left-28 md:right-28
          lg:left-32 lg:right-32
        "
      >
        <div className="hero-marquee-track flex w-max items-center whitespace-nowrap">
          {[...legacyHighlights, ...legacyHighlights].map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span className="px-8 sm:px-12 md:px-16 font-serif text-sm sm:text-base md:text-lg font-bold text-maroon-700">
                {item}
              </span>
              <span className="text-gold-500 text-base sm:text-lg" aria-hidden="true">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .hero-marquee-track {
          animation: heroMarquee 34s linear infinite;
          will-change: transform;
        }

        @keyframes heroMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;  
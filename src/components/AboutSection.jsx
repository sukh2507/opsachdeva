import React, { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { BRAND_ASSETS } from '../data/media';
import PhotoSlideshow from './PhotoSlideshow';

const COUNTER_DURATION = 3400;

const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

// 35+ follows a smooth, steady ease-out.
const getYearsProgress = (t) => {
  const p = clamp01(t);
  return 1 - Math.pow(1 - p, 3);
};

// 10,000+ is dynamically tied to the 35+ counter.
// It races far ahead early, then automatically brakes harder and harder
// as the 35+ counter approaches its final value. Because both are derived
// from the same master progress, they always finish on the same frame.
const getEventsProgress = (t) => {
  const yearsProgress = getYearsProgress(t);

  // Strong early lead, with the lead naturally collapsing to zero near the end.
  return 1 - Math.pow(1 - yearsProgress, 3.35);
};

const CounterValue = ({ end, progress, progressFn, suffix = '+' }) => {
  const value = Math.min(end, Math.floor(end * progressFn(progress)));

  return (
    <span>
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

/**
 * AboutSection
 * Company story + philosophy content with an image slideshow and
 * synchronized animated milestone counters below the main content.
 */
const AboutSection = () => {
  const countersRef = useRef(null);
  const animationFrameRef = useRef(null);
  const hasStartedRef = useRef(false);
  const [counterProgress, setCounterProgress] = useState(0);

  useEffect(() => {
    const element = countersRef.current;
    if (!element) return undefined;

    const startCounters = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      // One RAF loop drives BOTH counters, so they begin and finish together.
      const startTime = performance.now();

      const animate = (now) => {
        const progress = clamp01((now - startTime) / COUNTER_DURATION);
        setCounterProgress(progress);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCounterProgress(1);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (!('IntersectionObserver' in window)) {
      startCounters();
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        startCounters();
        observer.unobserve(element);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative pt-20 sm:pt-28 lg:pt-36 pb-20 sm:pb-28 lg:pb-36"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div className="relative isolate group">
          <div className="absolute -inset-4 z-0 bg-gold-500/10 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-700" />

          {/* Only this layer changes when the slideshow advances. */}
          <div className="relative z-0 rounded-xl overflow-hidden shadow-2xl border border-gold-500/30 bg-white">
            <PhotoSlideshow
              photos={BRAND_ASSETS.philosophyPhotos}
              intervalMs={3000}
              transitionMs={1500}
              fit="cover"
              objectPosition={['center', 'top']}
              className="relative w-full h-96 lg:h-[600px]"
            />
          </div>

          {/* Completely independent of the slideshow image layer. */}
          <div
            className="absolute z-50 pointer-events-none bottom-3 right-3 sm:bottom-4 sm:right-4 md:-bottom-10 md:-right-10 bg-white p-3 sm:p-4 md:p-10 shadow-2xl rounded-xl md:rounded-2xl border border-gold-500/30"
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            <p className="text-maroon-700 font-serif text-2xl sm:text-3xl md:text-5xl font-bold">
              {SITE_CONFIG.yearsOfLegacy}
            </p>
            <p className="text-slate-400 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest mt-1 md:mt-2">
              Years of Legacy
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <span className="text-maroon-700 uppercase tracking-widest text-s font-bold">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-slate-800 mt-6 leading-tight">
              Spreading <br />
              <span className="italic text-slate-700 font-bold">
                Divinity &amp; Devotion
              </span>
            </h2>
          </div>

          <p className="text-black text-xl font-semibold leading-relaxed">
            {SITE_CONFIG.description}
          </p>

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

      <div
        ref={countersRef}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 lg:mt-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="rounded-xl bg-[#f8f5ef] border border-maroon-700/15 shadow-md px-4 py-5 sm:px-6 sm:py-6 text-center">
            <p className="text-maroon-700 text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold mb-2">
              Hosting Since
            </p>
            <p className="text-maroon-700 font-serif text-4xl sm:text-5xl font-bold leading-none">
              <CounterValue
                end={35}
                progress={counterProgress}
                progressFn={getYearsProgress}
              />
            </p>
          </div>

          <div className="rounded-xl bg-[#f8f5ef] border border-maroon-700/15 shadow-md px-4 py-5 sm:px-6 sm:py-6 text-center">
            <p className="text-maroon-700 text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold mb-2">
              Events Successfully Organised
            </p>
            <p className="text-maroon-700 font-serif text-4xl sm:text-5xl font-bold leading-none">
              <CounterValue
                end={10000}
                progress={counterProgress}
                progressFn={getEventsProgress}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

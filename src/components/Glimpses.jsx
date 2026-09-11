import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GLIMPSES_MEDIA } from '../data/media';

const Glimpses = () => {
  const [active, setActive] = useState(0);
  const [isPhone, setIsPhone] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px)').matches
      : false
  );
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateDevice = (event) => {
      setIsPhone(event.matches);
      setActive(0);
    };

    setIsPhone(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateDevice);
    return () => mediaQuery.removeEventListener('change', updateDevice);
  }, []);

  const visibleMedia = useMemo(
    () => (isPhone ? GLIMPSES_MEDIA : GLIMPSES_MEDIA.slice(1)),
    [isPhone]
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '250px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || visibleMedia.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % visibleMedia.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [visibleMedia.length, isVisible]);

  useEffect(() => {
    if (active >= visibleMedia.length) setActive(0);
  }, [active, visibleMedia.length]);

  useEffect(() => {
    const item = visibleMedia[active];
    if (!item) return;

    if (item.type === 'image') {
      const next = visibleMedia[(active + 1) % visibleMedia.length];
      if (next?.type === 'image') {
        const image = new Image();
        image.src = next.url;
      }
    }

    if (videoRef.current) {
      if (isVisible && item.type === 'video') videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [active, visibleMedia, isVisible]);

  if (!visibleMedia.length) return null;
  const item = visibleMedia[active];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden content-auto-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">
            Moments of Devotion
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">Glimpses</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4">
            A few moments from our devotional events.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-xl border border-maroon-700/15 bg-black isolate">
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden">
            {item.type === 'image' ? (
              <img
                key={item.url}
                src={item.url}
                alt={`Glimpse ${active + 1}`}
                decoding="async"
                fetchPriority={active === 0 ? 'high' : 'auto'}
                draggable="false"
                className="absolute inset-0 block w-full h-full object-cover object-center media-fade-in"
              />
            ) : (
              <video
                key={item.url}
                ref={videoRef}
                src={item.url}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 block w-full h-full object-cover object-center media-fade-in"
              />
            )}
          </div>

          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/20 px-3 py-2">
            {visibleMedia.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === index ? 'w-8 bg-white' : 'w-2 bg-white/60 hover:bg-white/90'
                }`}
                aria-label={`Show glimpse ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Glimpses;

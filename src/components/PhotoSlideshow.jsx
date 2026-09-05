import React, { useState, useEffect, useRef } from 'react';

/**
 * PhotoSlideshow
 * ----------------
 * Shows ONE photo at a time, full-bleed (object-cover), and smoothly
 * crossfades to the next photo in the array on a timer. Used anywhere
 * we want a clean single-photo slideshow rather than a tiled/repeating
 * grid: the fixed page backdrop, the Hero background, and the About
 * section's photo card.
 *
 * Props:
 *  photos       - array of image URLs (required, needs at least 1)
 *  intervalMs   - how long each photo stays fully visible (default 3500)
 *  transitionMs - crossfade duration (default 1200)
 *  className    - classes for the outer wrapper - MUST include a position
 *                 class (`relative` or `absolute inset-0`), since this
 *                 component no longer sets one itself.
 *  fit          - 'cover' (default, fills the box, may crop) or
 *                 'contain' (shows the whole photo, may letterbox)
 */
const PhotoSlideshow = ({ photos = [], intervalMs = 3500, transitionMs = 1200, className = '', fit = 'cover' }) => {
  const [index, setIndex] = useState(0);
  const [fadingIn, setFadingIn] = useState(false);
  const timerRef = useRef(null);

  // Reset to the first photo whenever the photo set itself changes
  // (e.g. navigating from one Bhawan's page to another's).
  useEffect(() => {
    setIndex(0);
    setFadingIn(false);
  }, [photos]);

  useEffect(() => {
    if (photos.length < 2) return undefined;
    timerRef.current = setInterval(() => {
      setFadingIn(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % photos.length);
        setFadingIn(false);
      }, transitionMs);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [photos, intervalMs, transitionMs]);

  if (!photos.length) return null;

  const nextIndex = (index + 1) % photos.length;

  const objectFitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={photos[index]}
        alt=""
        className={`absolute inset-0 w-full h-full ${objectFitClass}`}
        style={{ opacity: fadingIn ? 0 : 1, transition: `opacity ${transitionMs}ms ease-in-out` }}
      />
      {photos.length > 1 && (
        <img
          src={photos[nextIndex]}
          alt=""
          className={`absolute inset-0 w-full h-full ${objectFitClass}`}
          style={{ opacity: fadingIn ? 1 : 0, transition: `opacity ${transitionMs}ms ease-in-out` }}
        />
      )}
    </div>
  );
};

export default PhotoSlideshow;
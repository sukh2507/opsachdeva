import React, { useState, useEffect, useRef } from 'react';

/**
 * PhotoSlideshow
 * ----------------
 * Shows ONE photo at a time, in a FIXED-SIZE frame (set via className),
 * and smoothly crossfades to the next photo in the array on a timer.
 * Used anywhere we want a clean single-photo slideshow rather than a
 * tiled/repeating grid: the fixed page backdrop, the Hero background,
 * and the About section's photo card.
 *
 * Note on fit: with a fixed-size frame, a photo whose aspect ratio
 * doesn't exactly match the frame can only be shown one of two ways -
 * `cover` (fills the frame completely, crops whatever doesn't fit) or
 * `contain` (shows the whole photo, leaves blank space around it).
 * There's no third option that's both edge-to-edge AND uncropped unless
 * the photo's own dimensions already match the frame's shape - that's a
 * property of the source image, not something CSS can work around.
 *
 * All photos are rendered (stacked, absolutely positioned) from the
 * start, not swapped in lazily - this means the browser starts loading
 * every photo immediately, so the very first crossfade never has to
 * wait on a not-yet-loaded image (which previously caused a jarring
 * "blink" instead of a smooth fade on the first cycle).
 *
 * Timing: each photo stays fully, statically visible for `intervalMs`,
 * THEN crossfades to the next over `transitionMs`. These add together
 * (a full cycle takes intervalMs + transitionMs) - the display time is
 * never eaten into by the transition.
 *
 * Props:
 *  photos         - array of image URLs (required, needs at least 1)
 *  intervalMs     - how long each photo stays fully, statically visible
 *                   before it starts crossfading (default 3000 = 3s)
 *  transitionMs   - crossfade duration (default 1500)
 *  className      - classes for the outer wrapper - MUST include a
 *                   position class (`relative` or `absolute inset-0`)
 *                   and the frame's fixed size (e.g. h-96), since this
 *                   component doesn't set either itself.
 *  fit            - 'cover' (default, fills the frame, may crop) or
 *                   'contain' (shows the whole photo, may letterbox)
 *  objectPosition - which part of the photo stays visible when `fit`
 *                   crops it. Either one value applied to every photo
 *                   (e.g. 'top'), or an array with one value per photo
 *                   in the same order as `photos`, e.g. ['center','top']
 *                   to anchor only the second photo to the top. Only
 *                   matters when fit='cover'. Defaults to 'center'.
 */
const PhotoSlideshow = ({
  photos = [],
  intervalMs = 3000,
  transitionMs = 1500,
  className = '',
  fit = 'cover',
  objectPosition = 'center',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  // Reset to the first photo whenever the photo set itself changes
  // (e.g. navigating from one Bhawan's page to another's).
  useEffect(() => {
    setActiveIndex(0);
  }, [photos]);

  useEffect(() => {
    if (photos.length < 2) return undefined;

    function scheduleNext() {
      timerRef.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % photos.length);
        scheduleNext();
      }, intervalMs);
    }
    scheduleNext();

    return () => clearTimeout(timerRef.current);
  }, [photos, intervalMs]);

  if (!photos.length) return null;

  const objectFitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  const getObjectPosition = (i) =>
    Array.isArray(objectPosition) ? objectPosition[i] || 'center' : objectPosition;

  return (
    <div className={`overflow-hidden ${className}`}>
      {photos.map((url, i) => (
        <img
          key={url}
          src={url}
          alt=""
          className={`absolute inset-0 w-full h-full ${objectFitClass}`}
          style={{
            objectPosition: getObjectPosition(i),
            opacity: i === activeIndex ? 1 : 0,
            transition: `opacity ${transitionMs}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  );
};

export default PhotoSlideshow;
import React from 'react';
import PhotoSlideshow from './PhotoSlideshow';

/**
 * PhotoBackdrop
 * --------------
 * Fixed, full-viewport single-photo slideshow sitting behind every page,
 * with a translucent (not fully opaque) cream/white layer on top so
 * page content stays readable. One clear photo fills the screen at a
 * time, crossfading to the next every few seconds - no tiling/repeats.
 *
 * Usage: render once per layout, pass whichever photos make sense for
 * the current page (see Layout.jsx / useOutletContext pattern).
 */
const PhotoBackdrop = ({ photos = [] }) => {
  if (photos.length === 0) return null;

  return (
    <div className="photo-backdrop" aria-hidden="true">
      <PhotoSlideshow photos={photos} intervalMs={5000} transitionMs={900} className="absolute inset-0" />
      <div className="photo-backdrop-overlay" />
    </div>
  );
};

export default PhotoBackdrop;
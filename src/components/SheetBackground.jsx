    import React from 'react';

/**
 * SheetBackground
 * ----------------
 * A single background image, fitted (object-contain, never cropped or
 * overflowing its section), with a translucent white "sheet" layered on
 * top so text placed above it stays readable. Used behind the "Our
 * Philosophy" section and the Jhankies/Singers pages.
 *
 * Render this as the first child of a `relative overflow-hidden`
 * section - it fills that section via absolute positioning.
 */
const SheetBackground = ({ src, overlayClassName = 'bg-white/70' }) => {
  if (!src) return null;
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      />
      <div className={`absolute inset-0 ${overlayClassName} pointer-events-none`} />
    </>
  );
};

export default SheetBackground;
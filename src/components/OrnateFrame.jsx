import React from 'react';

/**
 * OrnateFrame
 * ------------
 * A decorative maroon-and-gold frame (matching the brochure's border
 * style) around any content - used for video cards on the Jhankies and
 * Singers pages instead of a plain caption label.
 */
const OrnateFrame = ({ children, className = '' }) => {
  return (
    <div className={`ornate-frame shadow-lg ${className}`}>
      <div className="ornate-frame-inner relative">
        <span className="ornate-corner ornate-corner-tl" />
        <span className="ornate-corner ornate-corner-tr" />
        <span className="ornate-corner ornate-corner-bl" />
        <span className="ornate-corner ornate-corner-br" />
        {children}
      </div>
    </div>
  );
};

export default OrnateFrame;

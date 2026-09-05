import React from 'react';
import { BRAND_ASSETS } from '../data/media';

/**
 * AnimatedLogo
 * Displays the brand's round logo (from R2: opsachdevaparty/round.jpeg).
 * @param {string} className - Additional CSS classes for sizing
 */
const AnimatedLogo = ({ className = '' }) => {
  return (
    <img
      src={BRAND_ASSETS.roundLogo}
      alt="OP Sachdeva & Party Logo"
      className={`rounded-full object-cover ${className}`}
      loading="lazy"
    />
  );
};

export default AnimatedLogo;

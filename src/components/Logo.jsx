import React from 'react';

const Logo = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" className="opacity-20" />
    <path d="M50 15C50 15 30 45 30 65C30 80 38.9543 85 50 85C61.0457 85 70 80 70 65C70 45 50 15 50 15Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M50 30L42 48H58L50 30Z" fill="currentColor" />
    <circle cx="50" cy="58" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 85V70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default Logo;
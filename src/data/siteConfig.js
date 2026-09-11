/**
 * siteConfig.js
 * -------------
 * Business-wide details used across the site (Navbar, Footer, Hero,
 * FixedContactButtons, ContactSection). Change once here, it updates
 * everywhere.
 *
 * For photo/video content (Bhawans, Jhankies, Singers), see media.js -
 * that mirrors the actual R2 folder structure.
 */
export const SITE_CONFIG = {
  brandName: 'OP Sachdeva & Party',
  tagline: 'Spreading Divinity, Devotion & Blissful Vibrations',
  yearsOfLegacy: '35+',

  description:
    'We have been blessed to organize soulful devotional events for over 35 years, serving society with utmost devotion and dedication. Our aim is to create a divine atmosphere filled with bhakti, music, and positive energy, ensuring every gathering becomes a truly spiritual experience.',

  eventTypes: [
    "Matarani's Chowki & Jagran",
    'Shri Krishna Bhajan Sandhya',
    'Shri Khatu Shyam Ji Sankirtan',
    'Shri Balaji Kirtan',
    'Shri Sai Sandhya',
    "Guru Ji's Satsang",
  ],

  contact: {
    phone: '+91 98107 65637',
    phone2: '+91 99992 59078',

    whatsapp: '919810765637',

    whatsappMessage:
      'Hello OP Sachdeva & Party, I want to enquire about an event',

    email: 'hello@opsachdeva.com',

    address: 'New Delhi, India',
  },

  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },

  // Google Apps Script Web App URL
  enquiryFormEndpoint:
    'https://script.google.com/macros/s/AKfycbxRkUNxYActkdHL4jWfRVdpszsIfCNSrAY7OgWzDCrcK1v_EfH_EoZ1LodgcN76MqU/exec',
};

export const CATEGORIES = [
  {
    id: 'bhawans',
    name: 'Bhawans',
    icon: '🛕',
    path: '/bhawans',
  },

  {
    id: 'jhankies',
    name: 'Jhankies',
    icon: '🎭',
    path: '/jhankies',
  },

  {
    id: 'singers',
    name: 'Singers',
    icon: '🎤',
    path: '/singers',
  },
];
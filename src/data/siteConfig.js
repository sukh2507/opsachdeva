/**
 * siteConfig.js
 * -------------
 * Business-wide details used across the site (Navbar, Footer, Hero,
 * FixedContactButtons, ContactSection). Change once here, it updates
 * everywhere.
 *
 * For photo/video content (Bhawans, Jhankies, Singers), see media.js -
 * that mirrors the actual R2 folder structure.
 *
 * TODO (Sukhi): replace placeholder phone / whatsapp / email / address
 * with the real OP Sachdeva & Party details before launch.
 */
export const SITE_CONFIG = {
  brandName: 'OP Sachdeva & Party',
  tagline: 'Spreading Divinity, Devotion & Blissful Vibrations',
  yearsOfLegacy: '35+',
  description:
    "We have been blessed to organize soulful devotional events for over 35 years, serving society with utmost devotion and dedication. Our aim is to create a divine atmosphere filled with bhakti, music, and positive energy, ensuring every gathering becomes a truly spiritual experience.",

  // Shown in the Hero typewriter effect and the About section list.
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
    whatsapp: '919810765637', // TODO: confirm this is the WhatsApp-enabled number
    whatsappMessage: 'Hello OP Sachdeva & Party, I want to enquire about an event',
    email: 'hello@opsachdeva.com', // TODO: replace with real email
    address: 'New Delhi, India', // TODO: replace with real address
  },

  social: {
    instagram: '', // TODO
    facebook: '', // TODO
    youtube: '', // TODO
  },

  // Google Apps Script Web App URL that receives enquiry form submissions
  // and appends them to a Google Sheet. See /google-apps-script/Code.gs
  // and /google-apps-script/README.md for setup steps.
  enquiryFormEndpoint: 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
};

/**
 * Top-level category tiles shown on the Home page portfolio preview
 * and used to build the Navbar links. Each `path` must match a route
 * defined in App.jsx.
 */
export const CATEGORIES = [
  { id: 'bhawans', name: 'Bhawans', icon: '🛕', path: '/bhawans' },
  { id: 'jhankies', name: 'Jhankies', icon: '🎭', path: '/jhankies' },
  { id: 'singers', name: 'Singers', icon: '🎤', path: '/singers' },
];
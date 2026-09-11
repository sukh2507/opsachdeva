import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  BHAWANS,
  getBhawanCover,
  BRAND_ASSETS,
  mediaUrl,
} from '../data/media';

const SHIV_PARVATI_JHANKI_COVER = mediaUrl(
  'JHANKIES',
  'SHRI SHIV-PARVATI JI',
  '2.jpg'
);

const TILES = [
  {
    id: 'bhawans',
    title: 'Bhawans',
    path: '/bhawans',
    coverImage: getBhawanCover(BHAWANS[0])?.url,
  },
  {
    id: 'jhankies',
    title: 'Jhankies',
    path: '/jhankies',
    coverImage: SHIV_PARVATI_JHANKI_COVER,
  },
  {
    id: 'singers',
    title: 'Singers',
    path: '/singers',
    coverImage: BRAND_ASSETS.singerCover,
  },
];

const PortfolioPreview = () => {
  return (
    <section id="portfolio" className="relative py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">
            Here's a Glimpse of Our Events
          </span>

          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4 mb-4">
            Bhawans, Jhankies &amp; Singers
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto">
            Explore our decorated Bhawans, live Jhankies, and devotional singers from past events.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TILES.map((tile) => (
            <Link
              key={tile.id}
              to={tile.path}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] flex items-end shadow-lg"
            >
              {tile.coverImage ? (
                <img
                  src={tile.coverImage}
                  alt={tile.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-maroon-700 via-maroon-800 to-slate-900" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 p-6 sm:p-8">
                <h3 className="text-white font-serif text-2xl sm:text-3xl mb-1">
                  {tile.title}
                </h3>

                <span className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-bold">
                  View All
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BHAWANS, getBhawanCover, BRAND_ASSETS } from '../data/media';

/**
 * PortfolioPreview
 * -----------------
 * Home-page teaser: one tile per category (Bhawans / Jhankies / Singers)
 * linking to that category's dedicated page. Covers are derived
 * automatically from media.js, so adding files/Bhawans there keeps this
 * in sync with zero changes here.
 *
 * Jhankies/Singers use a fixed static cover photo (BRAND_ASSETS.jhankiCover
 * / singerCover) rather than a Bhawan-style auto-derived cover, since
 * those R2 folders are video-only.
 */
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
    coverImage: BRAND_ASSETS.jhankiCover,
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
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">
            Here's a Glimpse of Our Events
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4 mb-4">
            Bhawans, Jhankies &amp; Singers
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Explore our decorated Bhawans, live Jhankies, and devotional singers from past events
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TILES.map((tile) => (
            <Link
              key={tile.id}
              to={tile.path}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] flex items-end shadow-2xl shadow-black/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-black/60"
            >
              {tile.coverImage ? (
                <img
                  src={tile.coverImage}
                  alt={tile.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.2] group-active:scale-[1.2]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-maroon-700 via-maroon-800 to-slate-900" />
              )}
              {/* Default dimmed/shadowed look - fades away on hover/tap so
                  the photo reads fully clear once it's zoomed in. */}
              <div className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-hover:opacity-0 group-active:opacity-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 p-6 sm:p-8">
                <h3 className="text-white font-serif text-2xl sm:text-3xl mb-1">{tile.title}</h3>
                <span className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-bold">
                  View All <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
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
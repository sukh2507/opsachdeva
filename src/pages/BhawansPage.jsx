import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BHAWANS, getBhawanCover, GLOBAL_BACKDROP_PHOTOS } from '../data/media';

/**
 * BhawansPage
 * ------------
 * Lists every Bhawan as a card (cover photo + name); each card links to
 * /bhawans/:id for that Bhawan's full photo/video gallery. Driven
 * entirely by the BHAWANS array in data/media.js - add a Bhawan there
 * and a card appears here automatically.
 *
 * Uses a centered flex-wrap layout (not CSS grid) so an incomplete last
 * row stays centered instead of hugging the left edge.
 */
const BhawansPage = () => {
  const { setBackdropPhotos } = useOutletContext();

  useEffect(() => {
    setBackdropPhotos(GLOBAL_BACKDROP_PHOTOS);
  }, [setBackdropPhotos]);

  return (
    <section className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">Our Bhawans</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">Decorated Bhawans</h1>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4">
            Every Bhawan we set up, each with its own theme and craftsmanship
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {BHAWANS.map((bhawan) => {
            const cover = getBhawanCover(bhawan);
            return (
              <Link
                key={bhawan.id}
                to={`/bhawans/${bhawan.id}`}
                className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-lg w-full sm:w-[300px]"
              >
                {cover?.type === 'image' ? (
                  <img
                    src={cover.url}
                    alt={bhawan.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-maroon-700 via-maroon-800 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white font-serif text-2xl mb-1">{bhawan.title}</h2>
                  <p className="text-white/70 text-xs uppercase tracking-widest mb-2">
                    {bhawan.media.length} {bhawan.media.length === 1 ? 'item' : 'items'}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-bold">
                    View Gallery <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BhawansPage;

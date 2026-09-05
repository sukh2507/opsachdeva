import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SINGERS_MEDIA, GLOBAL_BACKDROP_PHOTOS } from '../data/media';
import OrnateFrame from '../components/OrnateFrame';

/**
 * SingersPage
 * ------------
 * Video grid for singer performances. Driven by SINGERS_MEDIA in
 * data/media.js - add a filename to that array (matching what's in the
 * R2 "singers/" folder) and a player appears here automatically.
 * Videos keep a 16:9 landscape frame at every screen size, including
 * on phones, so playback never looks squashed in portrait mode.
 */
const SingersPage = () => {
  const { setBackdropPhotos } = useOutletContext();

  useEffect(() => {
    setBackdropPhotos(GLOBAL_BACKDROP_PHOTOS);
  }, [setBackdropPhotos]);

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">Live Music</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">Singers</h1>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4">
            Bhajan and kirtan singers who've performed at our events
          </p>
        </div>

        {SINGERS_MEDIA.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
            {SINGERS_MEDIA.map((item) => (
              <OrnateFrame key={item.url} className="w-full max-w-sm">
                <video src={item.url} controls playsInline preload="metadata" className="w-full aspect-video block" />
              </OrnateFrame>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center">No singer videos added yet.</p>
        )}
      </div>
    </section>
  );
};

export default SingersPage;

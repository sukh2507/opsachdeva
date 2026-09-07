import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useOutletContext, Navigate } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BHAWANS } from '../data/media';
import OrnateFrame from '../components/OrnateFrame';
import MediaVideo from '../components/MediaVideo';

/**
 * BhawanDetailPage
 * -----------------
 * Shows all photos + videos for one Bhawan (route: /bhawans/:bhawanId).
 * Photos sit in a tight 3-per-row grid and open in a full lightbox with
 * left/right navigation between all of that Bhawan's photos. Videos
 * render inline in an ornate maroon/gold frame. Fully driven by the
 * matching entry in BHAWANS (data/media.js) - no per-Bhawan code needed.
 * The page backdrop cycles through this Bhawan's own photos.
 */
const BhawanDetailPage = () => {
  const { bhawanId } = useParams();
  const { setBackdropPhotos } = useOutletContext();
  const [lightboxIndex, setLightboxIndex] = useState(null); // index into `photos`, or null when closed

  const bhawan = BHAWANS.find((b) => b.id === bhawanId);
  const photos = bhawan ? bhawan.media.filter((m) => m.type === 'image') : [];
  const videos = bhawan ? bhawan.media.filter((m) => m.type === 'video') : [];

  useEffect(() => {
    if (bhawan) {
      const photoUrls = photos.map((p) => p.url);
      setBackdropPhotos(photoUrls.length ? photoUrls : undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bhawanId]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    (e) => {
      e?.stopPropagation();
      setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    },
    [photos.length]
  );
  const showNext = useCallback(
    (e) => {
      e?.stopPropagation();
      setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
    },
    [photos.length]
  );

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  if (!bhawan) {
    return <Navigate to="/bhawans" replace />;
  }

  return (
    <section className="pt-28 sm:pt-32 pb-20 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Link
          to="/bhawans"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-maroon-700 text-xs uppercase tracking-widest font-bold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All Bhawans
        </Link>

        <div className="mb-12 text-center sm:text-left">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">Bhawan</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">{bhawan.title}</h1>
        </div>

        {photos.length > 0 && (
          <div className="mb-16">
            <h2 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-4 text-center sm:text-left">
              Photos
            </h2>
            {/* Fixed 3-per-row grid (Instagram-style), centered and evenly spaced at every screen size. */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 justify-items-center">
              {photos.map((photo, index) => (
                <button
                  key={photo.url}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative overflow-hidden rounded-lg sm:rounded-2xl aspect-square w-full bg-slate-100"
                >
                  <img
                    src={photo.url}
                    alt={bhawan.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {videos.length > 0 && (
          <div>
            <h2 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-4 text-center sm:text-left">
              Videos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center">
              {videos.map((video) => (
                <OrnateFrame key={video.url} className="w-full max-w-lg">
                  <MediaVideo src={video.url} />
                </OrnateFrame>
              ))}
            </div>
          </div>
        )}

        {photos.length === 0 && videos.length === 0 && (
          <p className="text-slate-400 text-center">No media added yet for this Bhawan.</p>
        )}
      </div>

      {/* Lightbox with left/right navigation + close */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 sm:p-3 z-10"
                onClick={showPrev}
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <button
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 sm:p-3 z-10"
                onClick={showNext}
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </>
          )}

          <img
            src={photos[lightboxIndex].url}
            alt={bhawan.title}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {photos.length > 1 && (
            <p className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest uppercase">
              {lightboxIndex + 1} / {photos.length}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default BhawanDetailPage;

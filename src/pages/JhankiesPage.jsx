import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  JHANKIES_MEDIA,
  JHANKI_CATEGORIES,
  GLOBAL_BACKDROP_PHOTOS,
} from '../data/media';
import OrnateFrame from '../components/OrnateFrame';
import MediaVideo from '../components/MediaVideo';

const PHOTO_PAGE_SIZE = 6;
const VIDEO_PAGE_SIZE = 6;

const CATEGORIES = ['All', ...JHANKI_CATEGORIES.map((item) => item.name)];


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`min-w-10 h-10 px-3 rounded-full text-sm font-bold transition-all ${
            currentPage === page
              ? 'bg-maroon-700 text-white shadow-md'
              : 'bg-[#f8f3e8] text-maroon-700 border border-maroon-700/15 hover:bg-white'
          }`}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};


const JhankiesPage = () => {
  const { setBackdropPhotos } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [photoPage, setPhotoPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);

  useEffect(() => {
    setBackdropPhotos(GLOBAL_BACKDROP_PHOTOS);
  }, [setBackdropPhotos]);

  useEffect(() => {
    setPhotoPage(1);
    setVideoPage(1);
  }, [activeCategory]);

  const filteredMedia = useMemo(() => {
    if (activeCategory === 'All') return JHANKIES_MEDIA;

    return JHANKIES_MEDIA.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  const photos = useMemo(
    () => filteredMedia.filter((item) => item.type === 'image'),
    [filteredMedia]
  );

  const videos = useMemo(
    () => filteredMedia.filter((item) => item.type === 'video'),
    [filteredMedia]
  );

  const photoPages = Math.max(1, Math.ceil(photos.length / PHOTO_PAGE_SIZE));
  const videoPages = Math.max(1, Math.ceil(videos.length / VIDEO_PAGE_SIZE));

  const visiblePhotos = photos.slice(
    (photoPage - 1) * PHOTO_PAGE_SIZE,
    photoPage * PHOTO_PAGE_SIZE
  );

  const visibleVideos = videos.slice(
    (videoPage - 1) * VIDEO_PAGE_SIZE,
    videoPage * VIDEO_PAGE_SIZE
  );

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-maroon-700 uppercase tracking-[0.2em] text-xs font-bold">
            Live Performances
          </span>

          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">
            Jhankies
          </h1>

          <p className="text-slate-500 max-w-2xl mx-auto mt-4">
            Explore our devotional Jhankies by category.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-14">
          {CATEGORIES.map((category) => {
            const activeCategorySelected = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold border transition-all duration-300 ${
                  activeCategorySelected
                    ? 'bg-maroon-700 border-maroon-700 text-white shadow-md'
                    : 'bg-[#f8f3e8]/95 border-maroon-700/15 text-maroon-800 hover:border-maroon-700/35 hover:bg-[#fffaf0]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {photos.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className="text-maroon-700 uppercase tracking-[0.18em] text-[11px] font-bold">
                Gallery
              </span>

              <h2 className="font-serif text-3xl md:text-4xl text-slate-800 mt-2">
                Photos
              </h2>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6">
              {visiblePhotos.map((item) => (
                <div
                  key={item.url}
                  className="break-inside-avoid mb-5 sm:mb-6"
                >
                  <div className="w-full overflow-hidden rounded-2xl border border-maroon-700/15 bg-[#f8f3e8] shadow-lg p-[3px]">
                    <div className="overflow-hidden rounded-[13px]">
                      <img
                        src={item.url}
                        alt={item.category}
                        loading="lazy"
                      decoding="async"
                        className="block w-full h-auto"
                      />
                    </div>
                  </div>

                  {activeCategory === 'All' && (
                    <p className="mt-2 px-1 text-center text-xs font-serif text-slate-500">
                      {item.category}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <Pagination
              currentPage={photoPage}
              totalPages={photoPages}
              onPageChange={setPhotoPage}
            />
          </div>
        )}

        {videos.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-maroon-700 uppercase tracking-[0.18em] text-[11px] font-bold">
                Live Moments
              </span>

              <h2 className="font-serif text-3xl md:text-4xl text-slate-800 mt-2">
                Videos
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
              {visibleVideos.map((item) => (
                <div key={item.url} className="w-full">
                  <OrnateFrame className="w-full">
                    <MediaVideo src={item.url} />
                  </OrnateFrame>

                  {activeCategory === 'All' && (
                    <p className="mt-2 text-center text-xs font-serif text-slate-500">
                      {item.category}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <Pagination
              currentPage={videoPage}
              totalPages={videoPages}
              onPageChange={setVideoPage}
            />
          </div>
        )}

        {!photos.length && !videos.length && (
          <div className="py-16 text-center text-slate-500">
            No media has been added for this category yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default JhankiesPage;

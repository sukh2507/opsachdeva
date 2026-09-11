import React, { useEffect, useMemo, useState } from 'react';
import {
  Link,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  BHAWAN_CATEGORIES,
  MATARANI_BHAWANS,
  getBhawanCover,
  GLOBAL_BACKDROP_PHOTOS,
} from '../data/media';
import MediaVideo from '../components/MediaVideo';

const PHOTO_PAGE_SIZE = 6;
const VIDEO_PAGE_SIZE = 3;

const validCategory = (category) =>
  BHAWAN_CATEGORIES.some((item) => item.id === category)
    ? category
    : null;


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


const BhawansPage = () => {
  const { setBackdropPhotos } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = validCategory(searchParams.get('category'));
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [photoPage, setPhotoPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);

  useEffect(() => {
    setBackdropPhotos(GLOBAL_BACKDROP_PHOTOS);
  }, [setBackdropPhotos]);

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
    setPhotoPage(1);
    setVideoPage(1);
  }, [categoryFromUrl]);

  const selectCategory = (id) => {
    setActiveCategory(id);
    setPhotoPage(1);
    setVideoPage(1);
    setSearchParams({ category: id });
  };

  const showAllCategories = () => {
    setActiveCategory(null);
    setPhotoPage(1);
    setVideoPage(1);
    setSearchParams({});
  };

  const selectedCategory = BHAWAN_CATEGORIES.find(
    (item) => item.id === activeCategory
  );

  const photos = useMemo(
    () => selectedCategory?.media?.filter((item) => item.type === 'image') || [],
    [selectedCategory]
  );

  const videos = useMemo(
    () => selectedCategory?.media?.filter((item) => item.type === 'video') || [],
    [selectedCategory]
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
    <section className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">
            Our Bhawans
          </span>

          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">
            Devotional Event Setups
          </h1>

          <p className="text-slate-500 max-w-2xl mx-auto mt-4">
            Choose an event category to explore its Bhawan, photos and videos.
          </p>
        </div>

        {!activeCategory ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BHAWAN_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
                className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-lg text-left"
              >
                <img
                  src={category.coverImage}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h2 className="text-white font-serif text-2xl leading-tight mb-4">
                    {category.title}
                  </h2>

                  <span className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-bold">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={showAllCategories}
              className="inline-flex items-center gap-2 text-maroon-700 text-xs uppercase tracking-widest font-bold mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Categories
            </button>

            <div className="mb-10">
              <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">
                {selectedCategory?.title}
              </span>

              <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mt-3">
                {activeCategory === 'matarani'
                  ? 'Choose a Bhawan'
                  : 'Gallery'}
              </h2>
            </div>

            {activeCategory === 'matarani' ? (
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {MATARANI_BHAWANS.map((bhawan) => {
                  const cover = getBhawanCover(bhawan);

                  return (
                    <Link
                      key={bhawan.id}
                      to={`/bhawans/${bhawan.id}`}
                      className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-lg w-full sm:w-[300px]"
                    >
                      <img
                        src={cover?.url}
                        alt={bhawan.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />

                      <div className="absolute bottom-0 inset-x-0 p-6">
                        <h3 className="text-white font-serif text-2xl mb-2">
                          {bhawan.title}
                        </h3>

                        <span className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-bold">
                          View Gallery
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <>
                {photos.length > 0 && (
                  <div className="mb-16">
                    <h3 className="text-center font-serif text-3xl text-slate-800 mb-8">
                      Photos
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                      {visiblePhotos.map((item) => (
                        <div
                          key={item.url}
                          className="overflow-hidden rounded-2xl shadow-sm bg-black"
                        >
                          <img
                            src={item.url}
                            alt={selectedCategory.title}
                            loading="lazy"
                      decoding="async"
                            className="w-full aspect-square object-cover"
                          />
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
                    <h3 className="text-center font-serif text-3xl text-slate-800 mb-8">
                      Videos
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                      {visibleVideos.map((item) => (
                        <div
                          key={item.url}
                          className="overflow-hidden rounded-2xl shadow-sm bg-black"
                        >
                          <MediaVideo src={item.url} />
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
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BhawansPage;

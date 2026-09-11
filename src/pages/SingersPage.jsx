import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SINGERS_MEDIA, SINGER_DEVOTIONS, SINGER_LANGUAGES, GLOBAL_BACKDROP_PHOTOS } from '../data/media';

const PRIMARY_FILTERS = ['All', ...SINGER_DEVOTIONS];
const LANGUAGES = ['All Languages', ...SINGER_LANGUAGES];
const PAGE_SIZE = 6;

const SingersPage = () => {
  const { setBackdropPhotos } = useOutletContext();
  const [primary, setPrimary] = useState('All');
  const [language, setLanguage] = useState('All Languages');
  const [page, setPage] = useState(1);

  useEffect(() => { setBackdropPhotos(GLOBAL_BACKDROP_PHOTOS); }, [setBackdropPhotos]);
  useEffect(() => { setPage(1); if (primary === 'All') setLanguage('All Languages'); }, [primary]);
  useEffect(() => setPage(1), [language]);

  const filteredMedia = useMemo(() => SINGERS_MEDIA.filter((item) => {
    const categoryOk = primary === 'All' || item.devotion === primary;
    const languageOk = primary === 'All' || language === 'All Languages' || item.language === language;
    return categoryOk && languageOk;
  }), [primary, language]);

  const totalPages = Math.max(1, Math.ceil(filteredMedia.length / PAGE_SIZE));
  const pageItems = filteredMedia.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">Live Music</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">Singers</h1>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4">Browse singers by devotional category and language.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {PRIMARY_FILTERS.map((option) => {
            const active = primary === option;
            return <button key={option} type="button" onClick={() => setPrimary(option)} className={`rounded-full px-5 py-2.5 text-sm font-semibold border transition-all ${active ? 'bg-maroon-700 border-maroon-700 text-white shadow-md' : 'bg-[#f8f3e8]/95 border-maroon-700/15 text-maroon-800 hover:border-maroon-700/35'}`}>{option}</button>;
          })}
        </div>

        {primary !== 'All' && (
          <div className="md:hidden mb-8">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full rounded-xl border border-maroon-700/15 bg-[#f8f3e8] px-4 py-3 text-slate-800 outline-none">
              {LANGUAGES.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
        )}

        <div className={primary !== 'All' ? 'md:grid md:grid-cols-[180px_1fr] md:gap-8' : ''}>
          {primary !== 'All' && (
            <aside className="hidden md:block">
              <div className="sticky top-28 rounded-2xl bg-[#f8f3e8]/95 border border-maroon-700/10 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-widest font-bold text-maroon-700 px-2 mb-3">Language</p>
                <div className="flex flex-col gap-2">
                  {LANGUAGES.map((option) => <button key={option} type="button" onClick={() => setLanguage(option)} className={`text-left rounded-xl px-4 py-3 text-sm font-semibold transition ${language === option ? 'bg-maroon-700 text-white' : 'text-slate-700 hover:bg-white/80 hover:text-maroon-700'}`}>{option}</button>)}
                </div>
              </div>
            </aside>
          )}

          <div>
            {pageItems.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {pageItems.map((item) => <video key={item.url} src={item.url} controls playsInline className="w-full aspect-video bg-black rounded-2xl" />)}
              </div>
            ) : (
              <div className="rounded-3xl bg-[#f8f3e8]/90 border border-maroon-700/10 px-6 py-16 text-center shadow-sm">
                <h3 className="font-serif text-2xl text-slate-800">No singer videos added yet</h3>
                <p className="text-slate-500 mt-3">This filter structure is ready and will populate once files are uploaded.</p>
              </div>
            )}

            {totalPages > 1 && <div className="flex justify-center gap-2 mt-10">{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => <button key={n} type="button" onClick={() => setPage(n)} className={`w-10 h-10 rounded-full text-sm font-bold ${page === n ? 'bg-maroon-700 text-white' : 'bg-[#f8f3e8] text-maroon-700 border border-maroon-700/15'}`}>{n}</button>)}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingersPage;

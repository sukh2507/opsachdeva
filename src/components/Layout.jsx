import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FixedContactButtons from './FixedContactButtons';
import PhotoBackdrop from './PhotoBackdrop';
import { GLOBAL_BACKDROP_PHOTOS } from '../data/media';

/**
 * Layout
 * -------
 * Wraps every route: Navbar + Footer + FixedContactButtons stay fixed,
 * the routed page renders via <Outlet>. Each page can customize the
 * PhotoBackdrop by calling the `setBackdropPhotos` function it receives
 * through Outlet context, e.g.:
 *
 *   const { setBackdropPhotos } = useOutletContext();
 *   useEffect(() => setBackdropPhotos(myPagePhotos), []);
 *
 * If a page doesn't set anything, it falls back to a general mix of
 * photos across all Bhawans (GLOBAL_BACKDROP_PHOTOS).
 */
const Layout = () => {
  const [backdropPhotos, setBackdropPhotos] = useState(GLOBAL_BACKDROP_PHOTOS);

  return (
    <div className="min-h-screen font-sans selection:bg-gold-100 selection:text-maroon-800 relative">
      <PhotoBackdrop photos={backdropPhotos} />

      <div className="relative z-10">
        <Navbar />
        <main>
          <FixedContactButtons />
          <Outlet context={{ setBackdropPhotos }} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

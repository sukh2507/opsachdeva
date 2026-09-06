import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import PortfolioPreview from '../components/PortfolioPreview';
import ContactSection from '../components/ContactSection';
import { GLOBAL_BACKDROP_PHOTOS } from '../data/media';

/**
 * HomePage
 * ---------
 * Hero uses its own background (bg2.png) and "Our Philosophy" uses its
 * own (bg3.png) - each section is self-contained.
 */
const HomePage = () => {
  const { setBackdropPhotos } = useOutletContext();

  useEffect(() => {
    setBackdropPhotos(GLOBAL_BACKDROP_PHOTOS);
  }, [setBackdropPhotos]);

  return (
    <>
      <Hero />
      <div className="section-fade-in">
        <AboutSection />
      </div>
      <div className="section-fade-in">
        <PortfolioPreview />
      </div>
      <div className="section-fade-in">
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
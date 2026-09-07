import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import PortfolioPreview from '../components/PortfolioPreview';
import ContactSection from '../components/ContactSection';
import { GLOBAL_BACKDROP_PHOTOS } from '../data/media';

const HomePage = () => {
  const { setBackdropPhotos } = useOutletContext();

  useEffect(() => {
    setBackdropPhotos(GLOBAL_BACKDROP_PHOTOS);
  }, [setBackdropPhotos]);

  return (
    <>
      {/*
        Hero + Philosophy now share one continuous background.
        backgroundAttachment: 'fixed' keeps the image locked to the viewport
        while both sections/content scroll normally over it.
      */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)), url(https://pub-3e36b5a03039464ca9c238b74290d861.r2.dev/opsachdevaparty/bgs.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <Hero />
        <div className="section-fade-in">
          <AboutSection />
        </div>
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

import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Glimpses from '../components/Glimpses';
import PortfolioPreview from '../components/PortfolioPreview';
import TeamOps from '../components/TeamOps';
import ContactSection from '../components/ContactSection';
import { GLOBAL_BACKDROP_PHOTOS } from '../data/media';

const HERO_BG =
  'https://pub-3e36b5a03039464ca9c238b74290d861.r2.dev/opsachdevaparty/bgs.png';

const EVENTS_BG =
  'https://pub-3e36b5a03039464ca9c238b74290d861.r2.dev/opsachdevaparty/off.png';

const HomePage = () => {
  const { setBackdropPhotos } = useOutletContext();

  useEffect(() => {
    setBackdropPhotos(GLOBAL_BACKDROP_PHOTOS);
  }, [setBackdropPhotos]);

  return (
    <>
      {/* Hero + AboutSection share one continuous fixed background */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)), url(${HERO_BG})`,
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

      {/* Glimpses + Portfolio Preview + Team OPS share one continuous fixed background */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.16), rgba(255,255,255,0.16)), url(${EVENTS_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="section-fade-in">
          <Glimpses />
        </div>

        <div className="section-fade-in">
          <PortfolioPreview />
        </div>

        <div className="section-fade-in">
          <TeamOps />
        </div>
      </div>

      <div className="section-fade-in content-auto-section">
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;

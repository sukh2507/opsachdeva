import React from 'react';
import { TEAM_OPS_PHOTOS } from '../data/media';
import PhotoSlideshow from './PhotoSlideshow';

const TeamOps = () => {
  return (
    <section id="team-ops" className="relative py-20 overflow-hidden content-auto-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-maroon-700 uppercase tracking-widest text-xs font-bold">
            The People Behind Every Celebration
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4">Team OPS</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4">
            Our dedicated team behind every devotional event.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-xl border border-maroon-700/15">
          <PhotoSlideshow
            photos={TEAM_OPS_PHOTOS}
            intervalMs={3000}
            transitionMs={900}
            className="relative h-[380px] sm:h-[480px] lg:h-[580px]"
          />
        </div>
      </div>
    </section>
  );
};

export default TeamOps;

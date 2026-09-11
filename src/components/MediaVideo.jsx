import React, { useRef, useState } from 'react';

const MediaVideo = ({ src, className = '' }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  const retryVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    setHasError(false);
    video.load();
  };

  return (
    <div className={`relative w-full aspect-video bg-black overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        key={src}
        src={src}
        controls
        playsInline
        preload="none"
        className="w-full h-full block object-contain bg-black"
        onLoadedMetadata={() => setHasError(false)}
        onCanPlay={() => setHasError(false)}
        onError={() => setHasError(true)}
      />

      {hasError && (
        <button
          type="button"
          onClick={retryVideo}
          className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm px-5 text-center cursor-pointer"
          aria-label="Retry video"
        >
          Tap to retry video
        </button>
      )}
    </div>
  );
};

export default MediaVideo;

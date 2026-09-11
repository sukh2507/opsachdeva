import React, { useEffect, useMemo, useRef, useState } from 'react';

const PhotoSlideshow = ({
  photos = [],
  intervalMs = 3000,
  transitionMs = 1500,
  className = '',
  fit = 'cover',
  objectPosition = 'center',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [previousVisible, setPreviousVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const wrapperRef = useRef(null);
  const cleanupTimerRef = useRef(null);

  const safePhotos = useMemo(() => photos.filter(Boolean), [photos]);

  useEffect(() => {
    setActiveIndex(0);
    setPreviousIndex(null);
    setPreviousVisible(false);
  }, [safePhotos]);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!safePhotos.length) return undefined;

    const nextIndex = (activeIndex + 1) % safePhotos.length;
    const img = new Image();
    img.src = safePhotos[nextIndex];
  }, [activeIndex, safePhotos]);

  useEffect(() => {
    if (!isVisible || safePhotos.length < 2) return undefined;

    const timer = setTimeout(() => {
      setPreviousIndex(activeIndex);
      setPreviousVisible(true);
      setActiveIndex((current) => (current + 1) % safePhotos.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPreviousVisible(false));
      });

      clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = setTimeout(() => {
        setPreviousIndex(null);
      }, transitionMs + 50);
    }, intervalMs + (previousIndex === null && activeIndex === 0 ? 0 : transitionMs));

    return () => clearTimeout(timer);
  }, [activeIndex, safePhotos.length, intervalMs, transitionMs, isVisible]);

  useEffect(
    () => () => clearTimeout(cleanupTimerRef.current),
    []
  );

  if (!safePhotos.length) return null;

  const objectFitClass = fit === 'contain' ? 'object-contain' : 'object-cover';
  const getObjectPosition = (i) =>
    Array.isArray(objectPosition) ? objectPosition[i] || 'center' : objectPosition;

  const renderImage = (index, isActive) => (
    <img
      key={`${safePhotos[index]}-${isActive ? 'active' : 'previous'}`}
      src={safePhotos[index]}
      alt=""
      decoding="async"
      loading="eager"
      className={`absolute inset-0 w-full h-full ${objectFitClass}`}
      style={{
        objectPosition: getObjectPosition(index),
        opacity: isActive ? 1 : 0,
        transition: `opacity ${transitionMs}ms ease-in-out`,
        willChange: 'opacity',
        zIndex: 0,
      }}
    />
  );

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
      {previousIndex !== null && (
        <img
          key={`${safePhotos[previousIndex]}-previous`}
          src={safePhotos[previousIndex]}
          alt=""
          decoding="async"
          loading="eager"
          className={`absolute inset-0 w-full h-full ${objectFitClass}`}
          style={{
            objectPosition: getObjectPosition(previousIndex),
            opacity: previousVisible ? 1 : 0,
            transition: `opacity ${transitionMs}ms ease-in-out`,
            willChange: 'opacity',
            zIndex: 1,
          }}
        />
      )}
      {renderImage(activeIndex, true)}
    </div>
  );
};

export default PhotoSlideshow;

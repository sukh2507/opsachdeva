const IMAGE_CACHE = 'opsachdeva-v1-images';
const R2_HOST = 'pub-3e36b5a03039464ca9c238b74290d861.r2.dev';

export const primeRenderedImageCache = async () => {
  if (!('caches' in window)) return;

  const urls = [...document.images]
    .map((img) => img.currentSrc || img.src)
    .filter(Boolean)
    .filter((url) => {
      try {
        return new URL(url).hostname === R2_HOST;
      } catch {
        return false;
      }
    });

  if (!urls.length) return;

  try {
    const cache = await caches.open(IMAGE_CACHE);

    await Promise.allSettled(
      [...new Set(urls)].map(async (url) => {
        const request = new Request(url, { mode: 'no-cors' });
        const existing = await cache.match(request);
        if (existing) return;

        const response = await fetch(request);
        await cache.put(request, response);
      })
    );
  } catch {
    // CacheStorage is an optimization only; never block the site on it.
  }
};

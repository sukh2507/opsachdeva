/**
 * media.js
 * ---------
 * Maps directly onto the Cloudflare R2 bucket's folder structure:
 *
 *   opsachdevaparty/
 *     bhawan/
 *       emr/          1.jpeg, 1.MP4, 2.jpeg, 3.jpeg
 *       golden/       1.jpeg
 *       jhandewala/   1.jpeg, 2.jpeg, 3.jpeg, v1.mp4, v2.MOV
 *       jhoolabhawan/ 1.jpeg, 2.jpeg, v1.MP4
 *     jhankies/       1.mp4 ... 5.mp4
 *     singers/        1.mp4 ... 15.mp4
 *
 * TO ADD MORE FILES to an existing Bhawan/Jhanki/Singer folder in R2:
 * just add the filename (with its exact extension/case) to the matching
 * array below - nothing else needs to change.
 *
 * TO ADD A WHOLE NEW BHAWAN (new folder under bhawan/ in R2):
 * add a new object to the BHAWANS array below with a matching `id`
 * (must equal the R2 folder name exactly, case-sensitive).
 *
 * File extensions/case must match R2 exactly - R2 URLs are
 * case-sensitive (e.g. "1.MP4" and "1.mp4" are different objects).
 */

// Public R2 bucket base URL + the project folder inside it.
const R2_BASE = 'https://pub-3e36b5a03039464ca9c238b74290d861.r2.dev/opsachdevaparty';

// Brand assets (logo, hero background photos) - not part of a Bhawan
// folder, sit directly in the project root of the bucket.
export const BRAND_ASSETS = {
  roundLogo: `${R2_BASE}/round.jpeg`,
  // Hero section full-bleed background, with a translucent white "sheet"
  // wash on top (see Hero.jsx). NOTE: extension guessed as .png to match
  // des2.png's naming - confirm the actual filename/extension in R2.
  heroBackground: `${R2_BASE}/bg.jpeg`,
  // "Our Philosophy" section: card slideshow + a single fitted (not
  // cropped) background photo behind the whole section - reuses the
  // original hero photo now that des1 has replaced it up top.
  philosophyPhotos: [`${R2_BASE}/cov1.jpeg`, `${R2_BASE}/cov2.jpeg`],
  philosophyBackground: `${R2_BASE}/bg.jpeg`,
  // Jhankies/Singers pages: fitted design background + translucent
  // white sheet, same treatment "Our Philosophy" used to have.
  jhankiSingerBackground: `${R2_BASE}/des1.png`,
  // Static cover photos for the Jhankies/Singers home-page preview tiles
  // (those R2 folders are video-only, so these covers live at the
  // bucket root / inside singers/ instead).
  jhankiCover: `${R2_BASE}/jhanki.jpg`,
  singerCover: `${R2_BASE}/singers/sing1.jpeg`,
};

const isVideo = (filename) => /\.(mp4|mov)$/i.test(filename);

/** Turns a bare filename into a full R2 URL + type tag. */
const toMediaObject = (folder, filename) => ({
  url: `${R2_BASE}/${folder}/${filename}`,
  type: isVideo(filename) ? 'video' : 'image',
  filename,
});

export const BHAWANS = [
  {
    id: 'emr',
    title: 'EMR Bhawan',
    files: ['1.jpeg', '1.MP4', '2.jpeg', '3.jpeg'],
  },
  {
    id: 'golden',
    title: 'Golden Bhawan',
    files: ['1.jpeg'],
  },
  {
    id: 'jhandewala',
    title: 'Jhandewala Bhawan',
    files: ['1.jpeg', '2.jpeg', '3.jpeg', 'v1.mp4', 'v2.MOV'],
  },
  {
    id: 'jhoolabhawan',
    title: 'Jhoole Wala Bhawan',
    files: ['1.jpeg', '2.jpeg', 'v1.MP4'],
  },
].map((bhawan) => ({
  ...bhawan,
  media: bhawan.files.map((f) => toMediaObject(`bhawan/${bhawan.id}`, f)),
}));

export const JHANKIES_MEDIA = ['1.mp4', '2.mp4', '3.mp4', '4.mp4', '5.mp4'].map((f) =>
  toMediaObject('jhankies', f)
);

export const SINGERS_MEDIA = [
  '1.mp4', '2.mp4', '3.mp4', '4.mp4', '5.mp4', '6.mp4', '7.mp4',
  '8.mp4', '9.mp4', '10.mp4', '11.mp4', '12.mp4', '13.mp4', '14.mp4', '15.mp4',
].map((f) => toMediaObject('singers', f));

/** First image (cover photo) for a bhawan, falls back to first item if photo-less. */
export const getBhawanCover = (bhawan) =>
  bhawan.media.find((m) => m.type === 'image') || bhawan.media[0];

/**
 * A curated slideshow of 3 photos, one from each of 3 different Bhawans,
 * used as the fixed full-screen backdrop on pages that aren't tied to
 * one specific Bhawan (Home, Bhawans list, Jhankies, Singers).
 */
export const GLOBAL_BACKDROP_PHOTOS = BHAWANS
  .map((b) => getBhawanCover(b)?.url)
  .filter(Boolean)
  .slice(0, 3);
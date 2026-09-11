/**
 * OP Sachdeva & Party
 * Final Cloudflare R2 media configuration
 *
 * Updated according to the latest cleaned R2 folder structure.
 */

const R2_BASE =
  "https://pub-3e36b5a03039464ca9c238b74290d861.r2.dev/opsachdevaparty/finalfiles";

/**
 * Builds safe R2 URLs.
 *
 * Example:
 * mediaUrl(
 *   "BHAWAN",
 *   "MATARANI JI's CHOWKI-JAGRAN",
 *   "EXCLUSIVE BHAWAN",
 *   "1.JPG"
 * )
 */
export const mediaUrl = (...parts) =>
  `${R2_BASE}/${parts
    .map((part) => encodeURIComponent(part))
    .join("/")}`;


const isVideo = (filename = "") =>
  /\.(mp4|mov)$/i.test(filename);


const toMedia = (
  folderParts,
  filename,
  metadata = {}
) => ({
  url: mediaUrl(...folderParts, filename),

  type: isVideo(filename)
    ? "video"
    : "image",

  filename,

  ...metadata,
});


/* =========================================================
   BRAND ASSETS
========================================================= */

const OLD_BASE =
  "https://pub-3e36b5a03039464ca9c238b74290d861.r2.dev/opsachdevaparty";


export const BRAND_ASSETS = {
  roundLogo:
    `${OLD_BASE}/round.jpeg`,

  heroBackground:
    `${OLD_BASE}/des1.png`,

  philosophyPhotos: [
    `${OLD_BASE}/cov1.jpeg`,
    `${OLD_BASE}/cov2.jpeg`,
  ],

  philosophyBackground:
    `${OLD_BASE}/bg.jpeg`,

  jhankiSingerBackground:
    `${OLD_BASE}/des1.png`,
};


/* =========================================================
   BHAWAN HELPERS
========================================================= */

const createMataraniBhawan = (
  id,
  title,
  folder,
  files
) => ({
  id,
  title,
  folder,

  media: files.map((filename) =>
    toMedia(
      [
        "BHAWAN",
        "MATARANI JI's CHOWKI-JAGRAN",
        folder,
      ],
      filename
    )
  ),
});


const createBhawanCategory = (
  id,
  title,
  folder,
  files
) => ({
  id,
  title,
  folder,

  media: files.map((filename) =>
    toMedia(
      [
        "BHAWAN",
        folder,
      ],
      filename
    )
  ),
});


/* =========================================================
   MATARANI JI'S CHOWKI-JAGRAN
========================================================= */

export const MATARANI_BHAWANS = [

  /* ---------------- EXCLUSIVE BHAWAN ---------------- */

  createMataraniBhawan(
    "exclusive",
    "Exclusive Bhawan",
    "EXCLUSIVE BHAWAN",
    [
      "1.JPG",
      "2.JPG",
      "3.JPG",
      "4.JPG",
      "5.JPG",

      "vid1.mp4",
      "vid2.MP4",
    ]
  ),


  /* ---------------- GOLDEN BHAWAN ---------------- */

  createMataraniBhawan(
    "golden",
    "Golden Bhawan",
    "GOLDEN BHAWAN",
    [
      "1.jpg",
      "2.jpg",

      "vid1.MOV",
      "vid2.mp4",
    ]
  ),


  /* ---------------- JHANDEWALA ---------------- */

  createMataraniBhawan(
    "jhandewala",
    "Jhandewala Bhawan",
    "JHANDEWALA BHAWAN",
    [
      "1.JPG",

      "vid1.MOV",
    ]
  ),


  /* ---------------- JHOOLE WALA ---------------- */

  createMataraniBhawan(
    "jhoole-wala",
    "Jhoole Wala Bhawan",
    "JHOOLE WALA BHAWAN",
    [
      "1.jpg",

      "vid1.mp4",
    ]
  ),


  /* ---------------- PREMIUM ---------------- */

  createMataraniBhawan(
    "premium",
    "Premium Bhawan",
    "PREMIUM BHAWAN",
    [
      "1.jpg",

      "vid1.mp4",
    ]
  ),
];


/* =========================================================
   MAIN BHAWAN CATEGORIES
========================================================= */

export const BHAWAN_CATEGORIES = [

  /* ---------------- MATARANI ---------------- */

  {
    id:
      "matarani",

    title:
      "Matarani Ji's Chowki-Jagran",

    folder:
      "MATARANI JI's CHOWKI-JAGRAN",

    subBhawans:
      MATARANI_BHAWANS,

    coverImage:
      MATARANI_BHAWANS[0]
        ?.media
        ?.find(
          (item) =>
            item.type === "image"
        )
        ?.url,
  },


  /* ---------------- KHATU SHYAM ---------------- */

  createBhawanCategory(
    "khatu-shyam",

    "Shri Khatu Shyam Ji's Sankirtan",

    "SHRI KHATU SHYAM JI's SANKIRTAN",

    [
      "1.jpg",
      "10.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg",

      "vid1.mov",
    ]
  ),


  /* ---------------- KRISHNA BHAJAN ---------------- */

  createBhawanCategory(
    "krishna-bhajan-sandhya",

    "Shri Krishna Bhajan Sandhya",

    "SHRI KRISHNA BHAJAN SANDHYA",

    [
      "1.JPG",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",

      "vid1.mp4",
    ]
  ),


  /* ---------------- SUNDERKAND ---------------- */

  createBhawanCategory(
    "sunderkand",

    "Shri Sunderkand Path",

    "SHRI SUNDERKAND PATH",

    [
      "1.JPG",

      "vid1.mp4",
      "vid2.mp4",
      "vid3.mp4",
    ]
  ),
].map((category) => ({
  ...category,

  coverImage:
    category.coverImage ||

    category.media?.find(
      (item) =>
        item.type === "image"
    )?.url ||

    category.media?.[0]?.url,
}));


/* =========================================================
   FLAT BHAWAN ARRAY
   Used by BhawanDetailPage
========================================================= */

export const BHAWANS = [

  ...MATARANI_BHAWANS,

  ...BHAWAN_CATEGORIES
    .filter(
      (category) =>
        category.id !== "matarani"
    )
    .map((category) => ({
      id:
        category.id,

      title:
        category.title,

      media:
        category.media,
    })),
];


export const getBhawanCover = (
  bhawan
) =>
  bhawan?.media?.find(
    (item) =>
      item.type === "image"
  ) ||
  bhawan?.media?.[0];


/* =========================================================
   GLIMPSES
========================================================= */

const GLIMPSES_FILES = [

  "1.JPG",
  "2.JPG",

  "vid1.mov",
  "vid2.MOV",
  "vid3.mp4",

];


export const GLIMPSES_MEDIA =
  GLIMPSES_FILES.map(
    (filename) =>
      toMedia(
        [
          "GLIMPSES",
        ],
        filename
      )
  );


/* =========================================================
   JHANKIES
========================================================= */

const JHANKI_GROUPS = [

  /* ---------------- MATARANI WITH SHER ---------------- */

  {
    category:
      "Matarani Ji with Sher",

    folder:
      "MATARANI JI WITH SHER",

    files: [
      "1.JPG",
      "2.jpg",

      "vid1.MP4",
    ],
  },


  /* ---------------- BAHUBALI HANUMAN ---------------- */

  {
    category:
      "Shri Bahubali Hanuman Ji",

    folder:
      "SHRI BAHUBALI HANUMAN JI",

    files: [
      "1.jpg",

      "vid1.MP4",
      "vid2.MP4",
    ],
  },


  /* ---------------- KAALI MATA ---------------- */

  {
    category:
      "Shri Kali Mata Ji",

    folder:
      "SHRI KAALI MATA JI",

    files: [
      "1.JPG",

      "vid1.MP4",
    ],
  },


  /* ---------------- RADHA KRISHNA MAHARAAS ---------------- */

  {
  category:
    "Shri Krishna Maharaas",

  folder:
    "SHRI RADHA-KISHNA MAHARAAS",

  files: [
    "1.jpg",
    "vid1.mov",
  ],
},


  /* ---------------- RADHA KRISHNA ---------------- */

  {
    category:
      "Shri Radha-Krishna Ji",

    folder:
      "SHRI RADHA-KRISHNA JI",

    files: [
      "1.JPG",

      "vid1.MP4",
      "vid2.MOV",
      "vid3.MOV",
      "vid4.mp4",
    ],
  },


  /* ---------------- SHIV PARVATI ---------------- */

  {
    category:
      "Shri Shiv-Parvati Ji",

    folder:
      "SHRI SHIV-PARVATI JI",

    files: [
      "1.JPG",
      "2.jpg",

      "vid1.MP4",
      "vid2.MP4",
      "vid3.MP4",
      "vid4.MP4",
    ],
  },
];


export const JHANKIES_MEDIA =
  JHANKI_GROUPS.flatMap(
    (group) =>
      group.files.map(
        (filename) =>
          toMedia(
            [
              "JHANKIES",
              group.folder,
            ],

            filename,

            {
              category:
                group.category,
            }
          )
      )
  );


export const JHANKI_CATEGORIES =
  JHANKI_GROUPS.map(
    (group) => ({
      name:
        group.category,

      coverImage:
        group.files
          .map(
            (filename) =>
              toMedia(
                [
                  "JHANKIES",
                  group.folder,
                ],
                filename
              )
          )
          .find(
            (item) =>
              item.type === "image"
          )
          ?.url,
    })
  );


/* =========================================================
   SINGERS
========================================================= */

/*
 * The folder structure exists, but there are currently
 * no singer files inside the language folders.
 */

export const SINGER_DEVOTIONS = [

  "Matarani Ji's Chowki-Jagran",

  "Shri Khatu Shyam Ji's Sankirtan",

  "Shri Krishna Bhajan Sandhya",

  "Shri Sunderkand Path",

];


export const SINGER_LANGUAGES = [

  "Haryanvi",

  "Hindi",

  "Punjabi",

];


export const SINGERS_MEDIA = [];


/* =========================================================
   TEAM OPS
========================================================= */

const TEAM_OPS_FILES = [

  "1.JPG",
  "2.JPG",
  "3.JPG",
  "4.jpg",

];


export const TEAM_OPS_PHOTOS =
  TEAM_OPS_FILES.map(
    (filename) =>
      mediaUrl(
        "TEAM OPS",
        filename
      )
  );


/* =========================================================
   GLOBAL BACKDROP
========================================================= */

export const GLOBAL_BACKDROP_PHOTOS =
  BHAWAN_CATEGORIES
    .map(
      (category) =>
        category.coverImage
    )
    .filter(Boolean)
    .slice(0, 3);
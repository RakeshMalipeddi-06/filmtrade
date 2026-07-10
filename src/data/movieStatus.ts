export type MovieStatusOverride = {
  status: string;
  releaseDate: string;
  languages: string;
};

export const movieStatusOverrides: Record<string, MovieStatusOverride> = {
  tt21438726: {
    status: "Confirmed",
    releaseDate: "7 April 2027",
    languages: "Telugu, Hindi, Tamil, Malayalam, Kannada",
  },

  tt14697030: {
    status: "Announced / expected pan-India",
    releaseDate: "11 June 2027",
    languages: "Telugu, Hindi, Tamil, Malayalam, Kannada",
  },

  tt15547882: {
    status: "Announced",
    releaseDate: "5 March 2027",
    languages: "Telugu, Hindi, Tamil, Malayalam, Kannada",
  },

  paradise: {
    status: "Confirmed",
    releaseDate: "24 September 2026",
    languages:
      "Telugu, Hindi, Tamil, Malayalam, Kannada, Bengali, English, Spanish",
  },

  toxic: {
    status: "Updated release date",
    releaseDate: "26 August 2026",
    languages: "Kannada, Hindi, Telugu, Tamil, Malayalam",
  },

  tt23865918: {
    status: "Confirmed",
    releaseDate: "4 June 2026",
    languages: "Telugu, Hindi, Tamil, Malayalam, Kannada",
  },

  "jailer-2": {
    status: "Announced",
    releaseDate: "15 October 2026",
    languages: "Tamil, Telugu, Hindi",
  },

  "og-2": {
    status: "TBA",
    releaseDate: "TBA",
    languages: "Telugu likely; other languages not announced",
  },

  "god-of-war-ntr": {
    status: "Exact movie project not confirmed",
    releaseDate: "TBA",
    languages: "TBA",
  },

  "pushpa-3": {
    status: "TBA",
    releaseDate: "TBA",
    languages: "Telugu, Hindi, Tamil, Malayalam, Kannada expected",
  },

  "kalki-2": {
    status: "Reported, not official",
    releaseDate: "TBA, reported target December 2027",
    languages: "Telugu, Hindi, Tamil, Malayalam, Kannada",
  },

  "raaka-manual": {
    status: "TBA",
    releaseDate: "TBA",
    languages: "TBA",
  },

  tt8178634: {
    status: "Released",
    releaseDate: "25 March 2022",
    languages: "Telugu, Hindi, Tamil, Malayalam, Kannada",
  },

  ramayana: {
    status: "Announced",
    releaseDate: "Diwali 2026",
    languages:
      "Hindi, Telugu, Tamil, Malayalam, Kannada, English, Japanese, Mandarin",
  },
};
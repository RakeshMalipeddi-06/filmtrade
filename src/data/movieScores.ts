export type ManualMovieScore = {
  interest: number;
  filmPulse: number;
  priority: "Very high" | "High" | "Moderate";
};

export const manualMovieScores: Record<string, ManualMovieScore> = {
  "tt21438726": {
    interest: 96,
    filmPulse: 95,
    priority: "Very high",
  },

  "tt14697030": {
    interest: 94,
    filmPulse: 93,
    priority: "Very high",
  },

  "tt15547882": {
    interest: 92,
    filmPulse: 91,
    priority: "Very high",
  },

  paradise: {
    interest: 90,
    filmPulse: 89,
    priority: "Very high",
  },

  toxic: {
    interest: 88,
    filmPulse: 87,
    priority: "High",
  },

  "og-2": {
    interest: 86,
    filmPulse: 85,
    priority: "High",
  },

  tt8178634: {
    interest: 84,
    filmPulse: 83,
    priority: "High",
  },

  tt23865918: {
    interest: 82,
    filmPulse: 81,
    priority: "High",
  },

  "raaka-manual": {
    interest: 80,
    filmPulse: 79,
    priority: "High",
  },

  "jailer-2": {
    interest: 78,
    filmPulse: 77,
    priority: "Moderate",
  },

  ramayana: {
    interest: 76,
    filmPulse: 75,
    priority: "Moderate",
  },

  "kalki-2": {
    interest: 74,
    filmPulse: 73,
    priority: "Moderate",
  },

  "god-of-war-ntr": {
    interest: 72,
    filmPulse: 71,
    priority: "Moderate",
  },
};
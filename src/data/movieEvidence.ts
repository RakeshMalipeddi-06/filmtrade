export type MovieEvidenceItem = {
  id: string;
  movieId: string;
  type: "Announcement" | "Poster" | "Glimpse" | "Trailer" | "Song" | "Article";
  title: string;
  publisher: string;
  publishedAt: string;
  url: string;
  verification: "Official" | "Verified source";
};

export const movieEvidence: Record<string, MovieEvidenceItem[]> = {
  paradise: [
    {
      id: "paradise-glimpse",
      movieId: "paradise",
      type: "Glimpse",
      title: "The Paradise Glimpse: RAW STATEMENT",
      publisher: "Official YouTube channel",
      publishedAt: "2025-03-27",
      url: "https://www.youtube.com/watch?v=NkZFnpDhdCk",
      verification: "Official",
    },
    {
      id: "paradise-project",
      movieId: "paradise",
      type: "Article",
      title: "The Paradise project record",
      publisher: "IMDb",
      publishedAt: "2025-01-01",
      url: "https://www.imdb.com/title/tt31969655/",
      verification: "Verified source",
    },
  ],

  "jailer-2": [
    {
      id: "jailer-2-announcement",
      movieId: "jailer-2",
      type: "Announcement",
      title: "Jailer 2 Announcement",
      publisher: "Official YouTube channel",
      publishedAt: "2025-01-14",
      url: "https://www.youtube.com/watch?v=PZpb_b_r5bs",
      verification: "Official",
    },
    {
      id: "jailer-2-poster",
      movieId: "jailer-2",
      type: "Poster",
      title: "Jailer 2 poster",
      publisher: "IMDb",
      publishedAt: "2025-01-14",
      url: "https://www.imdb.com/title/tt33318732/mediaviewer/rm1645250818/",
      verification: "Verified source",
    },
  ],

  toxic: [
    {
      id: "toxic-glimpse",
      movieId: "toxic",
      type: "Glimpse",
      title: "Toxic Glimpse",
      publisher: "Official YouTube channel",
      publishedAt: "2025-01-08",
      url: "https://www.youtube.com/watch?v=n8sMfqOO9c0",
      verification: "Official",
    },
    {
      id: "toxic-poster",
      movieId: "toxic",
      type: "Poster",
      title: "Toxic poster",
      publisher: "IMDb",
      publishedAt: "2025-01-01",
      url: "https://www.imdb.com/title/tt27530512/mediaviewer/rm4056535298/",
      verification: "Verified source",
    },
  ],

  ramayana: [
    {
      id: "ramayana-glimpse",
      movieId: "ramayana",
      type: "Glimpse",
      title: "Ramayana Glimpse",
      publisher: "Official YouTube channel",
      publishedAt: "2025-07-03",
      url: "https://www.youtube.com/watch?v=gzUu-FJ7s-Y",
      verification: "Official",
    },
    {
      id: "ramayana-poster",
      movieId: "ramayana",
      type: "Poster",
      title: "Ramayana poster",
      publisher: "IMDb",
      publishedAt: "2025-07-03",
      url: "https://www.imdb.com/title/tt27988879/mediaviewer/rm3321996290/",
      verification: "Verified source",
    },
  ],

  "og-2": [
    {
      id: "og-2-announcement",
      movieId: "og-2",
      type: "Announcement",
      title: "They Call Him OG 2 Announcement",
      publisher: "Official YouTube channel",
      publishedAt: "2025-12-01",
      url: "https://www.youtube.com/watch?v=zCHtn4jwn_Q",
      verification: "Official",
    },
  ],

  "raaka-manual": [
    {
      id: "raaka-announcement",
      movieId: "raaka-manual",
      type: "Announcement",
      title: "Raaka Announcement",
      publisher: "Official YouTube channel",
      publishedAt: "2026-04-08",
      url: "https://www.youtube.com/watch?v=SI_PhNII7Mc",
      verification: "Official",
    },
  ],

  "pushpa-3": [
    {
      id: "pushpa-3-song",
      movieId: "pushpa-3",
      type: "Song",
      title: "Pushpa 3 Song",
      publisher: "Official YouTube channel",
      publishedAt: "2026-01-01",
      url: "https://www.youtube.com/watch?v=wQksDYahKZs",
      verification: "Official",
    },
  ],
};
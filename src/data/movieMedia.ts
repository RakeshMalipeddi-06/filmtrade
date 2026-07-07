export type MovieMediaItem = {
  videoId: string;
  type: "Glimpse" | "Announcement" | "Trailer" | "Song";
  label: string;
  officialUrl: string;
};

export const movieMedia: Record<string, MovieMediaItem[]> = {
  tt14697030: [
    {
      videoId: "FlOzIM7Yov4",
      type: "Glimpse",
      label: "Dragon Glimpse",
      officialUrl: "https://www.youtube.com/watch?v=FlOzIM7Yov4",
    },
  ],

  tt15547882: [
    {
      videoId: "VCGVPiD4BP0",
      type: "Announcement",
      label: "Spirit Announcement",
      officialUrl: "https://www.youtube.com/watch?v=VCGVPiD4BP0",
    },
  ],

  tt21438726: [
    {
      videoId: "DMD2uthghWE",
      type: "Glimpse",
      label: "Varanasi Glimpse",
      officialUrl: "https://www.youtube.com/watch?v=DMD2uthghWE",
    },
  ],

  "raaka-manual": [
    {
      videoId: "SI_PhNII7Mc",
      type: "Announcement",
      label: "Raaka Announcement",
      officialUrl: "https://www.youtube.com/watch?v=SI_PhNII7Mc",
    },
  ],

  "jailer-2": [
    {
      videoId: "PZpb_b_r5bs",
      type: "Announcement",
      label: "Jailer 2 Announcement",
      officialUrl: "https://www.youtube.com/watch?v=PZpb_b_r5bs",
    },
  ],

  tt23865918: [
    {
      videoId: "sF2dj7ycZvA",
      type: "Trailer",
      label: "Peddi Trailer",
      officialUrl: "https://www.youtube.com/watch?v=sF2dj7ycZvA",
    },
  ],

    paradise: [
    {
      videoId: "NkZFnpDhdCk",
      type: "Glimpse",
      label: "The Paradise Glimpse: RAW STATEMENT",
      officialUrl: "https://www.youtube.com/watch?v=NkZFnpDhdCk",
    },
  ],

  tt8178634: [
    {
      videoId: "NgBoMJy386M",
      type: "Trailer",
      label: "RRR Trailer",
      officialUrl: "https://www.youtube.com/watch?v=NgBoMJy386M",
    },
  ],

  "pushpa-3": [
    {
      videoId: "wQksDYahKZs",
      type: "Song",
      label: "Pushpa 3 Song",
      officialUrl: "https://www.youtube.com/watch?v=wQksDYahKZs",
    },
  ],

  "og-2": [
    {
      videoId: "zCHtn4jwn_Q",
      type: "Announcement",
      label: "OG 2 Announcement",
      officialUrl: "https://www.youtube.com/watch?v=zCHtn4jwn_Q",
    },
  ],

  toxic: [
    {
      videoId: "n8sMfqOO9c0",
      type: "Glimpse",
      label: "Toxic Glimpse",
      officialUrl: "https://www.youtube.com/watch?v=n8sMfqOO9c0",
    },
  ],
  

  ramayana: [
    {
      videoId: "gzUu-FJ7s-Y",
      type: "Glimpse",
      label: "Ramayana Glimpse",
      officialUrl: "https://www.youtube.com/watch?v=gzUu-FJ7s-Y",
    },
  ],
};
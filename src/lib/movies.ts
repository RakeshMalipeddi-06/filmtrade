export type Movie = {
  id: string;
  title: string;
  language: string;
  genre: string;
  status: string;
  pulse: number;
  posterUrl: string;
  description: string;
};

export const movies: Movie[] = [
  {
    id: "dragon",
    title: "Dragon",
    language: "Tamil",
    genre: "Comedy Drama",
    status: "Released",
    pulse: 91,
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Dragon_2025_film_poster.jpg",
    description:
      "A coming-of-age comedy drama monitored for audience conversation and theatrical momentum.",
  },
  {
    id: "coolie",
    title: "Coolie",
    language: "Tamil",
    genre: "Action Thriller",
    status: "Upcoming",
    pulse: 88,
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/89/Coolie_2025_film_poster.jpg",
    description:
      "A large-scale action title tracked for cast reach, social conversation, and early demand.",
  },
  {
    id: "spirit",
    title: "Spirit",
    language: "Telugu",
    genre: "Action",
    status: "Announced",
    pulse: 86,
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/55/Spirit_2025_film_poster.jpg",
    description:
      "An announced action project with high early interest across Telugu cinema audiences.",
  },
  {
    id: "ramayana",
    title: "Ramayana",
    language: "Hindi",
    genre: "Epic Fantasy",
    status: "In production",
    pulse: 93,
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Ramayana_2026_film_poster.jpg",
    description:
      "A large-scale epic production tracked for long-term anticipation and franchise potential.",
  },
  {
    id: "kalki-2898-ad",
    title: "Kalki 2898 AD",
    language: "Telugu",
    genre: "Science Fiction",
    status: "Released",
    pulse: 84,
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg",
    description:
      "A science-fiction title with broad pan-India reach and sustained audience interest.",
  },
  {
    id: "pushpa-2",
    title: "Pushpa 2: The Rule",
    language: "Telugu",
    genre: "Action Drama",
    status: "Released",
    pulse: 92,
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/3/35/Pushpa_2_-_The_Rule.jpg",
    description:
      "A commercial action franchise with strong theatre demand and major audience engagement.",
  },
];
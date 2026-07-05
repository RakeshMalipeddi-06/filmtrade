export type MovieOverride = {
  imdbId: string;
  title?: string;
  released?: string;
  verifiedStatus?: "Upcoming" | "Released";
  releaseSourceName?: string;
  releaseSourceUrl?: string;
};

export const movieOverrides: MovieOverride[] = [
  {
    imdbId: "tt14697030",
    title: "Dragon",
    released: "11 Jun 2027",
    verifiedStatus: "Upcoming",
    releaseSourceName: "District",
    releaseSourceUrl: "https://www.district.in/movies/dragon-movie-tickets-MV173972",
  },
];

export function getMovieOverride(imdbId: string) {
  return movieOverrides.find((movie) => movie.imdbId === imdbId);
}
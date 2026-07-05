export type RealTeluguMovie = {
  imdbId: string;
  title: string;
  year: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  actors: string;
  plot: string;
  posterUrl: string | null;
  imdbRating: string;
  imdbVotes: string;
  language: string;
  source: "OMDb / IMDb";
};

const OMDB_BASE_URL = "https://www.omdbapi.com";

function getApiKey() {
  const key = process.env.OMDB_API_KEY;

  if (!key || key === "PASTE_YOUR_OMDB_KEY_HERE") {
    throw new Error("OMDB_API_KEY is missing. Add your OMDb API key to .env.local.");
  }

  return key;
}

export async function getMovieByImdbId(imdbId: string): Promise<RealTeluguMovie | null> {
  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set("apikey", getApiKey());
  url.searchParams.set("i", imdbId);
  url.searchParams.set("plot", "short");

  const response = await fetch(url.toString(), {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`OMDb request failed with status ${response.status}.`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    return null;
  }

  return {
    imdbId: data.imdbID,
    title: data.Title,
    year: data.Year,
    released: data.Released,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    actors: data.Actors,
    plot: data.Plot,
    posterUrl: data.Poster && data.Poster !== "N/A" ? data.Poster : null,
    imdbRating: data.imdbRating,
    imdbVotes: data.imdbVotes,
    language: data.Language,
    source: "OMDb / IMDb",
  };
}
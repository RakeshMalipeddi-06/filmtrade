import { NextResponse } from "next/server";
import { getMovieByImdbId } from "@/lib/omdb";
import { verifiedUpcomingMovies } from "@/data/verifiedUpcomingMovies";
import { getMovieOverride } from "@/data/movieOverrides";

const FEATURED_INDIAN_MOVIE_IDS = [
  "tt14697030",
  "tt15547882",
  "tt21438726",
  "tt23865918",
  "tt8178634",
  "tt31969655",
  "tt32012903",
];

export async function GET() {
  try {
    const results = await Promise.all(
      FEATURED_INDIAN_MOVIE_IDS.map((imdbId) => getMovieByImdbId(imdbId)),
    );

    const liveMovies = results
      .filter((movie) => movie !== null)
      .map((movie) => {
        const override = getMovieOverride(movie.imdbId);

        return {
          ...movie,
          title: override?.title || movie.title,
          released: override?.released || movie.released,
          verifiedStatus: override?.verifiedStatus || null,
          releaseSourceName: override?.releaseSourceName || null,
          releaseSourceUrl: override?.releaseSourceUrl || null,
        };
      });

    return NextResponse.json({
      source: "OMDb / IMDb + verified upcoming records",
      catalogType: "Curated pan-India movie demo catalog",
      fetchedAt: new Date().toISOString(),
      liveMovies,
      verifiedUpcomingMovies,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load movies.";

    return NextResponse.json(
      {
        error: message,
        hint: "Check OMDB_API_KEY in .env.local. Do not use NEXT_PUBLIC_ for this key.",
      },
      { status: 500 },
    );
  }
}
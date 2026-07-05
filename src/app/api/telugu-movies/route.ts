import { NextResponse } from "next/server";
import { getMovieByImdbId } from "@/lib/omdb";

const TELUGU_MOVIE_IDS = [
  "tt14697030", // Dragon — Jr NTR, Prashanth Neel
  "tt15547882", // Spirit — Prabhas, Sandeep Reddy Vanga
  "tt21438726", // Varanasi — Mahesh Babu, S. S. Rajamouli
  "tt40184910", // Kalki 2898 AD Part 2 / Kalki 2
  "tt23865918", // Peddi — Ram Charan
  "tt8178634",  // RRR — Telugu, released
];

export async function GET() {
  try {
    const results = await Promise.all(
      TELUGU_MOVIE_IDS.map((imdbId) => getMovieByImdbId(imdbId)),
    );

    const movies = results.filter((movie) => movie !== null);

    return NextResponse.json({
      source: "OMDb / IMDb",
      catalogType: "Curated Telugu movie demo catalog",
      updatedAt: new Date().toISOString(),
      movies,
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
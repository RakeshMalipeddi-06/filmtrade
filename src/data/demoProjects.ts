export type DemoProject = {
  title: string;
  genre: string;
  status: string;
  description: string;
  accent: string;
  artwork: string;
};

export const demoProjects: DemoProject[] = [
  {
    title: "After the Monsoon",
    genre: "Drama · Coming of age",
    status: "Demo simulation",
    description: "A quiet story about a hometown, a difficult return, and one unfinished promise.",
    accent: "from-sky-400 to-blue-700",
    artwork: "MONSOON",
  },
  {
    title: "Orbit 47",
    genre: "Science fiction · Thriller",
    status: "Demo simulation",
    description: "A stranded crew receives a signal that should not exist beyond Earth.",
    accent: "from-indigo-500 to-slate-950",
    artwork: "ORBIT",
  },
  {
    title: "The Last Frame",
    genre: "Mystery · Drama",
    status: "Demo simulation",
    description: "An archivist finds a missing reel that changes a celebrated director's final film.",
    accent: "from-amber-400 to-rose-700",
    artwork: "FRAME",
  },
];
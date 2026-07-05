export type DemoProject = {
  slug: string;
  title: string;
  genre: string;
  stage: string;
  pulse: number;
  momentum: string;
  trust: string;
  risk: string;
  description: string;
  artwork: string;
  poster: string;
  glow: string;
  shape: string;
};

export const demoProjects: DemoProject[] = [
  {
    slug: "after-the-monsoon",
    title: "After the Monsoon",
    genre: "Drama",
    stage: "Development",
    pulse: 91,
    momentum: "Strong",
    trust: "Illustrative: High",
    risk: "Illustrative: Low",
    description: "A quiet story about a hometown, a difficult return, and one unfinished promise.",
    artwork: "MONSOON",
    poster: "from-[#4cc7f5] via-[#1679c9] to-[#12345b]",
    glow: "bg-white/20",
    shape: "rounded-full border-[18px] border-white/20",
  },
  {
    slug: "orbit-47",
    title: "Orbit 47",
    genre: "Science fiction",
    stage: "Pre-production",
    pulse: 86,
    momentum: "Rising",
    trust: "Illustrative: Strong",
    risk: "Illustrative: Medium",
    description: "A stranded crew receives a signal that should not exist beyond Earth.",
    artwork: "ORBIT",
    poster: "from-[#7469ee] via-[#33398f] to-[#101735]",
    glow: "bg-indigo-200/25",
    shape: "rounded-full border-[14px] border-indigo-100/25",
  },
  {
    slug: "the-last-frame",
    title: "The Last Frame",
    genre: "Mystery",
    stage: "Production",
    pulse: 82,
    momentum: "Steady",
    trust: "Illustrative: High",
    risk: "Illustrative: Low",
    description: "An archivist finds a missing reel that changes a celebrated director's final film.",
    artwork: "FRAME",
    poster: "from-[#ffc73d] via-[#e55e2f] to-[#7b2038]",
    glow: "bg-amber-100/25",
    shape: "rotate-12 border-[16px] border-amber-100/25",
  },
  {
    slug: "paper-skies",
    title: "Paper Skies",
    genre: "Drama",
    stage: "Development",
    pulse: 79,
    momentum: "Watching",
    trust: "Illustrative: Clear",
    risk: "Illustrative: Medium",
    description: "A young illustrator turns a family archive into a story about memory and belonging.",
    artwork: "SKIES",
    poster: "from-[#31d3dc] via-[#129ca8] to-[#07546e]",
    glow: "bg-cyan-100/25",
    shape: "rounded-t-full border-[15px] border-cyan-100/25",
  },
  {
    slug: "night-shift",
    title: "Night Shift",
    genre: "Thriller",
    stage: "Pre-production",
    pulse: 75,
    momentum: "Emerging",
    trust: "Illustrative: Strong",
    risk: "Illustrative: Medium",
    description: "One overnight shift at a remote station becomes a test of loyalty and survival.",
    artwork: "NIGHT",
    poster: "from-[#283a63] via-[#16213e] to-[#080c1a]",
    glow: "bg-blue-100/15",
    shape: "rounded-full border-[12px] border-blue-100/20",
  },
  {
    slug: "golden-hour",
    title: "Golden Hour",
    genre: "Romance",
    stage: "Production",
    pulse: 73,
    momentum: "Watching",
    trust: "Illustrative: Clear",
    risk: "Illustrative: Low",
    description: "Two photographers revisit the city where they first learned to see each other.",
    artwork: "GOLDEN",
    poster: "from-[#ffd56a] via-[#f09a4a] to-[#a8493f]",
    glow: "bg-yellow-100/25",
    shape: "rotate-45 border-[15px] border-yellow-100/25",
  },
];
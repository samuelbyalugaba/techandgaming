export type Game = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  genre: 'Sci-Fi' | 'Cyberpunk' | 'Fantasy' | 'Strategy';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  tags: string[];
  trailerUrl: string;
  screenshots: { id: string, url: string; alt: string, hint: string }[];
  mechanics: string[];
  subdomain: string;
  coverImage: { id: string, url: string; alt: string, hint: string };
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string; // Markdown content
  thumbnail: { id: string, url: string; alt: string, hint: string };
};

export type LeaderboardEntry = {
  rank: number;
  player: string;
  score: number;
  avatar: string;
};

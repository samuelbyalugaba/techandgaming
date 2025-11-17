import type { Game, Post, LeaderboardEntry } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  if (!img) {
    return { id, url: `https://picsum.photos/seed/${id}/600/400`, alt: "Placeholder", hint: "placeholder image" };
  }
  return { id, url: img.imageUrl, alt: img.description, hint: img.imageHint };
}

export const games: Game[] = [
  {
    id: 'cosmic-rift',
    title: 'Cosmic Rift',
    description: 'An epic sci-fi adventure across galaxies.',
    longDescription: 'Cosmic Rift is a sprawling open-world space exploration game. Pilot your own starship, trade with alien species, and engage in thrilling dogfights. Uncover the secrets of an ancient civilization and shape the future of the galaxy.',
    genre: 'Sci-Fi',
    difficulty: 'Medium',
    tags: ['Space Sim', 'Open World', 'Exploration'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      { id: 'ss1', url: findImage('game-screenshot-1').url, alt: 'A spaceship flying through a nebula', hint: findImage('game-screenshot-1').hint },
      { id: 'ss2', url: 'https://picsum.photos/seed/211/1280/720', alt: 'The cockpit view of a starship', hint: 'starship cockpit' },
    ],
    mechanics: ['Dynamic trading system', 'Customizable starships', 'Real-time space combat'],
    subdomain: 'cosmic-rift',
    coverImage: { id: 'cover1', url: findImage('game-cover-1').url, alt: findImage('game-cover-1').alt, hint: findImage('game-cover-1').hint },
  },
  {
    id: 'cyberflow',
    title: 'Cyberflow',
    description: 'Hack the system in a neon-drenched metropolis.',
    longDescription: 'In the dystopian city of Neo-Kyoto, you are a master hacker known as a Cyberflow. Use your skills to infiltrate corporate servers, expose government conspiracies, and upgrade your cybernetic implants. Stay one step ahead of the corporate enforcers in this fast-paced action RPG.',
    genre: 'Cyberpunk',
    difficulty: 'Hard',
    tags: ['Action RPG', 'Stealth', 'Dystopian'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      { id: 'ss3', url: findImage('game-screenshot-2').url, alt: 'A character running on a rooftop in a neon city', hint: findImage('game-screenshot-2').hint },
      { id: 'ss4', url: 'https://picsum.photos/seed/212/1280/720', alt: 'A futuristic user interface for hacking', hint: 'futuristic interface' },
    ],
    mechanics: ['Deep skill tree', 'Multiple dialogue options', 'Stealth and combat approaches'],
    subdomain: 'cyberflow',
    coverImage: { id: 'cover2', url: findImage('game-cover-2').url, alt: findImage('game-cover-2').alt, hint: findImage('game-cover-2').hint },
  },
  {
    id: 'rune-weavers',
    title: 'Rune Weavers',
    description: 'Master ancient magic and defend the realm.',
    longDescription: 'The world of Eldoria is threatened by a creeping darkness. As a Rune Weaver, you must harness the power of ancient runes to cast powerful spells and summon mythical creatures. Team up with friends in this cooperative fantasy adventure to restore balance to the realm.',
    genre: 'Fantasy',
    difficulty: 'Easy',
    tags: ['Co-op', 'Magic', 'Adventure'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      { id: 'ss5', url: findImage('game-screenshot-3').url, alt: 'A wizard casting a powerful fire spell', hint: findImage('game-screenshot-3').hint },
      { id: 'ss6', url: 'https://picsum.photos/seed/213/1280/720', alt: 'A group of adventurers facing a large dragon', hint: 'adventurers dragon' },
    ],
    mechanics: ['Elemental magic system', 'Cooperative puzzle solving', 'Epic boss battles'],
    subdomain: 'rune-weavers',
    coverImage: { id: 'cover3', url: findImage('game-cover-3').url, alt: findImage('game-cover-3').alt, hint: findImage('game-cover-3').hint },
  },
  {
    id: 'mech-warriors',
    title: 'Mech Warriors',
    description: 'Pilot giant mechs in strategic turn-based combat.',
    longDescription: 'In the 31st century, warfare is dominated by giant robotic machines called Mechs. As a commander, you will lead your squad of Mech Warriors into intense turn-based battles. Customize your mechs with a vast array of weapons and equipment to outsmart your opponents on the battlefield.',
    genre: 'Strategy',
    difficulty: 'Expert',
    tags: ['Turn-Based', 'Sci-Fi', 'Tactical'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    screenshots: [
      { id: 'ss7', url: 'https://picsum.photos/seed/214/1280/720', alt: 'A giant robot firing missiles', hint: 'robot missiles' },
      { id: 'ss8', url: 'https://picsum.photos/seed/215/1280/720', alt: 'A tactical grid view of a battlefield', hint: 'tactical grid' },
    ],
    mechanics: ['Deep mech customization', 'Turn-based tactical combat', 'Campaign with branching storyline'],
    subdomain: 'mech-warriors',
    coverImage: { id: 'cover4', url: findImage('game-cover-4').url, alt: findImage('game-cover-4').alt, hint: findImage('game-cover-4').hint },
  },
];

export const posts: Post[] = [
  {
    id: '1',
    slug: 'new-era-of-gaming',
    title: 'The New Era of Cloud Gaming',
    author: 'Admin',
    date: '2024-07-20',
    summary: 'Cloud gaming is revolutionizing how we play. No more downloads, no more powerful hardware. Just click and play.',
    content: `
# The New Era of Cloud Gaming

Cloud gaming is no longer a futuristic dream; it's here, and it's changing the landscape of the video game industry. Services like Google Stadia, NVIDIA GeForce Now, and Xbox Cloud Gaming are leading the charge, offering players the ability to stream high-fidelity games directly to their devices.

## The Core Technology

At its heart, cloud gaming works by running games on powerful remote servers in data centers. The video and audio output is then compressed and streamed to the player's device over the internet. The player's inputs are sent back to the server, creating a seamless, interactive experience.

### Key Benefits:
- **Accessibility:** Play AAA titles on low-end PCs, Macs, smartphones, and smart TVs.
- **Convenience:** No need to wait for lengthy downloads or patches. Games are always up to date.
- **Cost-Effective:** Reduces the need for expensive gaming hardware and regular upgrades.

The future is bright, and it's in the cloud.
    `,
    thumbnail: { id: 'thumb1', url: findImage('blog-thumb-1').url, alt: findImage('blog-thumb-1').alt, hint: findImage('blog-thumb-1').hint },
  },
  {
    id: '2',
    slug: 'rise-of-esports',
    title: 'The Meteoric Rise of eSports',
    author: 'Admin',
    date: '2024-07-15',
    summary: 'From niche competitions to sold-out arenas, eSports has become a global phenomenon. What\'s next for competitive gaming?',
    content: `
# The Meteoric Rise of eSports

What was once a hobby for a small group of enthusiasts has exploded into a billion-dollar industry. eSports, or competitive video gaming, now boasts professional leagues, multi-million dollar prize pools, and a global audience that rivals traditional sports.

## The Major Players

Games like *League of Legends*, *Dota 2*, *Counter-Strike: Global Offensive*, and *Valorant* dominate the scene, each with its own dedicated player base and professional circuit. Tournaments like The International for Dota 2 and the League of Legends World Championship draw tens of millions of viewers online.

### Why the sudden growth?
- **Streaming Platforms:** Twitch and YouTube Gaming have made it easy for fans to watch their favorite players and tournaments.
- **Developer Support:** Game developers are investing heavily in creating and sustaining competitive ecosystems around their games.
- **Mainstream Recognition:** Major brands and even traditional sports organizations are investing in eSports teams and sponsorships.

eSports is not just a trend; it's a legitimate sport with a long and exciting future ahead.
    `,
    thumbnail: { id: 'thumb2', url: findImage('blog-thumb-2').url, alt: findImage('blog-thumb-2').alt, hint: findImage('blog-thumb-2').hint },
  },
];


export const leaderboardData: Record<string, LeaderboardEntry[]> = {
  'cosmic-rift': [
    { rank: 1, player: 'NovaPilot', score: 1_250_400, avatar: 'https://i.pravatar.cc/40?u=NovaPilot' },
    { rank: 2, player: 'GalaxyDrifter', score: 1_100_200, avatar: 'https://i.pravatar.cc/40?u=GalaxyDrifter' },
    { rank: 3, player: 'StarSurfer', score: 980_500, avatar: 'https://i.pravatar.cc/40?u=StarSurfer' },
    { rank: 4, player: 'CometChaser', score: 950_000, avatar: 'https://i.pravatar.cc/40?u=CometChaser' },
    { rank: 5, player: 'VoidWalker', score: 890_750, avatar: 'https://i.pravatar.cc/40?u=VoidWalker' },
  ],
  'cyberflow': [
    { rank: 1, player: 'ZeroCool', score: 999_999, avatar: 'https://i.pravatar.cc/40?u=ZeroCool' },
    { rank: 2, player: 'AcidBurn', score: 987_654, avatar: 'https://i.pravatar.cc/40?u=AcidBurn' },
    { rank: 3, player: 'Glitch', score: 950_000, avatar: 'https://i.pravatar.cc/40?u=Glitch' },
    { rank: 4, player: 'ShadowNet', score: 920_110, avatar: 'https://i.pravatar.cc/40?u=ShadowNet' },
    { rank: 5, player: 'DataGhost', score: 880_404, avatar: 'https://i.pravatar.cc/40?u=DataGhost' },
  ],
  // Add other games if they have leaderboards
};

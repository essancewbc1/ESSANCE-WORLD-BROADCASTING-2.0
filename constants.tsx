
import { Show, Track } from './types';

export const SHOWS: Show[] = [
  {
    id: '1',
    title: 'Morning Momentum',
    dj: 'DJ Spark',
    description: 'High-energy tracks to kickstart your workday with the best in synthwave and retro-pop.',
    time: '08:00 AM - 10:00 AM',
    image: 'https://picsum.photos/seed/show1/600/400',
    genre: ['Synthwave', 'Pop']
  },
  {
    id: '2',
    title: 'The Underground Hour',
    dj: 'Techno Tess',
    description: 'Deep cuts from the global underground electronic scene. Minimal techno, house, and beyond.',
    time: '12:00 PM - 02:00 PM',
    image: 'https://picsum.photos/seed/show2/600/400',
    genre: ['Techno', 'House']
  },
  {
    id: '3',
    title: 'Chill Horizon',
    dj: 'Lofi Luna',
    description: 'Perfect background vibes for study, work, or relaxation. Pure instrumental bliss.',
    time: '04:00 PM - 06:00 PM',
    image: 'https://picsum.photos/seed/show3/600/400',
    genre: ['Lofi', 'Ambient']
  },
  {
    id: '4',
    title: 'Neon Nights',
    dj: 'Nightcrawler',
    description: 'The darker side of electronic music. Darksynth, industrial, and heavy bass.',
    time: '09:00 PM - 11:00 PM',
    image: 'https://picsum.photos/seed/show4/600/400',
    genre: ['Cyberpunk', 'Bass']
  }
];

export const CURRENT_TRACK: Track = {
  title: "Midnight City (Neon Remix)",
  artist: "M83 & The Midnight",
  albumArt: "https://picsum.photos/seed/album1/400/400",
  duration: 245
};

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Shows', path: '/shows' },
  { name: 'About', path: '/about' }
];

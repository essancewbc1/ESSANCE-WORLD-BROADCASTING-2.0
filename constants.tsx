
import { Show, Track, Product } from './types';

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

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'NovaWave "Ether" Hoodie',
    price: 65,
    description: 'Ultra-heavyweight 450GSM cotton hoodie with reflective holographic branding.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    category: 'Apparel',
    inStock: true
  },
  {
    id: 'p2',
    name: 'Midnight City Vinyl (Limited Edition)',
    price: 35,
    description: 'Dual-gatefold 180g transparent indigo vinyl featuring exclusive station remixes.',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800',
    category: 'Audio',
    inStock: true
  },
  {
    id: 'p3',
    name: 'Cyberpunk Keycap Set',
    price: 45,
    description: 'PBT sub-dye keycaps in NovaWave signature palette. Compatible with MX switches.',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    inStock: true
  },
  {
    id: 'p4',
    name: 'Studio Monitor Iso-Pads',
    price: 25,
    description: 'High-density acoustic foam isolation pads for technical precision.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    category: 'Audio',
    inStock: true
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
  { name: 'Store', path: '/store' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

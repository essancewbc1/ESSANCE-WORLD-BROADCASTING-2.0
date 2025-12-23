
export interface Show {
  id: string;
  title: string;
  dj: string;
  description: string;
  time: string;
  image: string;
  genre: string[];
}

export interface Track {
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Apparel' | 'Audio' | 'Lifestyle';
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface HomeConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroBg: string;
}

export interface AboutConfig {
  title: string;
  visionTitle: string;
  description1: string;
  description2: string;
  stats: {
    ops: string;
    residencies: string;
    soundscapes: string;
  };
}

export interface ContactConfig {
  email: string;
  phone: string;
  address: string;
  twitter: string;
  instagram: string;
  discord: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum Page {
  Home = 'home',
  Schedule = 'schedule',
  Shows = 'shows',
  About = 'about',
  Contact = 'contact',
  Store = 'store'
}

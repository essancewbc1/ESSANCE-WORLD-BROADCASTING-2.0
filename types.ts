
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

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum Page {
  Home = 'home',
  Schedule = 'schedule',
  Shows = 'shows',
  About = 'about'
}

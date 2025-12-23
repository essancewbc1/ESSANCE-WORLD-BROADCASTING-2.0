
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Show, Track, HomeConfig, AboutConfig, ContactConfig, Product, CartItem } from './types';
import { SHOWS as INITIAL_SHOWS, CURRENT_TRACK as INITIAL_TRACK, PRODUCTS as INITIAL_PRODUCTS } from './constants';

const INITIAL_HOME: HomeConfig = {
  heroTitle: 'Feel the Wave.',
  heroSubtitle: 'Experience curated sounds from the future of electronic music. No ads, just pure audio excellence.',
  heroBg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1920'
};

const INITIAL_ABOUT: AboutConfig = {
  title: 'Beyond the Airwaves',
  visionTitle: "NovaWave isn't just a radio station; it's a digital architecture for sound.",
  description1: 'Founded in 2024, NovaWave was built on the principle that music discovery should be cinematic. We curate the sounds of tomorrow, focusing on atmosphere, rhythm, and technical perfection.',
  description2: 'Our broadcasts are strictly high-fidelity, streaming at 320kbps to ensure that every layer of production reaches your ears exactly as the artist intended.',
  stats: {
    ops: '24/7',
    residencies: '12+',
    soundscapes: '∞'
  }
};

const INITIAL_CONTACT: ContactConfig = {
  email: 'studio@novawave.fm',
  phone: '+1 (555) NOVA-WAV',
  address: 'Level 82, Crystal Spire, Neo-Tokyo',
  twitter: 'novawave_radio',
  instagram: 'novawave.fm',
  discord: 'novawave-community'
};

interface AppContextType {
  shows: Show[];
  currentTrack: Track;
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
  homeConfig: HomeConfig;
  aboutConfig: AboutConfig;
  contactConfig: ContactConfig;
  isSyncing: boolean;
  isMaintenanceMode: boolean;
  updateShows: (newShows: Show[]) => void;
  updateCurrentTrack: (newTrack: Track) => void;
  updateProducts: (newProducts: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  updateHomeConfig: (config: HomeConfig) => void;
  updateAboutConfig: (config: AboutConfig) => void;
  updateContactConfig: (config: ContactConfig) => void;
  setIsSyncing: (syncing: boolean) => void;
  setIsMaintenanceMode: (mode: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>(() => {
    const saved = localStorage.getItem('novawave_shows');
    return saved ? JSON.parse(saved) : INITIAL_SHOWS;
  });

  const [currentTrack, setCurrentTrack] = useState<Track>(() => {
    const saved = localStorage.getItem('novawave_track');
    return saved ? JSON.parse(saved) : INITIAL_TRACK;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('novawave_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [homeConfig, setHomeConfig] = useState<HomeConfig>(() => {
    const saved = localStorage.getItem('novawave_home');
    return saved ? JSON.parse(saved) : INITIAL_HOME;
  });

  const [aboutConfig, setAboutConfig] = useState<AboutConfig>(() => {
    const saved = localStorage.getItem('novawave_about');
    return saved ? JSON.parse(saved) : INITIAL_ABOUT;
  });

  const [contactConfig, setContactConfig] = useState<ContactConfig>(() => {
    const saved = localStorage.getItem('novawave_contact');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(() => {
    const saved = localStorage.getItem('novawave_maintenance');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('novawave_shows', JSON.stringify(shows));
  }, [shows]);

  useEffect(() => {
    localStorage.setItem('novawave_track', JSON.stringify(currentTrack));
  }, [currentTrack]);

  useEffect(() => {
    localStorage.setItem('novawave_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('novawave_home', JSON.stringify(homeConfig));
  }, [homeConfig]);

  useEffect(() => {
    localStorage.setItem('novawave_about', JSON.stringify(aboutConfig));
  }, [aboutConfig]);

  useEffect(() => {
    localStorage.setItem('novawave_contact', JSON.stringify(contactConfig));
  }, [contactConfig]);

  useEffect(() => {
    localStorage.setItem('novawave_maintenance', String(isMaintenanceMode));
  }, [isMaintenanceMode]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const updateShows = (newShows: Show[]) => setShows(newShows);
  const updateCurrentTrack = (newTrack: Track) => setCurrentTrack(newTrack);
  const updateProducts = (newProducts: Product[]) => setProducts(newProducts);
  const updateHomeConfig = (config: HomeConfig) => setHomeConfig(config);
  const updateAboutConfig = (config: AboutConfig) => setAboutConfig(config);
  const updateContactConfig = (config: ContactConfig) => setContactConfig(config);

  return (
    <AppContext.Provider value={{ 
      shows, 
      currentTrack, 
      products,
      cart,
      isCartOpen,
      homeConfig,
      aboutConfig, 
      contactConfig,
      isSyncing,
      isMaintenanceMode,
      updateShows, 
      updateCurrentTrack,
      updateProducts,
      addToCart,
      removeFromCart,
      clearCart,
      setIsCartOpen,
      updateHomeConfig,
      updateAboutConfig,
      updateContactConfig,
      setIsSyncing,
      setIsMaintenanceMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

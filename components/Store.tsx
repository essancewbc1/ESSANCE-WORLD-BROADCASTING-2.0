
import React from 'react';
import { useAppContext } from '../AppContext';

const Store: React.FC = () => {
  const { products, cart, addToCart, setIsCartOpen } = useAppContext();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fadeIn">
      {/* Store Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h1 className="text-5xl md:text-6xl font-outfit font-extrabold text-white mb-4">The Terminal</h1>
          <p className="text-xl text-slate-400 max-w-lg">Exclusive attire and audio artifacts from the digital frontier.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 glass px-6 py-3 rounded-2xl hover:bg-white/5 transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-white font-bold">Cart (${total})</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(product => (
          <div key={product.id} className="group relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden glass border border-white/5 mb-6 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="px-3 py-1 bg-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                  {product.category}
                </span>
                <span className="text-2xl font-outfit font-black text-white">${product.price}</span>
              </div>
            </div>
            <div className="px-2">
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
              <button 
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all ${product.inStock ? 'bg-white text-slate-900 hover:bg-indigo-600 hover:text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              >
                {product.inStock ? 'Inject to Cart' : 'Signal Lost (OOS)'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;

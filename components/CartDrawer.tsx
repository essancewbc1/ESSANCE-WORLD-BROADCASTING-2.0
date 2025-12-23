
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, clearCart } = useAppContext();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (checkoutStep === 'cart') setCheckoutStep('shipping');
    else if (checkoutStep === 'shipping') setCheckoutStep('payment');
    else if (checkoutStep === 'payment') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCheckoutStep('success');
        clearCart();
      }, 3000);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }} />
      <div className="relative w-full max-w-xl bg-slate-900 border-l border-white/10 h-full flex flex-col animate-slideInRight shadow-2xl">
        {/* Drawer Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-outfit font-extrabold text-white">Cart Inventory</h2>
          <button onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }} className="text-slate-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="px-8 py-4 bg-slate-800/50 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest overflow-x-auto no-scrollbar">
          <span className={checkoutStep === 'cart' ? 'text-indigo-400' : 'text-slate-600'}>01 Review</span>
          <span className="text-slate-700">/</span>
          <span className={checkoutStep === 'shipping' ? 'text-indigo-400' : 'text-slate-600'}>02 Transit</span>
          <span className="text-slate-700">/</span>
          <span className={checkoutStep === 'payment' ? 'text-indigo-400' : 'text-slate-600'}>03 Crypto-Pay</span>
        </div>

        {/* Cart Content */}
        <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slate-500 italic mb-8">Cart is empty. Signal strength low.</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-indigo-400 font-bold hover:underline">Return to Broadcast</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/5">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-white font-bold truncate">{item.name}</h4>
                      <p className="text-slate-500 text-xs">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))
              )}
            </>
          )}

          {checkoutStep === 'shipping' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-white font-bold">Transit Destination</h3>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
                <input placeholder="Last Name" className="bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
              </div>
              <input placeholder="Shipping Address" className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
              <div className="grid grid-cols-3 gap-4">
                <input placeholder="City" className="bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
                <input placeholder="State" className="bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
                <input placeholder="Zip" className="bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
              </div>
            </div>
          )}

          {checkoutStep === 'payment' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 glass border-indigo-500/30 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-bold">Digital Payment Terminal</h3>
                  <div className="flex gap-2">
                     <div className="w-8 h-5 bg-white/10 rounded"></div>
                     <div className="w-8 h-5 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                     <button className="flex-grow py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2">Pay</button>
                     <button className="flex-grow py-3 bg-[#4285F4] text-white rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2">Pay</button>
                  </div>
                  <input placeholder="Card Number" className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="MM/YY" className="bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
                    <input placeholder="CVC" className="bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none" />
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-slate-600 leading-relaxed italic">
                Station Policy: We do not accept cash, checks, or money orders. All transmissions are digitally secured.
              </div>
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="text-center py-20 animate-fadeIn">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-outfit font-extrabold text-white mb-4">Broadcast Success</h3>
              <p className="text-slate-500 mb-12">Your order has been logged into the ledger.</p>
              <button onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all">Close Terminal</button>
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {checkoutStep !== 'success' && (
          <div className="p-8 border-t border-white/5 bg-slate-950/50">
            <div className="flex justify-between items-center mb-8">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Signal Total</span>
              <span className="text-3xl font-outfit font-black text-white">${total}</span>
            </div>
            <button 
              disabled={cart.length === 0 || isProcessing}
              onClick={handleCheckout}
              className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl disabled:opacity-50"
            >
              {isProcessing ? 'Encrypting...' : checkoutStep === 'cart' ? 'Initiate Transit' : checkoutStep === 'shipping' ? 'Secure Payment' : 'Confirm Broadcast'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

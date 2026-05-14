import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
  // Much darker, textured base to remove the "white space" feel
  container: "min-h-screen bg-[#CBD5D1] text-slate-800 font-sans overflow-hidden flex flex-col items-center justify-center p-6 relative",
  card: "bg-white/80 backdrop-blur-3xl border border-white/50 rounded-[3rem] p-12 shadow-[0_30px_100px_rgba(0,0,0,0.1)]",
  input: "w-full bg-white/50 p-5 rounded-2xl border-2 border-slate-200 outline-none focus:border-emerald-600 transition-all text-slate-800 mb-2 font-medium placeholder:text-slate-400",
  goldBtn: "w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8B2E] hover:brightness-110 active:scale-95 text-white font-black py-5 px-12 rounded-2xl transition-all shadow-2xl shadow-amber-900/20 uppercase tracking-[0.2em] text-xs mt-4 cursor-pointer"
};

export default function PitchGlide() {
  const [step, setStep] = useState('editor'); 
  const [plan, setPlan] = useState('free');
  const [productData, setProductData] = useState({ name: "", desc: "" });
  const [error, setError] = useState("");
  
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const phrases = ["Launch your brand.", "Hook influencers.", "Close more deals."];

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  const handleGenerate = () => {
    if(!productData.name.trim()) return setError("Please enter your product name.");
    if(!productData.desc.trim()) return setError("A short description is required.");
    setError("");
    setStep('success');
  };

  return (
    <div className={styles.container}>
      
      {/* BACKGROUND DEPTH (Fixes the "White Space" issue) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-200/50 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [100, -100, 100], y: [50, -50, 50], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-amber-200/40 rounded-full blur-[120px]" 
        />
      </div>

      {/* HEADER */}
      <nav className="absolute top-12 left-12 flex items-center gap-4 z-50">
        <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl">
          <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        <span className="font-black text-3xl tracking-tighter text-slate-900">PitchGlide</span>
      </nav>

      <main className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
        
        {/* IMAGE STAGE */}
        <div className="relative flex items-center justify-center">
          {/* Animated Orbiting Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] border-2 border-dashed border-white/40 rounded-full" 
          />
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-[380px] h-[380px] rounded-full overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.2)] border-[12px] border-white z-20"
          >
             <motion.img 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=800" 
              className="w-full h-full object-cover" 
             />
          </motion.div>
          
          <div className="absolute top-10 left-0 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl text-xs font-bold z-30">✨ 3D RENDERED</div>
          <div className="absolute bottom-10 right-0 bg-white text-slate-900 px-6 py-3 rounded-2xl shadow-2xl text-xs font-bold z-30">🚀 FAST DEPLOY</div>
        </div>

        {/* INTERFACE */}
        <AnimatePresence mode="wait">
          {step === 'editor' ? (
            <motion.div key="editor" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className={styles.card}>
              <h1 className="text-5xl font-black mb-8 leading-tight text-slate-900">
                The tool to <br/>
                <span className="text-emerald-600 underline decoration-amber-400 decoration-4 underline-offset-8">
                  {phrases[index].substring(0, subIndex)}
                </span>
              </h1>
              
              <div className="flex gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-2xl">
                <button onClick={() => setPlan('free')} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${plan === 'free' ? 'bg-white shadow-lg text-emerald-600' : 'text-slate-500'}`}>FREE VERSION</button>
                <button onClick={() => setPlan('pro')} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${plan === 'pro' ? 'bg-white shadow-lg text-amber-600' : 'text-slate-500'}`}>PRO ($5)</button>
              </div>

              {error && <p className="text-red-500 text-[11px] font-bold mb-4 flex items-center gap-2"><span>×</span> {error}</p>}

              <input type="text" placeholder="Product Name" className={styles.input} onChange={(e) => setProductData({...productData, name: e.target.value})} />
              <textarea placeholder="Describe your product's main benefit..." className={`${styles.input} h-32 resize-none`} onChange={(e) => setProductData({...productData, desc: e.target.value})} />
              <button onClick={handleGenerate} className={styles.goldBtn}>Build My Pitch</button>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.card}>
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-2xl rotate-3">✓</div>
                <h2 className="text-4xl font-black mb-2 tracking-tighter">SUCCESS!</h2>
                <p className="text-slate-500 font-medium mb-10">Your unique pitch link is ready for influencers.</p>
                
                <div className="bg-slate-900 text-emerald-400 p-6 rounded-2xl mb-8 font-mono text-xs break-all border-b-4 border-emerald-500 shadow-inner">
                  pitchglide.io/v/{productData.name.toLowerCase().replace(/\s+/g, '-')}
                </div>

                <div className="space-y-4">
                  <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-2xl">Copy Link & Preview</button>
                  <button onClick={() => setStep('editor')} className="text-slate-600 text-[11px] font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-slate-400 transition-all">Go Back & Edit</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* REFINED FOOTER */}
      <footer className="absolute bottom-10 w-full max-w-7xl flex justify-between items-center px-12 text-[11px] font-black text-slate-800 uppercase tracking-[0.3em] opacity-80">
        <div className="flex gap-10">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">Legal</span>
        </div>
        <span>© 2026 PitchGlide System</span>
        <div className="flex gap-10">
          <span className="hover:text-amber-600 cursor-pointer transition-colors">Contact</span>
          <span className="hover:text-amber-600 cursor-pointer transition-colors">Support</span>
        </div>
      </footer>
    </div>
  );
}
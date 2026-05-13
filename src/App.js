import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Quick Styles for our "Glassmorphism" look
const styles = {
  card: "bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-3xl p-8 shadow-2xl",
  button: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
};

export default function PitchGlide() {
  const [productName, setProductName] = useState("Aero Headphones");
  const [price, setPrice] = useState("199");

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* BACKGROUND DECORATION (Sliding Circles) */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-10 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-30"
      />

      {/* MAIN ANIMATED STAGE */}
      <main className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: FLYING PRODUCT IMAGE */}
        <motion.div
          initial={{ x: -500, opacity: 0, rotate: -20 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="relative"
        >
          <div className="w-full h-80 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
             {/* Replace with your product image URL */}
             <motion.img 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="https://via.placeholder.com/300" 
              alt="Product" 
              className="w-2/3 drop-shadow-2xl"
             />
          </div>
          {/* SLIDING PRICE TAG */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-5 -right-5 bg-pink-500 p-4 rounded-xl shadow-xl rotate-12"
          >
            <span className="text-2xl font-bold">${price}</span>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: SLIDING CONTENT */}
        <motion.div 
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className={styles.card}
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {productName}
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            Stop sending boring emails. Send a visual experience that converts influencers in seconds.
          </p>
          
          <div className="space-y-4">
             <input 
              type="text" 
              placeholder="Product Name" 
              className="w-full bg-white bg-opacity-5 p-4 rounded-xl border border-white border-opacity-10 outline-none focus:border-purple-500 transition-all"
              onChange={(e) => setProductName(e.target.value)}
             />
             <button className={styles.button}>
               Publish & Go Live ($5)
             </button>
          </div>
        </motion.div>
      </main>

      {/* FOOTER ICONS SLIDING IN */}
      <motion.footer 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="mt-20 flex space-x-12 opacity-50"
      >
        <span>✦ FAST SHIPPING</span>
        <span>✦ ECO-FRIENDLY</span>
        <span>✦ 24/7 SUPPORT</span>
      </motion.footer>
    </div>
  );
}
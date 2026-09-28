"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Heart, Sparkles, Gift } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface ConfettiEffectProps {
  onOpenGiftUnboxing: () => void;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ onOpenGiftUnboxing }) => {
  useEffect(() => {
    // Launch fireworks confetti burst
    const count = 180;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#f472b6", "#c084fc", "#fde047", "#fb7185", "#ffffff"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex flex-col items-center text-center space-y-5 max-w-sm mx-auto px-4 select-none my-4"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5 shadow-[0_0_30px_rgba(251,113,133,0.6)] flex items-center justify-center"
        >
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>
        </motion.div>
        <Heart className="w-6 h-6 text-pink-400 absolute -top-1 -right-2 fill-pink-500 animate-bounce" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-rose-300">
          {birthdayData.cake.blownSuccess}
        </h2>
        <p className="text-xs sm:text-sm text-pink-200/90 font-serif italic max-w-xs mx-auto">
          {birthdayData.cake.blownSubtext}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onOpenGiftUnboxing}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white font-medium text-sm sm:text-base shadow-[0_0_30px_rgba(244,114,182,0.5)] hover:shadow-[0_0_45px_rgba(244,114,182,0.8)] flex items-center justify-center gap-2.5 border border-pink-300/40 transition-all"
      >
        <Gift className="w-4 h-4" />
        <span>Buka Kado Spesial 🎁</span>
      </motion.button>
    </motion.div>
  );
};

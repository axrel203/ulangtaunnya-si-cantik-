"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Heart, ArrowRight } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface FinalSurpriseProps {
  onContinue: () => void;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({ onContinue }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [burstHearts, setBurstHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleHeartBurst = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 60 - 30),
      y: y + (Math.random() * 60 - 30),
    }));
    setBurstHearts((prev) => [...prev.slice(-12), ...newHearts]);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
      className="relative z-10 w-full max-w-md mx-auto px-4 py-14 flex flex-col items-center text-center select-none"
    >
      {!isRevealed ? (
        <div className="space-y-6 w-full glass-panel p-8 rounded-3xl border border-amber-400/30 flex flex-col items-center gpu-layer">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center animate-pulse">
            <Gift className="w-8 h-8 text-amber-300" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-serif italic text-pink-300">
              {birthdayData.finalSurprise.teaser1}
            </p>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-100">
              {birthdayData.finalSurprise.teaser2}
            </h3>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsRevealed(true)}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-medium text-sm sm:text-base shadow-[0_0_30px_rgba(251,191,36,0.5)] flex items-center gap-2.5 border border-amber-300/40 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{birthdayData.finalSurprise.buttonText}</span>
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full bg-gradient-to-b from-purple-950/95 via-slate-900/95 to-purple-950/95 rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl space-y-6 relative overflow-hidden"
        >
          {/* Burst Hearts particles overlay */}
          <AnimatePresence>
            {burstHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                animate={{ opacity: 0, scale: 1.4, y: -60 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute pointer-events-none z-30"
                style={{ left: h.x, top: h.y }}
              >
                <Heart className="w-6 h-6 text-rose-400 fill-rose-500" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Hero Couple Photo Frame */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-amber-300/50 shadow-[0_0_25px_rgba(251,191,36,0.35)] bg-slate-900">
            <Image
              src={birthdayData.finalSurprise.heroPhoto}
              alt="Momen Terbaik Zulfa & Partner"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-xs text-amber-200 font-serif italic bg-slate-950/70 px-3 py-1 rounded-full border border-amber-400/30 backdrop-blur-xs">
                Dengan Seluruh Cintaku Untuk Zulfa ❤️
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-200">
              {birthdayData.finalSurprise.headline}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 font-medium">
              {birthdayData.finalSurprise.subtext}
            </p>
            <p className="text-xs sm:text-sm text-pink-300/90 font-serif italic">
              {birthdayData.finalSurprise.hopeText}
            </p>
          </div>

          {/* Interactive Love Button */}
          <div className="pt-2 space-y-3">
            <button
              onClick={handleHeartBurst}
              className="w-full py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/35 text-pink-300 font-medium text-xs border border-pink-400/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
              <span>Kirimkan Cinta Untuk Zulfa (Ketuk Meledak) ❤️</span>
            </button>

            <button
              onClick={onContinue}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 border border-pink-300/30"
            >
              <span>Lihat Pesan Terakhir ❤️</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

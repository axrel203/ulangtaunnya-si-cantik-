"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, ChevronRight, X, Sparkles } from "lucide-react";
import { birthdayData, GiftItem } from "@/data/birthday";

interface GiftUnboxingProps {
  onContinue: () => void;
}

export const GiftUnboxing: React.FC<GiftUnboxingProps> = ({ onContinue }) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [activeGiftModal, setActiveGiftModal] = useState<GiftItem | null>(null);

  const gifts = birthdayData.gifts;

  const handleOpenGift = (gift: GiftItem) => {
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts((prev) => [...prev, gift.id]);
    }
    setActiveGiftModal(gift);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
      className="relative z-10 w-full max-w-md mx-auto px-4 py-14 flex flex-col items-center select-none"
    >
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 bg-pink-500/15 border border-pink-500/25 px-4 py-1 rounded-full text-pink-300 text-xs font-semibold">
          <Gift className="w-4 h-4 text-pink-400" />
          <span>Kejutan Spesial Untuk Zulfa</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200">
          3 Kado Spesial Untukmu 🎁
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/90 font-serif italic">
          Ketuk kado satu per satu untuk membuka kejutannya!
        </p>
      </div>

      {/* 3 Gift Cards List */}
      <div className="space-y-4 w-full">
        {gifts.map((gift) => {
          const isOpened = openedGifts.includes(gift.id);
          return (
            <motion.div
              key={gift.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenGift(gift)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between shadow-lg gpu-layer ${
                isOpened
                  ? "bg-slate-900/90 border-pink-500/40 shadow-pink-500/10"
                  : "glass-panel border-purple-400/30 shadow-purple-500/10 hover:border-pink-400/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center border relative overflow-hidden shrink-0 ${
                    gift.id === 3
                      ? "bg-purple-950 border-amber-300/60 shadow-[0_0_15px_rgba(253,224,71,0.35)] animate-pulse"
                      : "bg-slate-900/90 border-pink-500/30"
                  }`}
                >
                  <Image
                    src={gift.image}
                    alt={gift.title}
                    fill
                    loading="lazy"
                    className="object-cover p-1.5"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                    {gift.badge}
                  </span>
                  <h3 className="text-base font-serif font-bold text-slate-100">
                    {gift.title}
                  </h3>
                  <p className="text-[11px] text-slate-300/80 font-sans">
                    {isOpened ? "✨ Sudah Dibuka (Klik untuk lihat)" : "👉 Ketuk untuk membuka kado"}
                  </p>
                </div>
              </div>

              <div className="p-2 rounded-full bg-pink-500/20 text-pink-300 shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      {openedGifts.length >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 w-full flex justify-center"
        >
          <button
            onClick={onContinue}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white font-medium text-sm sm:text-base shadow-[0_0_25px_rgba(244,114,182,0.4)] flex items-center justify-center gap-2 border border-pink-300/40 transition-all active:scale-95"
          >
            <span>Lihat Album Kenangan Kita 📸</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Gift Modal Detail */}
      <AnimatePresence>
        {activeGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGiftModal(null)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-purple-950/95 via-slate-900/95 to-slate-950/95 p-6 rounded-3xl max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-pink-500/40 text-slate-100 flex flex-col items-center relative space-y-4 text-center"
            >
              <button
                onClick={() => setActiveGiftModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Tutup kado"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-semibold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                {activeGiftModal.badge}
              </span>

              {/* Gift Illustration */}
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-pink-400/40 shadow-[0_0_25px_rgba(244,114,182,0.3)] bg-slate-900">
                <Image
                  src={activeGiftModal.image}
                  alt={activeGiftModal.title}
                  fill
                  className="object-cover p-2"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-rose-300">
                  {activeGiftModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans px-2">
                  {activeGiftModal.description}
                </p>
              </div>

              <div className="w-full pt-2 border-t border-pink-500/20">
                <span className="text-[11px] font-medium text-pink-300/90 italic flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Status: {activeGiftModal.statusText}
                </span>
              </div>

              <button
                onClick={() => setActiveGiftModal(null)}
                className="w-full py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 font-medium text-xs border border-pink-500/30"
              >
                Tutup Kado ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

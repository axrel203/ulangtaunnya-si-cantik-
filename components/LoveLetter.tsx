"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, Sparkles, ChevronRight } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface LoveLetterProps {
  onContinue: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLinesCount, setVisibleLinesCount] = useState(0);

  const paragraphs = birthdayData.loveLetter.paragraphs;

  useEffect(() => {
    if (isOpen) {
      if (visibleLinesCount < paragraphs.length) {
        const timer = setTimeout(() => {
          setVisibleLinesCount((prev) => prev + 1);
        }, 900);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, visibleLinesCount, paragraphs.length]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
      className="relative z-10 w-full max-w-md mx-auto px-4 py-14 flex flex-col items-center justify-center select-none"
    >
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-4 py-1 rounded-full text-pink-300 text-xs font-semibold">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500/40" />
          <span>Surat Cinta Spesial</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200">
          {birthdayData.loveLetter.title}
        </h2>
        <p className="text-xs sm:text-sm text-pink-200/80 font-serif italic">
          Untaian kata tulus yang ditulis khusus untukmu
        </p>
      </div>

      {/* ENVELOPE CARD */}
      {!isOpen ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full relative bg-gradient-to-b from-purple-900/60 to-slate-900/80 rounded-2xl p-8 border border-pink-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col items-center justify-center space-y-6 text-center cursor-pointer gpu-layer"
          onClick={() => setIsOpen(true)}
        >
          {/* Wax Seal Envelope Graphic */}
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-pink-500/30 to-purple-500/30 border border-pink-400/40 flex items-center justify-center shadow-inner">
            <Mail className="w-12 h-12 text-pink-300 animate-pulse" />
            <div className="absolute w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center shadow-lg border-2 border-pink-200">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
          </div>

          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-medium text-sm shadow-[0_0_20px_rgba(244,114,182,0.4)] flex items-center gap-2 border border-pink-300/30">
            <span>{birthdayData.loveLetter.buttonText}</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full bg-gradient-to-b from-slate-900/95 via-purple-950/85 to-slate-950/95 rounded-3xl p-6 sm:p-8 border border-pink-500/35 shadow-[0_15px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl space-y-6"
        >
          {/* Letter Header */}
          <div className="border-b border-pink-500/20 pb-4 flex items-center justify-between">
            <h3 className="text-xl font-serif text-pink-300 font-bold italic">
              {birthdayData.loveLetter.greeting}
            </h3>
            <Heart className="w-5 h-5 text-rose-400 fill-rose-500/40 animate-pulse" />
          </div>

          {/* Letter Body Line-by-Line Reveal */}
          <div className="space-y-3.5 text-sm sm:text-base text-slate-200/95 leading-relaxed font-sans font-light">
            <AnimatePresence>
              {paragraphs.slice(0, visibleLinesCount + 1).map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="indent-2 text-justify"
                >
                  {para}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>

          {/* Closing & Signature */}
          {visibleLinesCount >= paragraphs.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="pt-6 border-t border-pink-500/20 text-right space-y-1"
            >
              <p className="text-base font-serif font-bold text-amber-200">
                {birthdayData.loveLetter.signature}
              </p>
            </motion.div>
          )}

          {/* Next Button */}
          {visibleLinesCount >= paragraphs.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-4 flex justify-center"
            >
              <button
                onClick={onContinue}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white font-medium text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] flex items-center justify-center gap-2 border border-pink-300/40 transition-all active:scale-95"
              >
                <span>Lihat Jarak & Alasan Cintaku 🌌</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.section>
  );
};

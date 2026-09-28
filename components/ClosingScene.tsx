"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotateCcw, Heart, Calendar, MessageCircle } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface ClosingSceneProps {
  onReplay: () => void;
}

export const ClosingScene: React.FC<ClosingSceneProps> = ({ onReplay }) => {
  const waUrl = `https://wa.me/6289616828320?text=${encodeURIComponent(
    "Halo sayang! Terima kasih ya buat kejutan ulang tahunnya yang manis ini... Aku suka banget! ❤️"
  )}`;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 text-center select-none py-12"
    >
      <div className="max-w-md w-full space-y-7 flex flex-col items-center">
        {/* Pulsing Heart Emblem */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500/20 via-rose-500/20 to-amber-500/20 border border-pink-400/40 flex items-center justify-center shadow-[0_0_40px_rgba(244,114,182,0.4)]">
          <Heart className="w-10 h-10 text-pink-400 fill-pink-500/40 animate-pulse" />
        </div>

        <div className="space-y-3">
          <p className="text-lg sm:text-xl font-serif text-slate-300 italic font-light">
            {birthdayData.closing.line1}
          </p>
          <p className="text-lg sm:text-xl font-serif text-pink-200/90 font-medium">
            {birthdayData.closing.line2}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-rose-300 pt-2">
            {birthdayData.closing.happyBirthdayText}
          </h2>
        </div>

        {/* Birthday Date Badge */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-pink-500/30 px-4 py-2 rounded-full text-xs sm:text-sm text-amber-200">
          <Calendar className="w-4 h-4 text-pink-400" />
          <span>{birthdayData.closing.date}</span>
        </div>

        {/* WhatsApp Reply & Replay Action Buttons */}
        <div className="pt-4 w-full flex flex-col items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-medium text-sm shadow-[0_0_25px_rgba(16,185,129,0.45)] flex items-center justify-center gap-2 border border-emerald-300/40 transition-all hover:scale-[1.02] active:scale-95 group"
          >
            <MessageCircle className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
            <span>Kirim Balasan ke WhatsApp 💬❤️</span>
          </a>

          <button
            onClick={onReplay}
            className="w-full py-3 px-6 rounded-full bg-slate-900/90 hover:bg-slate-800 text-pink-300 font-medium text-xs sm:text-sm border border-pink-500/40 shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-95 group"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>{birthdayData.closing.replayButtonText}</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
};

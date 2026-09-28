"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Moon,
  ChevronRight,
  Smile,
  Volume2,
  MessageCircle,
  HeartHandshake,
  Sparkles,
  Home as HomeIcon,
} from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface LdrSectionProps {
  onContinue?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Smile: <Smile className="w-5 h-5 text-pink-400" />,
  Volume2: <Volume2 className="w-5 h-5 text-purple-400" />,
  MessageCircle: <MessageCircle className="w-5 h-5 text-amber-300" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-rose-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-yellow-300" />,
  Home: <HomeIcon className="w-5 h-5 text-pink-300" />,
};

export const LdrSection: React.FC<LdrSectionProps> = ({ onContinue }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
      className="relative z-10 w-full max-w-md mx-auto px-4 py-14 flex flex-col items-center select-none space-y-8"
    >
      {/* Distance Graphic Card */}
      <div className="w-full glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] space-y-6 relative overflow-hidden gpu-layer">
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="text-center space-y-1">
          <span className="text-xs font-serif italic text-pink-300 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
            Terpisah Jarak, Bersatu Di Hati ✨
          </span>
        </div>

        {/* LDR Connection Graphic */}
        <div className="flex items-center justify-between px-2 sm:px-6">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-amber-300/40 flex items-center justify-center shadow-[0_0_15px_rgba(253,224,71,0.3)]">
              <Moon className="w-6 h-6 text-amber-200 fill-amber-300/20" />
            </div>
            <span className="text-[10px] text-slate-300 font-mono">Langitku</span>
          </div>

          <div className="flex-1 flex items-center justify-center relative mx-2">
            <div className="w-full h-0.5 border-b-2 border-dashed border-pink-400/50" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(244,114,182,0.8)] border border-pink-200"
            >
              <Heart className="w-4 h-4 text-white fill-white" />
            </motion.div>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-purple-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(192,132,252,0.3)]">
              <Moon className="w-6 h-6 text-purple-300 fill-purple-400/20" />
            </div>
            <span className="text-[10px] text-slate-300 font-mono">Langitmu</span>
          </div>
        </div>

        {/* Emotional LDR Quote */}
        <div className="space-y-3 pt-2 text-center">
          <div className="space-y-1">
            <p className="text-sm font-serif italic text-pink-300">
              {birthdayData.ldr.line1}
            </p>
            <p className="text-base font-serif font-semibold text-purple-200">
              {birthdayData.ldr.line2}
            </p>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-rose-300">
              {birthdayData.ldr.line3}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pt-2 px-2 border-t border-purple-500/20 italic">
            &ldquo;{birthdayData.ldr.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Reasons Why I Love You Cards */}
      <div className="w-full space-y-4 pt-2">
        <div className="text-center space-y-1 mb-4">
          <h3 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200">
            Alasan Aku Mencintaimu ❤️
          </h3>
          <p className="text-xs text-slate-300/80 font-serif italic">
            Beberapa dari jutaan alasan mengapa kamu begitu istimewa bagiku
          </p>
        </div>

        <div className="space-y-3 w-full">
          {birthdayData.reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-3.5 rounded-2xl border border-pink-500/20 shadow-md flex items-start gap-3.5 gpu-layer"
            >
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-pink-500/30 shrink-0 mt-0.5">
                {iconMap[reason.iconName] || <Heart className="w-5 h-5 text-pink-400" />}
              </div>
              <div className="space-y-0.5 text-left">
                <h4 className="text-sm sm:text-base font-serif font-semibold text-slate-100">
                  {reason.title}
                </h4>
                <p className="text-xs text-slate-300/90 leading-relaxed font-sans">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      {onContinue && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 w-full flex justify-center"
        >
          <button
            onClick={onContinue}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white font-medium text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] flex items-center justify-center gap-2 border border-pink-300/40 transition-all active:scale-95"
          >
            <span>Buka Kejutan Terakhir 🎁</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.section>
  );
};

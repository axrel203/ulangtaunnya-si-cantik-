"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Stars } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface OpeningSceneProps {
  onOpenGift: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onOpenGift }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentLineIndex < birthdayData.opening.lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, 2400);
      return () => clearTimeout(timer);
    } else {
      const btnTimer = setTimeout(() => {
        setShowButton(true);
      }, 1000);
      return () => clearTimeout(btnTimer);
    }
  }, [currentLineIndex]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 text-center select-none pt-12 pb-8"
    >
      <div className="max-w-md w-full flex flex-col items-center justify-center space-y-6 bg-slate-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-pink-500/35 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
        {/* Recipient Special Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-400/35 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(244,114,182,0.25)]"
        >
          <Stars className="w-3.5 h-3.5 text-yellow-300" />
          <span className="text-xs font-serif font-semibold text-pink-200 tracking-wide">
            Special Birthday Surprise for {birthdayData.recipientName} ✨
          </span>
        </motion.div>

        {/* Animated Heart Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative py-2"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-600/30 via-purple-600/30 to-rose-500/30 flex items-center justify-center backdrop-blur-md border border-pink-400/40 shadow-[0_0_35px_rgba(244,114,182,0.35)]">
            <Heart className="w-10 h-10 text-pink-400 fill-pink-500/40 animate-pulse" />
          </div>
          <Sparkles
            className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 animate-spin"
            style={{ animationDuration: "8s" }}
          />
        </motion.div>

        {/* Headline Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-1"
        >
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200 tracking-tight">
            Happy 20th Birthday
          </h1>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-300">
            {birthdayData.recipientName} ❤️
          </h2>
        </motion.div>

        {/* Sequential lines display */}
        <div className="space-y-3 min-h-[110px] flex flex-col items-center justify-center px-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentLineIndex}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="text-lg sm:text-xl font-serif text-slate-200 leading-relaxed font-light"
            >
              {birthdayData.opening.lines[currentLineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Start Button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="pt-2"
          >
            <button
              onClick={onOpenGift}
              className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white font-medium text-base shadow-[0_0_35px_rgba(244,114,182,0.5)] hover:shadow-[0_0_50px_rgba(244,114,182,0.8)] transition-all duration-300 active:scale-95 flex items-center gap-3 border border-pink-300/40"
            >
              <span>{birthdayData.opening.buttonText}</span>
              <Heart className="w-5 h-5 fill-current text-white group-hover:scale-125 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

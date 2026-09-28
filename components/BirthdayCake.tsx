"use client";

import React from "react";
import { motion } from "framer-motion";
import { birthdayData } from "@/data/birthday";

interface BirthdayCakeProps {
  candlesLit: [boolean, boolean];
  onTapCandle: (index: number) => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  candlesLit,
  onTapCandle,
}) => {
  const digits = ["2", "0"];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto select-none my-2">
      {/* Title & Subtitles */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1.5 mb-5"
      >
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200 drop-shadow-[0_2px_12px_rgba(244,114,182,0.4)]">
          {birthdayData.cake.title}
        </h1>
        <p className="text-xs sm:text-sm text-pink-200/90 font-serif italic">
          {birthdayData.cake.subtitle}
        </p>
        <p className="text-xs sm:text-sm text-amber-200 font-medium animate-pulse">
          {birthdayData.cake.instruction}
        </p>
      </motion.div>

      {/* Floating 3D Cake Container */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-end pb-4 gpu-layer"
      >
        {/* NUMBER 20 CANDLES CONTAINER */}
        <div className="absolute top-2 sm:top-4 w-40 flex justify-center items-end gap-6 z-20 px-2">
          {digits.map((digit, idx) => {
            const isLit = candlesLit[idx];
            return (
              <div
                key={idx}
                onClick={() => onTapCandle(idx)}
                className="relative flex flex-col items-center cursor-pointer group px-2 py-1"
                title={`Ketuk lilin '${digit}' untuk memadamkannya`}
              >
                {/* Flame or Smoke */}
                {isLit ? (
                  <div className="relative flex items-center justify-center mb-1">
                    {/* Outer Glow Aura */}
                    <div className="absolute w-8 h-10 rounded-full bg-amber-400/40 blur-md animate-pulse" />
                    {/* Flame shape */}
                    <div className="relative w-4 h-7 rounded-t-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-200 shadow-[0_0_12px_#fde047] animate-flame" />
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center mb-1 h-7 justify-start">
                    {/* Smoke particles when candle extinguished */}
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -20, scale: 1.5 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-slate-400/60 blur-xs"
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1" />
                  </div>
                )}

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-slate-800" />

                {/* 3D Digit Candle Body */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute text-5xl sm:text-6xl font-black text-pink-500/30 blur-sm select-none">
                    {digit}
                  </span>
                  <span className="relative text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-pink-300 to-purple-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter stroke-pink-400 select-none font-serif tracking-tighter">
                    {digit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* TOP LAYER CAKE */}
        <div className="relative w-48 h-16 rounded-t-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 border-t-2 border-pink-200/60 shadow-[0_4px_20px_rgba(244,114,182,0.3)] flex flex-col items-center justify-start overflow-hidden z-10">
          {/* Frosting Drips */}
          <div className="w-full flex justify-around -mt-1">
            <div className="w-5 h-6 bg-pink-100 rounded-b-full shadow-sm" />
            <div className="w-6 h-8 bg-pink-100 rounded-b-full shadow-sm" />
            <div className="w-5 h-5 bg-pink-100 rounded-b-full shadow-sm" />
            <div className="w-7 h-9 bg-pink-100 rounded-b-full shadow-sm" />
            <div className="w-6 h-6 bg-pink-100 rounded-b-full shadow-sm" />
          </div>
          {/* Sugar Pearls */}
          <div className="absolute bottom-2 w-full flex justify-around px-4">
            <span className="w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_6px_#fde047]" />
            <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_6px_#fde047]" />
            <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
          </div>
        </div>

        {/* BOTTOM LAYER CAKE */}
        <div className="relative w-60 h-24 rounded-t-3xl bg-gradient-to-r from-purple-800 via-pink-700 to-purple-900 border-t-2 border-purple-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col items-center justify-start overflow-hidden">
          <div className="w-full h-3 bg-pink-200/80 my-2 shadow-inner" />
          <div className="flex justify-around w-full px-6 mt-1 text-pink-300/80 text-xs">
            <span>❤️</span>
            <span>✨</span>
            <span>❤️</span>
            <span>✨</span>
            <span>❤️</span>
          </div>
        </div>

        {/* CAKE PLATE */}
        <div className="w-64 sm:w-72 h-5 rounded-full bg-gradient-to-r from-slate-200 via-amber-100 to-slate-300 shadow-[0_12px_25px_rgba(0,0,0,0.8)] border-b-2 border-slate-400" />
      </motion.div>
    </div>
  );
};

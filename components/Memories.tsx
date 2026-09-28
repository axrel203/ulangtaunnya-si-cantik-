"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Calendar, X, ChevronRight } from "lucide-react";
import { birthdayData, MemoryItem } from "@/data/birthday";

interface MemoriesProps {
  onContinue?: () => void;
}

export const Memories: React.FC<MemoriesProps> = ({ onContinue }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
      className="relative z-10 w-full max-w-2xl mx-auto px-4 py-14 flex flex-col items-center select-none"
    >
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-4 py-1 rounded-full text-pink-300 text-xs font-semibold">
          <Camera className="w-4 h-4 text-pink-400" />
          <span>Album Kenangan Indah</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200">
          Kenangan Indah Kita 📸
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/80 font-serif italic">
          Setiap detik bersamamu adalah momen berharga yang selalu kujaga
        </p>
      </div>

      {/* Polaroid Grid - 2x2 Layout */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg mx-auto">
        {birthdayData.memories.map((mem) => (
          <motion.div
            key={mem.id}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.96 }}
            style={{ rotate: `${mem.rotation}deg` }}
            onClick={() => setSelectedMemory(mem)}
            className="bg-slate-100 p-3 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 flex flex-col items-center text-slate-900 border border-slate-300 relative group gpu-layer"
          >
            {/* Red Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-3.5 bg-rose-400/50 backdrop-blur-xs rounded-xs shadow-xs border border-rose-300/60 z-10" />

            {/* Polaroid Image */}
            <div className="relative w-full aspect-square bg-slate-900 rounded-sm overflow-hidden mb-2">
              <Image
                src={mem.image}
                alt={mem.title}
                fill
                loading="lazy"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Polaroid Caption & Date */}
            <div className="w-full text-center space-y-0.5">
              <p className="text-xs font-semibold text-slate-800 truncate font-sans">
                {mem.title}
              </p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-rose-600 font-serif italic font-medium">
                <Calendar className="w-3 h-3" />
                <span>{mem.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      {onContinue && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 w-full max-w-xs flex justify-center"
        >
          <button
            onClick={onContinue}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-white font-medium text-sm shadow-[0_0_25px_rgba(244,114,182,0.4)] flex items-center justify-center gap-2 border border-pink-300/40 transition-all active:scale-95"
          >
            <span>Buka Surat Cinta Untuk Zulfa 💌</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Enlarged Polaroid Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 border border-pink-500/40 p-4 sm:p-6 rounded-3xl max-w-lg sm:max-w-xl w-full shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-slate-100 flex flex-col items-center relative space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors z-10"
                aria-label="Tutup foto"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full Uncropped Image Display */}
              <div className="relative w-full flex items-center justify-center rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 p-2 min-h-[200px] max-h-[60vh]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="max-h-[56vh] w-auto max-w-full object-contain rounded-xl shadow-md"
                />
              </div>

              <div className="text-center space-y-1.5 w-full pt-1">
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-serif italic">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedMemory.date}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-pink-300">
                  {selectedMemory.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans px-2">
                  {selectedMemory.caption}
                </p>
              </div>

              <button
                onClick={() => setSelectedMemory(null)}
                className="w-full py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 font-medium text-xs border border-pink-500/30 transition-colors"
              >
                Tutup Momen ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

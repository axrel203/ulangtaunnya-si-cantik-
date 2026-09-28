"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smile,
  Volume2,
  MessageCircle,
  HeartHandshake,
  Sparkles,
  Home as HomeIcon,
  Heart,
} from "lucide-react";
import { birthdayData } from "@/data/birthday";

const iconMap: Record<string, React.ReactNode> = {
  Smile: <Smile className="w-5 h-5 text-pink-400" />,
  Volume2: <Volume2 className="w-5 h-5 text-purple-400" />,
  MessageCircle: <MessageCircle className="w-5 h-5 text-amber-300" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-rose-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-yellow-300" />,
  Home: <HomeIcon className="w-5 h-5 text-pink-300" />,
};

export const Reasons: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full max-w-md mx-auto px-4 py-10 flex flex-col items-center select-none"
    >
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full text-purple-300 text-xs sm:text-sm font-medium">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500/30" />
          <span>Cinta Yang Tak Terhingga</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200">
          Alasan Aku Mencintaimu ❤️
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/80 font-serif italic">
          Beberapa dari jutaan alasan mengapa kamu begitu istimewa bagiku
        </p>
      </div>

      <div className="space-y-4 w-full">
        {birthdayData.reasons.map((reason, index) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-4 rounded-2xl border border-pink-500/20 shadow-md flex items-start gap-4"
          >
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-pink-500/30 shrink-0 mt-0.5">
              {iconMap[reason.iconName] || <Heart className="w-5 h-5 text-pink-400" />}
            </div>
            <div className="space-y-1 text-left">
              <h3 className="text-base font-serif font-semibold text-slate-100">
                {reason.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-sans">
                {reason.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

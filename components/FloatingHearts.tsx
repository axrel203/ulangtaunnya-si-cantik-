"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FloatingHeartItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeartItem[]>([]);

  useEffect(() => {
    // Generate fewer floating heart items for smooth mobile frame rate
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 8 : 12;

    const heartItems: FloatingHeartItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 88 + 6, // 6% to 94% width
      size: Math.random() * 10 + 12, // 12px to 22px
      duration: Math.random() * 6 + 10, // 10s to 16s float duration
      delay: Math.random() * 5,
    }));
    setHearts(heartItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 0, y: "105vh", scale: 0.7 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            y: "-10vh",
            scale: [0.7, 1, 0.9, 0.7],
            x: [`${h.x}vw`, `${h.x + (h.id % 2 === 0 ? 2.5 : -2.5)}vw`, `${h.x}vw`],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeInOut",
          }}
          className="absolute gpu-layer"
          style={{ left: `${h.x}vw` }}
        >
          <Heart
            style={{ width: `${h.size}px`, height: `${h.size}px` }}
            className="text-pink-400/35 fill-pink-500/15 filter drop-shadow-[0_0_6px_rgba(244,114,182,0.3)]"
          />
        </motion.div>
      ))}
    </div>
  );
};

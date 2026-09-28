"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

export type SceneStep =
  | "opening"
  | "cake"
  | "gifts"
  | "memories"
  | "letter"
  | "ldr"
  | "surprise"
  | "closing";

interface StoryProgressProps {
  currentScene: SceneStep;
  onSelectScene: (scene: SceneStep) => void;
}

const steps: { id: SceneStep; label: string; number: number }[] = [
  { id: "opening", label: "Pembuka", number: 1 },
  { id: "cake", label: "Kue & Lilin", number: 2 },
  { id: "gifts", label: "Kado Spesial", number: 3 },
  { id: "memories", label: "Kenangan", number: 4 },
  { id: "letter", label: "Surat Cinta", number: 5 },
  { id: "ldr", label: "LDR & Cinta", number: 6 },
  { id: "surprise", label: "Kejutan Final", number: 7 },
];

export const StoryProgress: React.FC<StoryProgressProps> = ({
  currentScene,
  onSelectScene,
}) => {
  if (currentScene === "closing") return null;

  const currentIndex = steps.findIndex((s) => s.id === currentScene);
  const activeStep = steps[currentIndex] || steps[0];
  const progressPercent = Math.round(((currentIndex + 1) / steps.length) * 100);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectScene(steps[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      onSelectScene(steps[currentIndex + 1].id);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-3 py-2 flex flex-col items-center pointer-events-none select-none">
      <div className="w-full max-w-lg glass-panel rounded-full py-1.5 px-3 border border-pink-500/25 shadow-lg pointer-events-auto flex items-center justify-between gap-2 backdrop-blur-md">
        {/* Previous step button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-1.5 rounded-full transition-all ${
            currentIndex === 0
              ? "opacity-30 cursor-not-allowed text-slate-500"
              : "hover:bg-pink-500/20 text-pink-300 active:scale-90"
          }`}
          aria-label="Langkah sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Story Step Badge & Label */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-pink-500/20 border border-pink-500/30 px-2.5 py-0.5 rounded-full">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-500 animate-pulse" />
            <span className="text-[11px] font-bold text-pink-200">
              {currentIndex + 1}/7
            </span>
          </div>
          <span className="text-xs font-serif font-medium text-slate-200 truncate max-w-[120px] sm:max-w-[180px]">
            {activeStep.label}
          </span>
        </div>

        {/* Step Dots indicator */}
        <div className="hidden sm:flex items-center gap-1">
          {steps.map((s, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScene(s.id)}
                title={s.label}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "w-5 bg-gradient-to-r from-pink-500 to-purple-400 shadow-[0_0_8px_#f472b6]"
                    : isCompleted
                    ? "w-2 bg-pink-400/60"
                    : "w-2 bg-slate-700/50"
                }`}
              />
            );
          })}
        </div>

        {/* Next step button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          className={`p-1.5 rounded-full transition-all ${
            currentIndex === steps.length - 1
              ? "opacity-30 cursor-not-allowed text-slate-500"
              : "hover:bg-pink-500/20 text-pink-300 active:scale-90"
          }`}
          aria-label="Langkah selanjutnya"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg mt-1 h-0.5 bg-slate-900/60 rounded-full overflow-hidden px-1">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-400 to-amber-300 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

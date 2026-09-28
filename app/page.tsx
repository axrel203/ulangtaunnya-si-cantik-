"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { StarBackground } from "@/components/StarBackground";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MusicPlayer, MusicPlayerRef } from "@/components/MusicPlayer";
import { StoryProgress, SceneStep } from "@/components/StoryProgress";
import { OpeningScene } from "@/components/OpeningScene";
import { BirthdayCake } from "@/components/BirthdayCake";
import { CandleBlower } from "@/components/CandleBlower";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { GiftUnboxing } from "@/components/GiftUnboxing";
import { Memories } from "@/components/Memories";
import { LoveLetter } from "@/components/LoveLetter";
import { LdrSection } from "@/components/LdrSection";
import { FinalSurprise } from "@/components/FinalSurprise";
import { ClosingScene } from "@/components/ClosingScene";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<SceneStep>("opening");
  const [candlesLit, setCandlesLit] = useState<[boolean, boolean]>([true, true]);
  const [allCandlesOut, setAllCandlesOut] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerRef | null>(null);

  // iOS Safari audio trigger on first user tap
  const handleStartStory = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.startAudio();
    }
    setCurrentScene("cake");
  };

  const handleTapCandle = (index: number) => {
    setCandlesLit((prev) => {
      const next = [...prev] as [boolean, boolean];
      next[index] = false;
      return next;
    });
  };

  const handleExtinguishCandle = (index: number) => {
    setCandlesLit((prev) => {
      const next = [...prev] as [boolean, boolean];
      next[index] = false;
      return next;
    });
  };

  const handleAllCandlesOut = () => {
    setAllCandlesOut(true);
    if (musicPlayerRef.current) {
      musicPlayerRef.current.playCelebrationSound();
    }
  };

  const handleReplay = () => {
    setCandlesLit([true, true]);
    setAllCandlesOut(false);
    setCurrentScene("opening");
  };

  return (
    <main className="relative min-h-screen w-full bg-[#080511] text-slate-100 flex flex-col items-center justify-center overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* App-wide Custom Background Image */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Image
          src="/images/ChatGPT Image 29 Sep 2026, 00.08.51.png"
          alt="App Background"
          fill
          priority
          className="object-cover opacity-70 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/65 to-slate-950/80 backdrop-blur-[2px]" />
      </div>

      {/* Starry night sky background */}
      <StarBackground />

      {/* Floating love particles */}
      <FloatingHearts />

      {/* Story progress top navigation bar */}
      <StoryProgress
        currentScene={currentScene}
        onSelectScene={(scene) => setCurrentScene(scene)}
      />

      {/* Floating music player */}
      <MusicPlayer ref={musicPlayerRef} isVisible={currentScene !== "opening"} />

      {/* Main Story Scenes */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: OPENING GREETING */}
          {currentScene === "opening" && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="w-full flex items-center justify-center"
            >
              <OpeningScene onOpenGift={handleStartStory} />
            </motion.div>
          )}

          {/* STEP 2: INTERACTIVE BIRTHDAY CAKE */}
          {currentScene === "cake" && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.5 } }}
              className="w-full flex flex-col items-center justify-center space-y-4 py-8"
            >
              <BirthdayCake
                candlesLit={candlesLit}
                onTapCandle={handleTapCandle}
              />

              {!allCandlesOut ? (
                <CandleBlower
                  candlesLit={candlesLit}
                  onExtinguishCandle={handleExtinguishCandle}
                  onAllCandlesOut={handleAllCandlesOut}
                />
              ) : (
                <ConfettiEffect onOpenGiftUnboxing={() => setCurrentScene("gifts")} />
              )}
            </motion.div>
          )}

          {/* STEP 3: INTERACTIVE GIFT SURPRISE */}
          {currentScene === "gifts" && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.5 } }}
              className="w-full flex items-center justify-center"
            >
              <GiftUnboxing onContinue={() => setCurrentScene("memories")} />
            </motion.div>
          )}

          {/* STEP 4: OUR MEMORIES / PHOTO GALLERY */}
          {currentScene === "memories" && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, transition: { duration: 0.5 } }}
              className="w-full flex items-center justify-center"
            >
              <Memories onContinue={() => setCurrentScene("letter")} />
            </motion.div>
          )}

          {/* STEP 5: HEARTFELT LOVE LETTER */}
          {currentScene === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, transition: { duration: 0.5 } }}
              className="w-full flex items-center justify-center"
            >
              <LoveLetter onContinue={() => setCurrentScene("ldr")} />
            </motion.div>
          )}

          {/* STEP 6: LDR & REASONS */}
          {currentScene === "ldr" && (
            <motion.div
              key="ldr"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, transition: { duration: 0.5 } }}
              className="w-full flex items-center justify-center"
            >
              <LdrSection onContinue={() => setCurrentScene("surprise")} />
            </motion.div>
          )}

          {/* STEP 7: FINAL SURPRISE & HERO PHOTO */}
          {currentScene === "surprise" && (
            <motion.div
              key="surprise"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.5 } }}
              className="w-full flex items-center justify-center"
            >
              <FinalSurprise onContinue={() => setCurrentScene("closing")} />
            </motion.div>
          )}

          {/* CLOSING ENDING SCENE */}
          {currentScene === "closing" && (
            <motion.div
              key="closing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex items-center justify-center"
            >
              <ClosingScene onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

"use client";

import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export interface MusicPlayerRef {
  startAudio: () => void;
  playCelebrationSound: () => void;
}

interface MusicPlayerProps {
  isVisible?: boolean;
}

export const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>(
  ({ isVisible = true }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.6);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const getOrCreateAudioCtx = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    };

    useImperativeHandle(ref, () => ({
      startAudio: () => {
        getOrCreateAudioCtx();
        if (audioRef.current) {
          audioRef.current.volume = volume;
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              playFallbackMelody();
            });
        }
      },
      playCelebrationSound: () => {
        try {
          const ctx = getOrCreateAudioCtx();
          if (!ctx) return;
          // Play a sweet celebratory chime scale: C5 - E5 - G5 - C6
          const notes = [523.25, 659.25, 783.99, 1046.5];
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
            gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.15);
            osc.stop(ctx.currentTime + idx * 0.15 + 1.2);
          });
        } catch (e) {
          console.log("Celebration sound error:", e);
        }
      },
    }));

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : volume;
      }
    }, [volume, isMuted]);

    const togglePlay = () => {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        getOrCreateAudioCtx();
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => playFallbackMelody());
      }
    };

    const toggleMute = () => {
      setIsMuted((prev) => !prev);
    };

    const playFallbackMelody = () => {
      try {
        const ctx = getOrCreateAudioCtx();
        if (!ctx) return;
        const notes = [261.63, 329.63, 392.0, 523.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.4);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.4);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.4 + 2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.4);
          osc.stop(ctx.currentTime + idx * 0.4 + 2);
        });
        setIsPlaying(true);
      } catch (e) {
        console.log("Audio synth error", e);
      }
    };

    if (!isVisible) return null;

    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 p-2 px-3 rounded-full glass-panel shadow-xl border border-pink-500/30 text-xs backdrop-blur-md">
        <audio ref={audioRef} src={birthdayData.musicPath} loop preload="auto" />

        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 transition-all active:scale-90"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-slate-800/60 text-slate-300 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-pink-300" />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            if (isMuted) setIsMuted(false);
          }}
          className="w-14 accent-pink-500 h-1 rounded-lg cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
        />

        <div className="flex items-center gap-1 pl-1 border-l border-pink-500/20">
          <Music className={`w-3.5 h-3.5 text-pink-400 ${isPlaying ? "animate-pulse" : "opacity-40"}`} />
        </div>
      </div>
    );
  }
);

MusicPlayer.displayName = "MusicPlayer";

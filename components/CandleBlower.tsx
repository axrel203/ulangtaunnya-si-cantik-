"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Wind, Sparkles } from "lucide-react";

interface CandleBlowerProps {
  candlesLit: [boolean, boolean];
  onExtinguishCandle: (index: number) => void;
  onAllCandlesOut: () => void;
}

export const CandleBlower: React.FC<CandleBlowerProps> = ({
  candlesLit,
  onExtinguishCandle,
  onAllCandlesOut,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [micDenied, setMicDenied] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string>(
    "Tekan 'Mulai Mikrofon' untuk tiup, atau ketuk lilinnya langsung ya ❤️"
  );

  const blownCount = candlesLit.filter((lit) => !lit).length;
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastBlowTimeRef = useRef<number>(0);
  const sustainedBlowFramesRef = useRef<number>(0);
  const candlesLitRef = useRef(candlesLit);
  const isWaitingForResetRef = useRef(false);

  useEffect(() => {
    candlesLitRef.current = candlesLit;
  }, [candlesLit]);

  useEffect(() => {
    if (blownCount === 2) {
      stopListening();
      onAllCandlesOut();
    }
  }, [blownCount, onAllCandlesOut]);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const startListening = async () => {
    if (micDenied) return;
    try {
      setMicDenied(false);
      isWaitingForResetRef.current = false;
      lastBlowTimeRef.current = Date.now() + 600;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.4;
      source.connect(analyser);
      analyserRef.current = analyser;

      setIsListening(true);
      setStatusMessage("Mikrofon Aktif! Tiup lilinnya, sayang 🎂💨");

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const detectBlow = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Sum low-frequency breath noise energy (0-400Hz)
        let lowFreqSum = 0;
        const lowBinsCount = 10;
        for (let i = 0; i < lowBinsCount; i++) {
          lowFreqSum += dataArray[i];
        }
        const lowFreqAvg = lowFreqSum / lowBinsCount;
        const normalizedLevel = Math.min(100, Math.round((lowFreqAvg / 170) * 100));
        setAudioLevel(normalizedLevel);

        const now = Date.now();

        if (isWaitingForResetRef.current) {
          if (normalizedLevel <= 45) {
            isWaitingForResetRef.current = false;
            sustainedBlowFramesRef.current = 0;
            setStatusMessage("Hebat! Sekarang tiup lilin kedua ya 💨");
          } else {
            animationFrameRef.current = requestAnimationFrame(detectBlow);
            return;
          }
        }

        // Require sustained blow level >= 75% for at least 6 consecutive animation frames
        if (normalizedLevel >= 75) {
          sustainedBlowFramesRef.current += 1;
        } else {
          sustainedBlowFramesRef.current = Math.max(0, sustainedBlowFramesRef.current - 1);
        }

        if (sustainedBlowFramesRef.current >= 6 && now - lastBlowTimeRef.current > 1000) {
          lastBlowTimeRef.current = now;
          isWaitingForResetRef.current = true;
          sustainedBlowFramesRef.current = 0;

          const firstLitIndex = candlesLitRef.current.findIndex((lit) => lit);
          if (firstLitIndex !== -1) {
            onExtinguishCandle(firstLitIndex);
            const digitLabel = firstLitIndex === 0 ? "'2'" : "'0'";
            setStatusMessage(`Lilin ${digitLabel} padam! Tahan nafas sebentar sebelum meniup lilin berikutnya 💨`);
          }
        }

        animationFrameRef.current = requestAnimationFrame(detectBlow);
      };

      detectBlow();
    } catch (err) {
      console.log("Mic access error or denied:", err);
      setMicDenied(true);
      setIsListening(false);
      setStatusMessage("Jangan khawatir ❤️ Kamu bisa mengetuk lilinnya langsung untuk memadamkannya.");
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsListening(false);
    setAudioLevel(0);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center space-y-3.5 px-4 select-none">
      {/* Realtime Status Pill */}
      <div className="flex items-center gap-2 bg-purple-950/70 border border-purple-500/35 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
        <Wind className={`w-4 h-4 text-pink-300 ${isListening ? "animate-bounce" : ""}`} />
        <span className="text-xs sm:text-sm font-medium text-pink-200">
          Tiupan terdeteksi: <span className="font-bold text-amber-300">{blownCount}/2</span>
        </span>
      </div>

      {/* Mic Volume Meter Bar */}
      {isListening && (
        <div className="w-full space-y-1 px-4">
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>Sensitivitas tiupan mic</span>
            <span className="text-pink-300 font-mono font-bold">{audioLevel}%</span>
          </div>
          <div className="w-full bg-slate-950/80 rounded-full h-2.5 overflow-hidden border border-pink-500/30 p-0.5 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-75 ${
                audioLevel >= 75
                  ? "bg-gradient-to-r from-emerald-400 via-amber-300 to-yellow-200 shadow-[0_0_12px_#fde047]"
                  : "bg-gradient-to-r from-pink-500 via-purple-400 to-amber-300"
              }`}
              style={{ width: `${audioLevel}%` }}
            />
          </div>
        </div>
      )}

      {/* Controls & Fallback */}
      <div className="flex flex-col items-center gap-2.5 w-full">
        {!isListening && blownCount < 2 && !micDenied && (
          <button
            onClick={startListening}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium text-sm sm:text-base shadow-[0_0_20px_rgba(244,114,182,0.4)] flex items-center justify-center gap-2.5 transition-all active:scale-95 border border-pink-300/30"
          >
            <Mic className="w-4 h-4" />
            <span>🎙️ Mulai Mikrofon</span>
          </button>
        )}

        {isListening && (
          <button
            onClick={stopListening}
            className="py-2 px-4 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center gap-2 border border-slate-700"
          >
            <MicOff className="w-3.5 h-3.5 text-rose-400" />
            <span>Matikan Mic</span>
          </button>
        )}

        {/* Dynamic Status / Instruction */}
        <p className="text-xs text-center text-slate-300/90 font-medium px-2 leading-relaxed">
          {statusMessage}
        </p>

        {/* TAP FALLBACK HINT */}
        {blownCount < 2 && (
          <div className="pt-0.5 flex items-center gap-1.5 text-[11px] text-amber-200/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Atau ketuk lilinnya langsung di atas untuk memadamkannya 👆</span>
          </div>
        )}
      </div>
    </div>
  );
};

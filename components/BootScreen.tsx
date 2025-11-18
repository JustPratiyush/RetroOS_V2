"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface BootScreenProps {
  onBootComplete: () => void;
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Simulate loading assets
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Randomize speed slightly for realism
        return prev + Math.floor(Math.random() * 5) + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Progress complete, wait a moment then fade out
      setTimeout(() => {
        setOpacity(0);
        setTimeout(() => {
          setIsVisible(false);
          onBootComplete();
        }, 500); // Wait for fade out transition
      }, 800);
    }
  }, [progress, onBootComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center text-white transition-opacity duration-500 ease-in-out"
      style={{ opacity: opacity }}
    >
      <div className="w-[90%] max-w-[420px] flex flex-col items-center">
        {/* Logo */}
        <div className="mb-4 w-[70px] h-[70px] relative">
          {/* Using a placeholder, ensure /assets/icons/logo.webp exists */}
          <Image
            src="/assets/icons/logo.webp"
            alt="RetroOS Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Progress Bar Container */}
        <div className="w-[70%] h-2 bg-white/5 border-2 border-white/15 rounded overflow-hidden shadow-inner relative">
          <div
            className="h-full bg-gradient-to-r from-white/95 to-gray-200/95 shadow-md transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Text */}
        <div className="mt-2 font-pixel font-bold tracking-wider text-sm">
          {progress}%
        </div>

        {/* Status Text */}
        <div className="mt-2 text-xs opacity-80 font-sans">
          {progress < 100 ? "Starting RetroOS..." : "Boot Complete"}
        </div>
      </div>
    </div>
  );
}

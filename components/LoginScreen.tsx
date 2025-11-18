"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState("");
  const [isFading, setIsFading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    // The original hint says "Just press Enter", so we accept any password
    if (isFading) return; // Prevent multiple calls

    setIsFading(true);

    // Try to play startup sound
    try {
      const audio = new Audio("/assets/sounds/startup-sound.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Silently fail if audio file doesn't exist or autoplay is blocked
      });
    } catch (error) {
      // Ignore audio errors
    }

    setTimeout(() => {
      onLogin();
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)",
        backdropFilter: "blur(20px) brightness(0.7)",
        WebkitBackdropFilter: "blur(20px) brightness(0.7)",
      }}
    >
      <div className="flex flex-col items-center animate-[fadeIn_0.8s_ease-out]">
        {/* Avatar */}
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 shadow-lg border-2 border-white/20 relative">
          {/* Fallback to logo if me.png is missing, but trying me.png first as per source 32 */}
          <Image
            src="/assets/icons/me.png"
            alt="User Avatar"
            fill
            className="object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/icons/logo.webp";
            }}
          />
        </div>

        <div className="text-white text-2xl font-medium mb-5 drop-shadow-md font-sans">
          Abhinav Kuchhal
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-white/25 border border-white/30 rounded-full py-2 pl-4 pr-10 text-white placeholder-white/70 outline-none focus:bg-white/40 transition-all w-[180px] focus:w-[190px] text-sm backdrop-blur-sm font-sans"
          />
          <button
            onClick={handleLogin}
            type="button"
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-black text-xs font-bold cursor-pointer transition-opacity hover:bg-white hover:scale-110 ${
              password ? "opacity-100" : "opacity-50"
            }`}
            aria-label="Login"
          >
            ➝
          </button>
        </div>

        <div className="mt-4 text-white/60 text-xs italic font-sans">
          Hint: Just press Enter
        </div>
      </div>
    </div>
  );
}

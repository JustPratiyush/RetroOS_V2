"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BootScreen from "@/components/BootScreen";
import LoginScreen from "@/components/LoginScreen";
import TopBar from "@/components/TopBar";
import Dock from "@/components/Dock";
import { OSProvider, useOS } from "@/context/OSContext";
import WindowFrame from "@/components/os/WindowFrame";
import Terminal from "@/components/apps/Terminal";
import Trash from "@/components/apps/Trash";
import Calculator from "@/components/apps/Calculator";
import Music from "@/components/apps/Music";
import Internet from "@/components/apps/Internet";
import Finder from "@/components/apps/Finder";
import Mail from "@/components/apps/Mail";

// --- DESKTOP COMPONENT (Accesses OS Context) ---
const DesktopEnvironment = ({
  isBooted,
  wallpaper,
}: {
  isBooted: boolean;
  wallpaper: string;
}) => {
  const { openApp } = useOS();
  const [currentTime, setCurrentTime] = useState<string>("");

  // Client-side clock logic for display if needed elsewhere,
  // though TopBar handles its own time.
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div
      className={`relative w-full h-full transition-opacity duration-1000 ease-in-out ${
        isBooted ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 1. System Bar */}
      <TopBar />

      {/* 2. Desktop Icons Area */}
      <div className="absolute top-[50px] left-0 w-full h-[calc(100%-120px)] p-6 flex flex-col flex-wrap content-start gap-6 z-10 pointer-events-none">
        {/* Note: pointer-events-auto added to icons so clicking works despite container constraints */}

        {/* Icon: ReadMe.txt */}
        <div
          className="w-[90px] flex flex-col items-center gap-1 cursor-pointer group pointer-events-auto"
          onDoubleClick={() => openApp("finder")} // Using Finder as a Text Viewer placeholder
        >
          <div className="relative w-14 h-14 transition-transform duration-200 group-active:scale-90">
            <Image
              src="/assets/icons/TxtIcon.webp"
              alt="Readme"
              fill
              className="object-contain drop-shadow-xl"
              draggable={false}
            />
          </div>
          <span className="font-vt323 text-white text-lg drop-shadow-md bg-black/20 px-2 rounded group-hover:bg-black/50 transition-colors">
            ReadMe.txt
          </span>
        </div>

        {/* Icon: Terminal */}
        <div
          className="w-[90px] flex flex-col items-center gap-1 cursor-pointer group pointer-events-auto"
          onDoubleClick={() => openApp("terminal")}
        >
          <div className="relative w-14 h-14 transition-transform duration-200 group-active:scale-90">
            <Image
              src="/assets/icons/terminal.webp"
              alt="Terminal"
              fill
              className="object-contain drop-shadow-xl"
              draggable={false}
            />
          </div>
          <span className="font-vt323 text-white text-lg drop-shadow-md bg-black/20 px-2 rounded group-hover:bg-black/50 transition-colors">
            Terminal
          </span>
        </div>

        {/* Icon: Recycle Bin */}
        <div
          className="w-[90px] flex flex-col items-center gap-1 cursor-pointer group pointer-events-auto"
          onDoubleClick={() => openApp("trash")}
        >
          <div className="relative w-14 h-14 transition-transform duration-200 group-active:scale-90">
            <Image
              src="/assets/icons/trash.webp"
              alt="Trash"
              fill
              className="object-contain drop-shadow-xl"
              draggable={false}
            />
          </div>
          <span className="font-vt323 text-white text-lg drop-shadow-md bg-black/20 px-2 rounded group-hover:bg-black/50 transition-colors">
            Recycle Bin
          </span>
        </div>

        {/* Icon: GitHub (External Link) */}
        <a
          href="https://github.com/JustPratiyush"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[90px] flex flex-col items-center gap-1 cursor-pointer group pointer-events-auto"
        >
          <div className="relative w-14 h-14 transition-transform duration-200 group-active:scale-90">
            <Image
              src="/assets/icons/github.webp"
              alt="GitHub"
              fill
              className="object-contain drop-shadow-xl"
              draggable={false}
            />
          </div>
          <span className="font-vt323 text-white text-lg drop-shadow-md bg-black/20 px-2 rounded group-hover:bg-black/50 transition-colors">
            GitHub
          </span>
        </a>
      </div>

      {/* 3. Window Layer (The OS 'Soul') */}

      {/* APP: Terminal */}
      <WindowFrame
        appId="terminal"
        title="user@retro-os:~"
        className="w-[600px] h-[400px]"
      >
        <Terminal />
      </WindowFrame>

      {/* APP: Trash (Easter Egg) */}
      <WindowFrame
        appId="trash"
        title="Recycle Bin"
        className="w-[400px] h-[450px]"
      >
        <Trash />
      </WindowFrame>

      {/* APP: Mail */}
      <WindowFrame
        appId="mail"
        title="Mail - Inbox (0)"
        className="w-[500px] h-[400px]"
      >
        <Mail />
      </WindowFrame>

      {/* APP: Calculator */}
      <WindowFrame
        appId="calculator"
        title="Calculator"
        className="w-[260px] h-[380px]"
      >
        <Calculator />
      </WindowFrame>

      {/* APP: Music */}
      <WindowFrame
        appId="music"
        title="Music Player"
        className="w-[350px] h-[450px]"
      >
        <Music />
      </WindowFrame>

      {/* APP: Internet */}
      <WindowFrame
        appId="internet"
        title="Internet Browser"
        className="w-[600px] h-[700px]"
      >
        <Internet />
      </WindowFrame>

      {/* APP: Finder (File Manager) */}
      <WindowFrame
        appId="finder"
        title="Finder"
        className="w-[600px] h-[500px]"
      >
        <Finder />
      </WindowFrame>

      {/* 4. Dock */}
      <Dock />
    </div>
  );
};

// --- MAIN HOME COMPONENT ---
export default function Home() {
  // Boot State
  const [isBooted, setIsBooted] = useState(false);
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Wallpaper State (Defaulting to wallpaper0 as per your file structure)
  const [wallpaper, setWallpaper] = useState(
    "/assets/wallpapers/wallpaper0.webp"
  );

  return (
    <OSProvider>
      <main className="relative w-screen h-screen overflow-hidden bg-black selection:bg-retro-highlight selection:text-white">
        {/* Boot Screen Overlay */}
        <BootScreen onBootComplete={() => setIsBooted(true)} />

        {/* Wallpaper Background - Shows after boot */}
        {isBooted && (
          <div
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: `url(${wallpaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {/* Login Screen - Shows after boot, before desktop */}
        {isBooted && !isLoggedIn && (
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        )}

        {/* Main Desktop Environment - Only shows after login */}
        {isLoggedIn && (
          <DesktopEnvironment isBooted={isBooted} wallpaper={wallpaper} />
        )}

        {/* CRT Scanline Effect Overlay (Global) */}
        <div className="grain-overlay pointer-events-none fixed inset-0 z-[9999]" />
      </main>
    </OSProvider>
  );
}

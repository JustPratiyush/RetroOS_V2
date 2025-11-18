"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import TopBar from "@/components/TopBar";
import Dock from "@/components/Dock";
import Image from "next/image";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [wallpaper, setWallpaper] = useState(
    "/assets/wallpapers/wallpaper0.webp"
  );

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Boot Screen Overlay */}
      <BootScreen onBootComplete={() => setIsBooted(true)} />

      {/* Main Desktop Environment - Only visible after boot logic starts (but rendered behind) */}
      <div
        className={`relative w-full h-full transition-opacity duration-1000 ${
          isBooted ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <TopBar />

        {/* Desktop Area (Grid for icons) */}
        <div className="absolute top-[40px] left-0 w-full h-[calc(100%-120px)] p-4 flex flex-col flex-wrap content-start gap-4">
          {/* Desktop Icon: ReadMe */}
          <div className="w-[100px] flex flex-col items-center gap-1 cursor-pointer group active:scale-95 transition-transform">
            <div className="relative w-14 h-14">
              <Image
                src="/assets/icons/TxtIcon.webp"
                alt="Readme"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
            <span className="text-white text-sm font-medium drop-shadow-md bg-black/20 rounded px-2 group-hover:bg-black/50 transition-colors">
              ReadMe.txt
            </span>
          </div>

          {/* Desktop Icon: Github */}
          <div className="w-[100px] flex flex-col items-center gap-1 cursor-pointer group active:scale-95 transition-transform">
            <div className="relative w-14 h-14">
              <Image
                src="/assets/icons/github.webp"
                alt="Github"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
            <span className="text-white text-sm font-medium drop-shadow-md bg-black/20 rounded px-2 group-hover:bg-black/50 transition-colors">
              GitHub
            </span>
          </div>
        </div>

        <Dock />
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TopBar() {
  const [time, setTime] = useState<string>("--:--");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[40px] bg-white/40 backdrop-blur-sm flex items-center justify-between px-3 z-50 select-none shadow-sm border-b border-white/20">
      <div className="flex items-center gap-4">
        <div className="hover:bg-black/10 p-1 rounded cursor-pointer active:bg-black active:text-white transition-colors">
          <Image
            src="/assets/icons/logo.webp"
            width={20}
            height={20}
            alt="Apple"
            className="object-contain"
          />
        </div>

        {["File", "Edit", "View"].map((menu) => (
          <div
            key={menu}
            className="font-bold text-sm px-2 py-1 rounded cursor-pointer hover:bg-black hover:text-white transition-colors hidden sm:block"
          >
            {menu}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="hover:bg-white/60 p-1 rounded cursor-pointer transition-colors">
          <Image
            src="/assets/icons/wifi.webp"
            width={22}
            height={22}
            alt="WiFi"
          />
        </div>

        <div className="flex items-center gap-1 hover:bg-white/60 px-2 py-1 rounded cursor-pointer transition-colors group">
          <div className="relative w-[28px] h-[14px] border-2 border-black rounded-[2px] p-[1px]">
            <div className="h-full bg-retro-green w-[80%]"></div>
            <div className="absolute -right-[4px] top-[3px] w-[2px] h-[4px] bg-black rounded-r-sm"></div>
          </div>
        </div>

        <div className="font-vt323 text-xl font-bold cursor-pointer hover:bg-white/60 px-2 rounded transition-colors min-w-[60px] text-center">
          {time}
        </div>
      </div>
    </div>
  );
}

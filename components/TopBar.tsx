"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useOS } from "@/context/OSContext";

export default function TopBar() {
  const { openApp } = useOS();
  const [time, setTime] = useState<string>("--:--");
  const [battery, setBattery] = useState<{
    level: number;
    charging: boolean;
  } | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Clock Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Battery Logic (Ported from datetime_battery_wifi.js)
  useEffect(() => {
    if ("getBattery" in navigator) {
      // @ts-ignore - Battery API types are experimental
      navigator.getBattery().then((bat) => {
        const updateBat = () => {
          setBattery({ level: bat.level * 100, charging: bat.charging });
        };

        updateBat();
        bat.addEventListener("levelchange", updateBat);
        bat.addEventListener("chargingchange", updateBat);
      });
    }
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const menus = {
    apple: ["About This OS", "System Info", "Settings", "Shut Down"],
    file: ["New Window", "Open...", "Save"],
    view: ["Zoom In", "Zoom Out", "Full Screen"],
  };

  const handleMenuClick = (action: string) => {
    if (action === "Settings") openApp("finder"); // Placeholder for Settings app
    if (action === "Shut Down") window.location.reload(); // Simple reload for now
    setActiveMenu(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[40px] bg-white/40 backdrop-blur-sm flex items-center justify-between px-3 z-[9999] select-none border-b border-white/20 text-sm font-medium font-sans text-black">
      {/* Left Menus */}
      <div className="flex items-center gap-1">
        {/* Apple Menu */}
        <div className="relative">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === "apple" ? null : "apple");
            }}
            className={`px-3 py-1 rounded hover:bg-white/50 cursor-pointer ${
              activeMenu === "apple" ? "bg-white/50" : ""
            }`}
          >
            <Image
              src="/assets/icons/logo.webp"
              width={16}
              height={16}
              alt="Logo"
              className="object-contain"
            />
          </div>
          {activeMenu === "apple" && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white/90 backdrop-blur-md border border-gray-300 shadow-xl rounded py-1 flex flex-col z-50">
              {menus.apple.map((item) => (
                <button
                  key={item}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick(item);
                  }}
                  className="text-left px-4 py-1 hover:bg-retro-highlight hover:text-white transition-colors text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Text Menus (File, Edit, View) */}
        {["File", "Edit", "View"].map((menu) => (
          <div key={menu} className="relative hidden sm:block">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === menu ? null : menu);
              }}
              className={`px-3 py-1 rounded hover:bg-white/50 cursor-pointer ${
                activeMenu === menu ? "bg-white/50" : ""
              }`}
            >
              {menu}
            </div>
            {/* Dropdown Logic (Simplified) */}
            {activeMenu === menu && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white/90 backdrop-blur-md border border-gray-300 shadow-xl rounded py-1 flex flex-col z-50">
                <div className="px-4 py-2 text-gray-400 italic text-xs">
                  Functionality coming soon...
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Status Indicators */}
      <div className="flex items-center gap-3">
        {/* WiFi */}
        <div
          className="hover:bg-white/50 p-1 rounded cursor-pointer"
          title="RetroOS Network: Connected"
        >
          <Image
            src="/assets/icons/wifi.webp"
            width={18}
            height={18}
            alt="WiFi"
          />
        </div>

        {/* Battery */}
        {battery && (
          <div
            className="flex items-center gap-2 hover:bg-white/50 px-2 py-1 rounded cursor-pointer"
            title={`${Math.round(battery.level)}% ${
              battery.charging ? "(Charging)" : ""
            }`}
          >
            <div className="relative w-[24px] h-[12px] border border-black rounded-[2px] p-[1px]">
              <div
                className={`h-full transition-all duration-500 ${
                  battery.level < 20 ? "bg-red-500" : "bg-black"
                }`}
                style={{ width: `${battery.level}%` }}
              />
              <div className="absolute -right-[3px] top-[3px] w-[2px] h-[4px] bg-black rounded-r-sm" />
            </div>
            {battery.charging && <span className="text-xs">⚡</span>}
          </div>
        )}

        {/* Clock */}
        <div className="font-vt323 text-xl w-[60px] text-center hover:bg-white/50 rounded cursor-pointer">
          {time}
        </div>
      </div>
    </div>
  );
}

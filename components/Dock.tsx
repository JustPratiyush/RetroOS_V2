"use client";

import Image from "next/image";
import { useOS, type AppId } from "@/context/OSContext";

const DOCK_APPS = [
  { id: "finder", label: "Finder", icon: "/assets/icons/finder.webp" },
  { id: "internet", label: "Internet", icon: "/assets/icons/internet.webp" },
  {
    id: "calculator",
    label: "Calculator",
    icon: "/assets/icons/calculator.webp",
  },
  { id: "music", label: "Music", icon: "/assets/icons/music.webp" },
  { id: "mail", label: "Mail", icon: "/assets/icons/mail.webp" },
  { id: "pizza", label: "Pizza", icon: "/assets/icons/pizza.webp" },
  { id: "terminal", label: "Terminal", icon: "/assets/icons/terminal.webp" },
  { id: "trash", label: "Trash", icon: "/assets/icons/trash.webp" },
] as const;

export default function Dock() {
  const { openApp, windows, focusApp } = useOS();

  const handleAppClick = (id: string) => {
    // Cast to our AppId type safely
    if (id in windows) {
      const appId = id as keyof typeof windows;
      if (windows[appId].isOpen) {
        focusApp(appId);
      } else {
        openApp(appId);
      }
    } else {
      // Handle external links or unimplemented apps
      if (id === "internet") window.open("https://google.com", "_blank");
      if (id === "pizza")
        window.open("https://buymeacoffee.com/justpratiyush", "_blank");
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="flex items-end gap-2 px-4 py-3 bg-white/40 backdrop-blur-md rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/30">
        {DOCK_APPS.map((app) => {
          const isOpen =
            app.id in windows &&
            windows[app.id as keyof typeof windows]?.isOpen;

          return (
            <div
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-200 ease-out hover:-translate-y-3 hover:scale-110 active:scale-95"
            >
              {/* Tooltip */}
              <span className="absolute -top-12 bg-black/80 text-white font-pixel text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/20">
                {app.label}
              </span>

              {/* Icon */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                <Image
                  src={app.icon}
                  alt={app.label}
                  fill
                  className="object-contain drop-shadow-md"
                  sizes="64px"
                />
              </div>

              {/* Active Indicator Dot */}
              <div
                className={`w-1.5 h-1.5 bg-black rounded-full mt-1 transition-opacity duration-300 ${
                  isOpen ? "opacity-60" : "opacity-0"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

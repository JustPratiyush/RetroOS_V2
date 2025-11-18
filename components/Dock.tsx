"use client";

import Image from "next/image";

// Define the apps available in the dock
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
];

export default function Dock() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-2 px-4 py-3 bg-white/40 backdrop-blur-md rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/30">
        {DOCK_APPS.map((app) => (
          <div
            key={app.id}
            className="group relative flex flex-col items-center cursor-pointer transition-all duration-200 ease-out hover:-translate-y-3 hover:scale-110"
          >
            {/* Tooltip Label */}
            <span className="absolute -top-10 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {app.label}
            </span>

            {/* Icon Background (Squircle) */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/60 shadow-sm group-hover:shadow-xl transition-all group-active:scale-95 flex items-center justify-center overflow-hidden">
              <Image
                src={app.icon}
                alt={app.label}
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 48px, 64px"
              />
            </div>

            {/* Active Indicator Dot (Static for now) */}
            {app.id === "finder" && (
              <div className="w-1 h-1 bg-black rounded-full mt-1 opacity-60" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

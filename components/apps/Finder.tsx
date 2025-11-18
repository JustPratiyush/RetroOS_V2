"use client";

import { useState } from "react";
import Image from "next/image";

// Mock File System Data
const FILE_SYSTEM: Record<
  string,
  Array<{ name: string; icon: string; type: "file" | "folder" }>
> = {
  Desktop: [
    { name: "ReadMe.txt", icon: "/assets/icons/TxtIcon.webp", type: "file" },
    { name: "Projects", icon: "/assets/icons/folderIcon.webp", type: "folder" },
    { name: "GitHub", icon: "/assets/icons/github.webp", type: "file" },
  ],
  Documents: [
    { name: "Resume.pdf", icon: "/assets/icons/TxtIcon.webp", type: "file" },
    { name: "Notes", icon: "/assets/icons/folderIcon.webp", type: "folder" },
  ],
  Downloads: [], // Empty folder test
  Projects: [
    { name: "RetroOS", icon: "/assets/icons/folderIcon.webp", type: "folder" },
    {
      name: "NextJS-Site",
      icon: "/assets/icons/folderIcon.webp",
      type: "folder",
    },
  ],
};

export default function Finder() {
  const [currentPath, setCurrentPath] = useState<string>("Desktop");

  return (
    <div className="flex h-full min-h-[300px] font-sans">
      {/* Sidebar */}
      <div className="w-[140px] bg-[#e0e0e0] border-r-2 border-black p-2 flex flex-col gap-1 shrink-0">
        <div className="font-bold text-xs text-gray-500 mb-1 px-2 uppercase">
          Favorites
        </div>
        {["Desktop", "Documents", "Downloads"].map((item) => (
          <div
            key={item}
            onClick={() => setCurrentPath(item)}
            className={`
              px-2 py-1 rounded cursor-pointer text-sm flex items-center gap-2
              ${
                currentPath === item
                  ? "bg-black text-white"
                  : "hover:bg-white/50 text-black"
              }
            `}
          >
            {/* Simple dot icon for active state */}
            <span
              className={`w-2 h-2 rounded-full ${
                currentPath === item ? "bg-white" : "bg-gray-400"
              }`}
            />
            {item}
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="flex flex-wrap gap-4 content-start">
          {FILE_SYSTEM[currentPath]?.length === 0 ? (
            <div className="text-gray-400 text-sm w-full text-center mt-10 italic">
              This folder is empty.
            </div>
          ) : (
            FILE_SYSTEM[currentPath]?.map((file) => (
              <div
                key={file.name}
                // Double click logic to "navigate" into folders
                onDoubleClick={() =>
                  file.type === "folder" && FILE_SYSTEM[file.name]
                    ? setCurrentPath(file.name)
                    : null
                }
                className="w-[80px] flex flex-col items-center gap-1 cursor-pointer group p-2 hover:bg-blue-100 rounded border border-transparent hover:border-blue-200"
              >
                <div className="relative w-10 h-10">
                  <Image
                    src={file.icon}
                    alt={file.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-center font-medium leading-tight break-words w-full group-hover:text-blue-700">
                  {file.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useDraggable } from "@/hooks/useDraggable";
import { X, Minus } from "lucide-react"; // Ensure you installed lucide-react (optional, or use text)

interface WindowProps {
  title: string;
  id: string;
  isOpen: boolean;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  initialPos?: { x: number; y: number };
}

export default function Window({
  title,
  isOpen,
  isActive,
  onClose,
  onFocus,
  children,
  initialPos,
}: WindowProps) {
  const { position, handleMouseDown, nodeRef } = useDraggable(
    initialPos || { x: 50, y: 50 }
  );

  if (!isOpen) return null;

  return (
    <div
      ref={nodeRef}
      onMouseDown={() => onFocus()} // Bring to front on click
      className={`absolute min-w-[300px] min-h-[200px] border-[3px] border-black shadow-[8px_8px_0_rgba(0,0,0,0.5)] bg-retro-panel overflow-hidden flex flex-col transition-opacity duration-100
        ${isActive ? "z-50" : "z-10"}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          h-9 px-2 flex items-center justify-between cursor-grab active:cursor-grabbing select-none
          ${
            isActive
              ? "bg-gradient-to-r from-retro-highlight to-blue-600 text-white"
              : "bg-retro-gray text-white/80"
          }
        `}
      >
        <span className="font-vt323 text-xl tracking-wide pt-1">{title}</span>

        {/* Controls */}
        <div className="window-controls flex gap-2">
          {/* Minimize (Placeholder logic) */}
          <button className="w-5 h-5 border-2 border-black bg-retro-green flex items-center justify-center hover:brightness-110 active:translate-y-[1px] active:shadow-none shadow-[1px_1px_0_black]">
            <div className="w-2 h-[2px] bg-black"></div>
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-5 h-5 border-2 border-black bg-retro-red flex items-center justify-center hover:brightness-110 active:translate-y-[1px] active:shadow-none shadow-[1px_1px_0_black]"
          >
            <span className="font-bold text-xs text-black leading-none mb-[1px]">
              ×
            </span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative overflow-auto p-2">
        {children}
      </div>
    </div>
  );
}

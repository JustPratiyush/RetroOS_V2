"use client";
import { useState, useEffect, useRef } from "react";
import { useOS, type AppId } from "@/context/OSContext";

interface WindowFrameProps {
  appId: AppId;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function WindowFrame({
  appId,
  title,
  children,
  className = "",
}: WindowFrameProps) {
  const { windows, closeApp, focusApp, minimizeApp } = useOS();
  const windowState = windows[appId];
  const [pos, setPos] = useState(windowState.position);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Update position when windowState.position changes (but not while dragging)
  useEffect(() => {
    if (!isDragging) {
      setPos(windowState.position);
    }
  }, [windowState.position, isDragging]);

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Early return after all hooks
  if (!windowState.isOpen || windowState.isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    focusApp(appId);
    // Only allow drag from header
    if ((e.target as HTMLElement).closest(".window-controls")) return;

    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  return (
    <div
      className={`absolute flex flex-col border-[3px] border-black bg-retro-panel shadow-[8px_8px_0_rgba(0,0,0,0.5)] overflow-hidden ${className}`}
      style={{
        left: pos.x,
        top: pos.y,
        zIndex: windowState.zIndex,
      }}
      onMouseDown={() => focusApp(appId)}
    >
      {/* Title Bar */}
      <div
        className="h-[34px] bg-[#333] text-white flex items-center justify-between px-2 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="font-vt323 text-xl mt-1">{title}</span>
        <div className="window-controls flex gap-1.5">
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeApp(appId);
            }}
            className="w-[18px] h-[18px] rounded-full bg-retro-green border-2 border-black flex items-center justify-center text-black font-bold text-xs hover:opacity-80"
          >
            -
          </button>
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeApp(appId);
            }}
            className="w-[18px] h-[18px] rounded-full bg-retro-red border-2 border-black flex items-center justify-center text-black font-bold text-xs hover:opacity-80"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-auto relative">{children}</div>
    </div>
  );
}

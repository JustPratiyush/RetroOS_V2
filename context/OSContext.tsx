"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type AppId = "finder" | "terminal" | "music" | "calculator" | "trash" | "mail" | "internet";

interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

interface OSContextType {
  windows: Record<AppId, WindowState>;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>({
    finder: {
      id: "finder",
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      position: { x: 100, y: 80 },
    },
    terminal: {
      id: "terminal",
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      position: { x: 50, y: 150 },
    },
    music: {
      id: "music",
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      position: { x: 250, y: 100 },
    },
    calculator: {
      id: "calculator",
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      position: { x: 200, y: 200 },
    },
    trash: {
      id: "trash",
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      position: { x: 300, y: 300 },
    },
    mail: {
      id: "mail",
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      position: { x: 150, y: 150 },
    },
    internet: {
      id: "internet",
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      position: { x: 200, y: 100 },
    },
  });

  const [maxZ, setMaxZ] = useState(10);

  const focusApp = (id: AppId) => {
    setMaxZ((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZ + 1, isMinimized: false },
    }));
  };

  const openApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true },
    }));
    focusApp(id);
  };

  const closeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const minimizeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  };

  return (
    <OSContext.Provider
      value={{ windows, openApp, closeApp, focusApp, minimizeApp }}
    >
      {children}
    </OSContext.Provider>
  );
}

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) throw new Error("useOS must be used within an OSProvider");
  return context;
};

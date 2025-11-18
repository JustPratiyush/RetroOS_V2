"use client";

import { useEffect, useRef, useState } from "react";

// Floating Note Component
const FloatingNote = ({ x, y }: { x: number; y: number }) => {
  const notes = ["♪", "♫", "♬", "♩", "♭", "♮"];
  const note = notes[Math.floor(Math.random() * notes.length)];

  return (
    <div
      className="fixed pointer-events-none text-black font-serif select-none animate-float-up z-[9999]"
      style={{
        left: x,
        top: y,
        fontSize: `${Math.random() * 20 + 15}px`,
        animationDuration: `${Math.random() * 1.5 + 1.5}s`,
      }}
    >
      {note}
    </div>
  );
};

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    const interval = setInterval(() => {
      if (!containerRef.current) return;

      // Get window position to spawn notes relative to the app window
      const rect = containerRef.current.getBoundingClientRect();

      const newNote = {
        id: Date.now(),
        x: rect.left + Math.random() * rect.width,
        y: rect.top + rect.height / 2,
      };

      setNotes((prev) => [...prev, newNote]);

      // Cleanup old notes
      setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== newNote.id));
      }, 2000);
    }, 600); // Spawn rate

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div ref={containerRef} className="h-full bg-[#1f1f1f] flex flex-col">
      {/* Note Renderer */}
      {notes.map((note) => (
        <FloatingNote key={note.id} x={note.x} y={note.y} />
      ))}

      {/* Spotify Embed */}
      <div className="flex-1 relative">
        {/* Overlay to detect clicks (simple way to toggle 'playing' state for visuals) */}
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
          title="Click anywhere to toggle visual effects"
        />

        <iframe
          style={{ borderRadius: 0 }}
          src="https://open.spotify.com/embed/playlist/6TJxITfc7J0PKxMy44OtKB?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="pointer-events-none" // Pass clicks to overlay
        />
      </div>

      <div className="h-8 bg-black text-retro-green font-vt323 text-center text-sm flex items-center justify-center border-t border-[#333]">
        {isPlaying
          ? "▶ Visualizer Active"
          : "❚❚ Visualizer Paused (Click Art to Toggle)"}
      </div>
    </div>
  );
}

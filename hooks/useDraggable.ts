import { useState, useEffect, useRef, useCallback } from "react";

export function useDraggable(initialPosition = { x: 100, y: 100 }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!nodeRef.current) return;
    // Prevent dragging if clicking strictly on controls (close buttons)
    if ((e.target as HTMLElement).closest(".window-controls")) return;

    setIsDragging(true);
    const rect = nodeRef.current.getBoundingClientRect();

    // Calculate offset from the top-left corner of the window
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return { position, handleMouseDown, nodeRef, isDragging };
}

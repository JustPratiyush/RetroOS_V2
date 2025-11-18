"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  const handleInput = (val: string) => {
    if (val === "AC") {
      setDisplay("");
    } else if (val === "=") {
      try {
        // Safe-ish eval for calculator logic
        // Note: In a production app, use a proper math parser library
        let sanitized = display
          .replace("×", "*")
          .replace("÷", "/")
          .replace("^", "**");
        // Handle percentage: convert "50%" to "*0.01" when followed by operator or at end
        sanitized = sanitized.replace(/(\d+)%/g, "($1*0.01)");
        const result = new Function("return " + sanitized)();
        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay((prev) => prev + val);
    }
  };

  const buttons = [
    "AC",
    "^",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <div className="h-full bg-[#f0f0f0] p-4 flex flex-col gap-3 font-vt323">
      {/* Display */}
      <div className="bg-white border-2 border-[#999] shadow-inner h-16 flex items-end justify-end p-2 text-3xl font-bold overflow-hidden">
        {display || "0"}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleInput(btn)}
            className={`
              border-2 border-black rounded shadow-[2px_2px_0_rgba(0,0,0,0.2)]
              text-xl font-bold active:translate-y-0.5 active:shadow-none transition-all
              ${
                btn === "="
                  ? "bg-retro-highlight text-white col-span-2"
                  : "bg-[#f8f8f8] hover:bg-white"
              }
              ${btn === "AC" ? "bg-retro-red text-white border-retro-red" : ""}
              ${btn === "0" ? "col-span-2" : ""}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

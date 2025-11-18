"use client";
import { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to Retro OS Terminal v2.1",
    "[INFO] Type 'help' to see available commands.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(" ");
    const command = args[0].toLowerCase();

    let output = "";

    switch (command) {
      case "help":
        output = "Available: help, ls, clear, whoami, date, neofetch, about";
        break;
      case "whoami":
        output = "You are the Most Brilliant Person - Visitor";
        break;
      case "clear":
        setHistory([]);
        return;
      case "ls":
        output = "Projects/  Applications/  Desktop/  ReadMe.txt";
        break;
      case "date":
        output = new Date().toLocaleString();
        break;
      case "neofetch":
        // We push raw HTML for the ASCII art in the render loop
        output = "neofetch_trigger";
        break;
      default:
        output = `Command not found: ${command}`;
    }

    setHistory((prev) => [...prev, `visitor@retro-os:~$ ${cmd}`, output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input.trim()) handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className="h-full bg-[#1a1a1a] text-[#e0e0e0] font-vt323 text-xl p-2 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex flex-col gap-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all leading-tight">
            {line === "neofetch_trigger" ? (
              <pre className="text-retro-highlight leading-none text-sm">
                {`
       .:'
    _ :'_      OS: RetroOS v3.0 (Next.js)
 .-\`/.  \\'-.   Host: Vercel
((  |  _  |    Kernel: React 19
 )   \\/  \\     Uptime: Forever
 '.._  _..'    Shell: ZSH
     ''
`}
              </pre>
            ) : // Basic coloring for prompt
            line.startsWith("visitor") ? (
              <span>
                <span className="text-[#e5c07b]">visitor</span>
                <span className="text-white">@</span>
                <span className="text-[#c678dd]">retro-os</span>
                <span className="text-white">:~$ </span>
                <span className="text-[#6aff00]">{line.split("~$ ")[1]}</span>
              </span>
            ) : (
              <span className="text-[#e0e0e0]">{line}</span>
            )}
          </div>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center mt-1">
        <span className="text-[#e5c07b]">visitor</span>
        <span className="text-white">@</span>
        <span className="text-[#c678dd]">retro-os</span>
        <span className="text-white">:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[#6aff00] ml-2 caret-[#00ff1e]"
          autoFocus
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

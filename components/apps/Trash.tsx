"use client";
import { useState } from "react";
import Image from "next/image";

type TrashState =
  | "folder"
  | "sleeping_dog"
  | "happy_dog"
  | "wise_dog"
  | "empty";

const FOLDER_MESSAGES = [
  "DO NOT OPEN",
  "Are you sure?",
  "Seriously, stop.",
  "Last chance.",
  "Fine.",
];

export default function Trash() {
  const [clickCount, setClickCount] = useState(0);
  const [stage, setStage] = useState<TrashState>("folder");
  const [text, setText] = useState("");

  const handleFolderClick = () => {
    if (clickCount < FOLDER_MESSAGES.length - 1) {
      setClickCount((prev) => prev + 1);
    } else {
      setStage("sleeping_dog");
      typewriter("The dog slowly opens one eye...\n'You finally arrived.'");
    }
  };

  const typewriter = (txt: string) => {
    setText("");
    let i = 0;
    const timer = setInterval(() => {
      setText(txt.substring(0, i + 1));
      i++;
      if (i === txt.length) clearInterval(timer);
    }, 50);
  };

  const handleAction = (action: "pet" | "kill" | "red" | "blue") => {
    if (action === "pet") {
      setStage("happy_dog");
      typewriter(
        "He wags his tail. 'I am Morphy. Are you ready to see the truth?'"
      );
    } else if (action === "kill") {
      setStage("empty");
    } else if (action === "red") {
      setStage("wise_dog");
      typewriter("You chose the Red Pill. Welcome to the real world.");
    }
  };

  // Render Stages
  if (stage === "folder") {
    return (
      <div
        className="flex flex-col items-center justify-center h-full p-4"
        onDoubleClick={handleFolderClick}
      >
        <div className="w-20 h-20 relative cursor-pointer hover:opacity-80">
          <Image
            src="/assets/icons/folderIcon.webp"
            alt="Secret"
            fill
            className="object-contain"
          />
        </div>
        <span className="mt-2 font-vt323 text-xl">
          {FOLDER_MESSAGES[clickCount]}
        </span>
      </div>
    );
  }

  if (stage === "empty") {
    return (
      <div className="flex items-center justify-center h-full font-vt323 text-2xl text-red-600">
        You monster.
      </div>
    );
  }

  return (
    <div className="h-full bg-[#0d2a0d] text-[#e0e0e0] flex flex-col items-center p-4 font-vt323 text-xl text-center">
      <div className="min-h-[60px] whitespace-pre-wrap mb-4 text-retro-green">
        {text}
      </div>

      <div className="relative w-40 h-40 mb-6">
        <Image
          src={
            stage === "sleeping_dog"
              ? "/assets/icons/sleeping_dog.webp"
              : "/assets/icons/happy_dog.webp"
          }
          alt="Dog"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex gap-4">
        {stage === "sleeping_dog" && (
          <button
            onClick={() => handleAction("pet")}
            className="border-2 border-retro-green text-retro-green px-4 py-1 hover:bg-retro-green hover:text-black transition"
          >
            Pet the dog
          </button>
        )}
        {stage === "happy_dog" && (
          <>
            <button
              onClick={() => handleAction("red")}
              className="border-2 border-red-500 text-red-500 px-4 py-1 hover:bg-red-500 hover:text-white transition"
            >
              Red Pill
            </button>
            <button
              onClick={() => handleAction("kill")}
              className="border-2 border-blue-500 text-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white transition"
            >
              Blue Pill
            </button>
          </>
        )}
      </div>
    </div>
  );
}

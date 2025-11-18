"use client";

import { useState } from "react";
import Image from "next/image";

export default function Internet() {
  const [url, setUrl] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    const target = url.includes(".")
      ? `https://${url}`
      : `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    window.open(target, "_blank");
    setUrl("");
  };

  return (
    <div className="h-full bg-white flex flex-col items-center pt-10 px-4">
      <div className="relative w-[280px] h-[100px] mb-6">
        {/* Replaces source 180 image */}
        <Image
          src="/assets/icons/snoogle.webp"
          alt="Snoogle"
          fill
          className="object-contain"
        />
      </div>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-[400px] flex flex-col gap-4"
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Search or type a URL"
          className="w-full border-2 border-gray-400 rounded-md px-4 py-2 font-vt323 text-xl shadow-inner outline-none focus:border-retro-highlight"
        />

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="px-4 py-1 bg-[#f2f2f2] border border-gray-300 rounded hover:shadow text-sm font-sans text-gray-700"
          >
            Snoogle Search
          </button>
          <button
            type="button"
            className="px-4 py-1 bg-[#f2f2f2] border border-gray-300 rounded hover:shadow text-sm font-sans text-gray-700"
          >
            I'm Feeling Lucky
          </button>
        </div>
      </form>

      <div className="mt-12 w-full">
        <div className="font-vt323 text-xl text-gray-500 mb-4 pl-4">
          Follow me here!
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              name: "Twitter",
              icon: "/assets/icons/twitter.webp",
              link: "https://x.com/JustPratiyush",
            },
            {
              name: "GitHub",
              icon: "/assets/icons/github.webp",
              link: "https://github.com/JustPratiyush",
            },
            {
              name: "LinkedIn",
              icon: "/assets/icons/linkedin.webp",
              link: "https://www.linkedin.com/in/abhinav-kuchhal/",
            },
            {
              name: "YouTube",
              icon: "/assets/icons/youtube.webp",
              link: "https://www.youtube.com/@JustPratiyush",
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              className="flex flex-col items-center gap-2 group cursor-pointer decoration-0"
            >
              <div className="relative w-12 h-12 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,0.3)] group-hover:-translate-y-1 transition-transform flex items-center justify-center">
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-sans text-xs font-bold text-black">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

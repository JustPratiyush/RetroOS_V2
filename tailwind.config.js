/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          panel: "#e9e4d5",
          black: "#000000",
          gray: "#333333",
          highlight: "#4a90e2",
          red: "#ff5f57",
          green: "#32cd32",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixelify)", "sans-serif"],
        vt323: ["var(--font-vt323)", "monospace"],
      },
      backgroundImage: {
        wallpaper: "url('/assets/wallpapers/wallpaper0.webp')", // Default wallpaper
      },
      animation: {
        "boot-progress": "progress 2s linear forwards",
      },
    },
  },
  plugins: [],
};

import type { Metadata } from "next";
import { Pixelify_Sans, VT323 } from "next/font/google";
import "./globals.css";

// Initialize Fonts
const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixelify",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "RetroOS — Next.js Edition",
  description: "A nostalgic operating system portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelify.variable} ${vt323.variable} font-sans`}>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}

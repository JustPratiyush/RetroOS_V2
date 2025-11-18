import type { Metadata } from "next";
import { Pixelify_Sans, VT323 } from "next/font/google";
import "./globals.css";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixelify", // This matches globals.css
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323", // This matches globals.css
});

export const metadata: Metadata = {
  title: "RetroOS",
  description: "Retro Operating System Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelify.variable} ${vt323.variable} antialiased`}>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}

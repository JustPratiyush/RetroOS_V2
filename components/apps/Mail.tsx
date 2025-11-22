"use client";

import { useState } from "react";

export default function Mail() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message, name: email.split('@')[0] }),
      });

      if (res.ok) {
        setStatus("sent");
        // Clear form
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("Failed to send. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="text-4xl mb-2">📨</div>
        <h3 className="font-vt323 text-2xl">Message Sent!</h3>
        <p className="font-sans text-sm text-gray-600 mt-2">
          I will get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-4 py-2 bg-retro-highlight text-white font-bold border-2 border-black shadow-[3px_3px_0_black] active:translate-y-[1px] active:shadow-[2px_2px_0_black]"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col font-vt323 text-lg">
      <form className="flex flex-col h-full" onSubmit={handleSubmit}>
        <div className="flex items-center px-3 py-2 border-b-2 border-[#ccc]">
          <label className="w-16 font-bold">To:</label>
          <input
            type="text"
            value="Abhinav Kuchhal (Me)"
            readOnly
            className="flex-1 bg-transparent outline-none text-gray-600"
          />
        </div>
        <div className="flex items-center px-3 py-2 border-b-2 border-[#ccc]">
          <label className="w-16 font-bold">From:</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <div className="flex items-center px-3 py-2 border-b-2 border-[#ccc]">
          <label className="w-16 font-bold">Subject:</label>
          <input
            type="text"
            placeholder="Regarding your project..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="flex-1 bg-transparent outline-none"
          />
        </div>

        <textarea
          className="flex-1 p-3 outline-none resize-none bg-[#fff] text-xl font-vt323"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="p-3 border-t-2 border-[#ccc] bg-[#f0f0f0] flex justify-end">
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-2 bg-retro-highlight text-white font-sans font-bold text-sm border-2 border-black shadow-[3px_3px_0_black] active:translate-y-[1px] active:shadow-[2px_2px_0_black] hover:brightness-110 disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}

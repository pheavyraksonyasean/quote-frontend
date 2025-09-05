import { useState, useEffect } from "react";
import Button from "./button";

interface Quote { quote: string; author: string; }

function getApiBase() {
  // Works in Vite and CRA; has a safe fallback
  const vite = (typeof import.meta !== "undefined" && (import.meta as any)?.env?.VITE_API_BASE) as string | undefined;
  const cra  = (process.env.REACT_APP_API_BASE) as string | undefined;
  return vite || cra || "https://quote-backend-gxgs.onrender.com";
}

async function fetchWithRetry(url: string, attempts = 3, delayMs = 2000) {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw lastErr;
}

const Card = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const API_BASE = getApiBase();

  const fetchQuote = async () => {
    setError(null);
    try {
      const data: Quote = await fetchWithRetry(`${API_BASE}/api/random-quote`, 3, 2000);
      setQuote(data);
    } catch (e) {
      console.error("Failed to fetch quote:", e);
      setError("Couldn’t reach the API. Try again in a moment.");
    }
  };

  useEffect(() => { fetchQuote(); }, []); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#F2E1E1]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-[#FFFFFF]">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-mono text-slate-800 dark:text-[#bd6868]">Quote Generator</h1>
          <p className="mt-2 text-sm font-mono text-slate-500 dark:text-[#bd6868]">Find inspiration from the world's greatest minds.</p>
        </div>

        <div className="relative p-6 bg-slate-50 rounded-lg dark:bg-white border-[#DE9999] border-2">
          {error ? (
            <p className="font-serif text-lg text-red-600">{error}</p>
          ) : quote ? (
            <>
              <p className="font-serif text-lg italic text-slate-700 dark:text-[#573030]">"{quote.quote}"</p>
              <p className="mt-4 font-semibold text-right text-[#573030]">- {quote.author}</p>
            </>
          ) : (
            <p className="font-serif text-lg italic text-slate-700 dark:text-[#573030]">
              Loading… 
            </p>
          )}
        </div>

        <hr className="border-slate-200 dark:border-[#bd6868]" />
        <Button onClick={fetchQuote} />
      </div>
    </div>
  );
};

export default Card;

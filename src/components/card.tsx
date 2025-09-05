import { useState, useEffect } from 'react';
import Button from "./button";

interface Quote {
  quote: string;
  author: string;
}
const Card = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const fetchQuote = async () => {
    try {
      // API endpoint
      const response = await fetch('http://localhost:3000/api/random-quote');
      const data: Quote = await response.json();
      setQuote(data); 
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []); 
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#F2E1E1]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-[#FFFFFF]">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-mono text-slate-800 dark:text-[#bd6868]">
            Quote Generator
          </h1>
          <p className="mt-2 text-sm font-mono text-slate-500 dark:text-[#bd6868]">
            Find inspiration from the world's greatest minds.
          </p>
        </div>
        <div className="relative p-6 bg-slate-50 rounded-lg dark:bg-white border-[#DE9999] border-2">
          {quote ? (
            <>
              <p className="font-serif text-lg italic text-slate-700 dark:text-[#573030]">
                "{quote.quote}"
              </p>
              <p className="mt-4 font-semibold text-right text-[#573030]">
                - {quote.author}
              </p>
            </>
          ) : (
            <p className="font-serif text-lg italic text-slate-700 dark:text-[#573030]">
              Loading...
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
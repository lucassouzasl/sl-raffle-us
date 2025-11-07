"use client";

import { useEffect, useState } from "react";

export default function RaffleLoading() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["#ABBC74", "#A48151", "#1e1e1e"];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="relative">
        <svg
          className="animate-spin w-40 h-40"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={colors[colorIndex]}
            strokeWidth="8"
            strokeDasharray="70 200"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-6xl font-black text-slate-900`}>SL</span>
        </div>
      </div>
      <span className="text-black font-bold text-transform: uppercase mt-2">
        Sorteando...
      </span>
    </div>
  );
}

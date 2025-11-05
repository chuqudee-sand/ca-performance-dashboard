// src/components/InsightBox.tsx
import React from "react";

type Props = {
  title: string;
  bullets: string[];
  className?: string;
};

export default function InsightBox({ title, bullets, className = "" }: Props) {
  return (
    <div className={`bg-darkCard border border-neutral-700 rounded-lg p-4 ${className}`}>
      <div className="text-alxRed font-semibold mb-2">{title}</div>
      <div className="text-sm text-gray-300 space-y-1">
        {bullets.map((b, i) => (
          <p key={i}>{b}</p>
        ))}
      </div>
    </div>
  );
}

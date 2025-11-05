// src/components/KpiCard.tsx
import React from "react";

type Props = {
  title: string;
  value: string | number;
  delta?: string | number;
  subtitle?: string;
};

export default function KpiCard({ title, value, delta, subtitle }: Props) {
  return (
    <div className="bg-gradient-to-b from-[#111111] to-darkCard border border-neutral-700 rounded-xl p-4 w-full">
      <div className="text-xs text-gray-400">{title}</div>
      <div className="flex items-baseline gap-3 mt-2">
        <div className="text-2xl font-bold text-white">{value}</div>
        {delta && <div className="text-sm text-green-400">{delta}</div>}
      </div>
      {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
    </div>
  );
}

// src/components/ProgramTrendLine.tsx
"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Row = Record<string, string | number>;

export default function ProgramTrendLine({ rows, program }: { rows: Row[]; program: string }) {
  const data = useMemo(() => {
    return rows.map(r => ({
      cohort: r.Cohort,
      grad: Number(r["Graduation Rate"] ?? 0),
    }));
  }, [rows]);

  return (
    <div className="bg-darkCard p-3 rounded-lg border border-neutral-700">
      <h4 className="text-white font-semibold mb-2">{program} — Cohort Trend</h4>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="#222" />
          <XAxis dataKey="cohort" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="grad" stroke="#E22D2D" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

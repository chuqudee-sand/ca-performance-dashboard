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

type Row = {
  Program: string;
  Sprint: string;
  Cohort: string;
  Country: string;
  Enrolled: string | number;
  Activated: string | number;
  Graduated: string | number;
  "Activation Rate"?: string | number;
  "Graduation Rate"?: string | number;
  "Completion Rate"?: string | number;
};

export default function ProgramTrendLine({
  rows,
  program,
}: {
  rows: Row[];
  program: string;
}) {
  const data = useMemo(() => {
    return rows.map(r => ({
      cohort: r.Cohort,
      grad: Number(r["Graduation Rate"] ?? 0),
      completion: Number(r["Completion Rate"] ?? 0),
    }));
  }, [rows]);

  return (
    <div className="bg-darkCard p-3 rounded-lg border border-neutral-700">
      <h4 className="text-white font-semibold mb-2">{program} — Cohort graduation trend</h4>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="cohort" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="grad" stroke="#E22D2D" strokeWidth={2} dot />
            <Line type="monotone" dataKey="completion" stroke="#60a5fa" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

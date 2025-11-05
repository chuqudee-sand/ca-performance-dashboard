// src/components/ProgramCharts.tsx
"use client";
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
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

export function ProgramSprintBar({ rows, program }: { rows: Row[]; program: string }) {
  // rows expected to be already filtered by program and aggregated by sprint
  const aggregated = useMemo(() => {
    const map = new Map<string, any>();
    rows.forEach((r) => {
      const s = String(r.Sprint);
      const en = Number(r.Enrolled ?? 0);
      const ac = Number(r.Activated ?? 0);
      const gr = Number(r.Graduated ?? 0);
      if (!map.has(s)) map.set(s, { sprint: s, Enrolled: 0, Activated: 0, Graduated: 0 });
      const obj = map.get(s);
      obj.Enrolled += en;
      obj.Activated += ac;
      obj.Graduated += gr;
    });
    return Array.from(map.values()).map((d) => ({
      sprint: d.sprint,
      ActivationRate: d.Activated === 0 ? 0 : Number(((d.Activated / d.Enrolled) * 100).toFixed(1)),
      GraduationRate: d.Enrolled === 0 ? 0 : Number(((d.Graduated / d.Enrolled) * 100).toFixed(1)),
    }));
  }, [rows]);

  return (
    <div className="bg-darkCard p-3 rounded-lg border border-neutral-700">
      <h3 className="text-white font-semibold mb-2">{program} — Sprint comparison</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={aggregated}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="sprint" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Legend />
            <Bar dataKey="ActivationRate" name="Activation (%)" fill="#16a34a" />
            <Bar dataKey="GraduationRate" name="Graduation (%)" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProgramTrendLine({ rows, program }: { rows: Row[]; program: string }) {
  // use cohort-level graduation rate trend
  const data = useMemo(() => {
    // sort by cohort string
    const arr = rows.map((r) => ({
      cohort: r.Cohort,
      grad: Number(r["Graduation Rate"] ?? r["GraduationRate"] ?? 0),
      completion: Number(r["Completion Rate"] ?? 0),
    }));
    return arr;
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

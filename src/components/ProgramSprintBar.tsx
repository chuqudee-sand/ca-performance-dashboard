// src/components/ProgramSprintBar.tsx
"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Row = Record<string, string | number>;

export default function ProgramSprintBar({ rows, program }: { rows: Row[]; program: string }) {
  const data = useMemo(() => {
    const map = new Map<string, any>();
    rows.forEach(r => {
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
    return Array.from(map.values()).map(d => ({
      sprint: d.sprint,
      ActivationRate: d.Enrolled ? Number(((d.Activated / d.Enrolled) * 100).toFixed(1)) : 0,
      GraduationRate: d.Enrolled ? Number(((d.Graduated / d.Enrolled) * 100).toFixed(1)) : 0,
    }));
  }, [rows]);

  return (
    <div className="bg-darkCard p-3 rounded-lg border border-neutral-700">
      <h3 className="text-white font-semibold mb-2">{program} — Sprint Comparison</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
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
  );
}

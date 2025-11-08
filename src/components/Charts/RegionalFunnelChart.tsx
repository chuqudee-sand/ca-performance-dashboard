// src/components/Charts/RegionalFunnelChart.tsx
"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function RegionalFunnelChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="Country" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip formatter={(v: number) => v.toLocaleString()} />
        <Bar dataKey="Enrolled" fill="#4B5563" />
        <Bar dataKey="Activated" fill="#10B981" />
        <Bar dataKey="Graduated" fill="#E22D2D" />
      </BarChart>
    </ResponsiveContainer>
  );
}

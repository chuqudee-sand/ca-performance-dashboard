// src/components/Charts/FunnelChartClient.tsx
"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function FunnelChartClient({ data }: { data: { stage: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip formatter={(v: number) => v.toLocaleString()} />
        <Bar dataKey="value" fill="#E22D2D" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

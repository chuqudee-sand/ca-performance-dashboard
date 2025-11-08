// src/components/Charts/PieChartClient.tsx
"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function PieChartClient({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, e) => s + e.value, 0);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={(p: any) => {
            const pct = total ? ((p.value / total) * 100).toFixed(0) : 0;
            return `${p.payload.name} ${pct}%`;
          }}
        >
          {data.map((e, i) => (
            <Cell key={i} fill={e.color} />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => v.toLocaleString()} />
      </PieChart>
    </ResponsiveContainer>
  );
}

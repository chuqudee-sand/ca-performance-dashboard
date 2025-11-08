// src/components/Charts/NPSLineChart.tsx
"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function NPSLineChart({ data }: { data: { sprint: string; NPS: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="sprint" stroke="#9CA3AF" />
        <YAxis domain={[0, 100]} stroke="#9CA3AF" />
        <Tooltip />
        <Line type="monotone" dataKey="NPS" stroke="#FBBF24" strokeWidth={3} dot />
      </LineChart>
    </ResponsiveContainer>
  );
}

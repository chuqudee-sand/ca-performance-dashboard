// src/components/Charts/CSATLineChart.tsx
"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function CSATLineChart({ data }: { data: { sprint: string; CSAT: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="sprint" stroke="#9CA3AF" />
        <YAxis domain={[0, 5]} stroke="#9CA3AF" />
        <Tooltip />
        <Line type="monotone" dataKey="CSAT" stroke="#E22D2D" strokeWidth={3} dot />
      </LineChart>
    </ResponsiveContainer>
  );
}

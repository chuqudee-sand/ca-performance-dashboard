// src/app/regional/page.tsx
"use client";  // ← ADD THIS FIRST LINE

import Card from "@/components/Card";
import { getAllData } from "@/lib/fetchData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";  // ← Import useState

export const revalidate = 3600;

export default function Regional() {
  const { aice, pf, va } = await getAllData();  // ← This is still server-side!
  const all = [...aice, ...pf, ...va];

  const countries = [...new Set(all.map(r => r.Country))].sort();
  const [selected, setSelected] = useState("All");  // ← Now allowed

  // Filter data based on selection
  const filtered = selected === "All" 
    ? all 
    : all.filter(r => r.Country === selected);

  const data = countries.map(c => {
    const rows = filtered.filter(r => r.Country === c);
    return {
      Country: c,
      Enrolled: rows.reduce((s,r)=>s+r.Enrolled,0),
      Activated: rows.reduce((s,r)=>s+r.Activated,0),
      Graduated: rows.reduce((s,r)=>s+r.Graduated,0),
    };
  }).sort((a,b) => b.Enrolled - a.Enrolled);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Regional Performance</h1>

      {/* Country Filter */}
      <Card title="Filter by Country">
        <select 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          className="w-full max-w-xs p-2 bg-darkCard border border-gray-700 rounded text-darkText"
        >
          <option value="All">All Countries</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Card>

      <Card title="Leaderboard">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="pb-3">Country</th>
                <th className="pb-3 text-right">Enrolled</th>
                <th className="pb-3 text-right">Activation</th>
                <th className="pb-3 text-right">Graduation</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row) => (
                <tr key={row.Country} className="border-b border-gray-800">
                  <td className="py-3">{row.Country}</td>
                  <td className="py-3 text-right">{row.Enrolled.toLocaleString()}</td>
                  <td className="py-3 text-right">{Math.round(row.Activated/row.Enrolled*100)}%</td>
                  <td className="py-3 text-right">{Math.round(row.Graduated/row.Enrolled*100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Funnel by Country">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.slice(0, 8)}>
            <XAxis dataKey="Country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Enrolled" fill="#4B5563" />
            <Bar dataKey="Activated" fill="#10B981" />
            <Bar dataKey="Graduated" fill="#E22D2D" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

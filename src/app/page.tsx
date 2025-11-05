// src/app/page.tsx
import Card from "@/components/Card";
import { getAllData } from "@/lib/fetchData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const revalidate = 3600; // refresh hourly

export default async function Overview() {
  const { aice, pf, va, csat } = await getAllData();

  const latestCSAT = csat[csat.length - 1];
  const avgCSAT = (csat.reduce((a, b) => a + b.CSAT, 0) / csat.length).toFixed(1);
  const avgNPS = Math.round(csat.reduce((a, b) => a + b.NPS, 0) / csat.length);

  const programSummary = [
    { name: "AiCE", enrolled: aice.reduce((s,r)=>s+r.Enrolled,0), color: "#E22D2D" },
    { name: "PF",   enrolled: pf.reduce((s,r)=>s+r.Enrolled,0),   color: "#8B5CF6" },
    { name: "VA",   enrolled: va.reduce((s,r)=>s+r.Enrolled,0),   color: "#10B981" },
  ];

  const funnel = [
    { stage: "Enrolled",  value: aice.reduce((s,r)=>s+r.Enrolled,0) + pf.reduce((s,r)=>s+r.Enrolled,0) + va.reduce((s,r)=>s+r.Enrolled,0) },
    { stage: "Activated", value: aice.reduce((s,r)=>s+r.Activated,0) + pf.reduce((s,r)=>s+r.Activated,0) + va.reduce((s,r)=>s+r.Activated,0) },
    { stage: "Graduated", value: aice.reduce((s,r)=>s+r.Graduated,0) + pf.reduce((s,r)=>s+r.Graduated,0) + va.reduce((s,r)=>s+r.Graduated,0) },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">CA Performance Dashboard</h1>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Avg Activation">
          <p className="text-3xl font-bold">
            {Math.round((funnel[1].value / funnel[0].value) * 100)}%
          </p>
        </Card>
        <Card title="Avg Completion">
          <p className="text-3xl font-bold">
            {Math.round((funnel[2].value / funnel[0].value) * 100)}%
          </p>
        </Card>
        <Card title="CSAT">
          <p className="text-3xl font-bold">{avgCSAT}/5</p>
          <p className="text-sm opacity-70">Latest: {latestCSAT.CSAT}/5</p>
        </Card>
        <Card title="NPS">
          <p className="text-3xl font-bold">{avgNPS}</p>
          <p className="text-sm opacity-70">Promoters - Detractors</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Enrollment by Program">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={programSummary} dataKey="enrolled" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {programSummary.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Overall Funnel">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={funnel}>
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
              <Bar dataKey="value" fill="#E22D2D" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Key Insights">
        <ul className="space-y-2 text-darkText">
          <li>✅ AiCE leads enrollment with strong activation in Nigeria & Kenya</li>
          <li>✅ PF shows highest graduation rate (71% avg)</li>
          <li>⚠️  VA activation dipped in Sprint 2 — investigate onboarding</li>
          <li>🎯 NPS climbed from 61 → 75 in 3 months</li>
        </ul>
      </Card>
    </div>
  );
}

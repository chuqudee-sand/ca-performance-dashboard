// src/app/page.tsx
import Card from "@/components/Card";
import { getAllData } from "@/lib/fetchData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const revalidate = 3600;

export default async function Overview() {
  const { aice, pf, va, csat } = await getAllData();

  const totalEnrolled =
    aice.reduce((s, r) => s + r.Enrolled, 0) +
    pf.reduce((s, r) => s + r.Enrolled, 0) +
    va.reduce((s, r) => s + r.Enrolled, 0);

  const totalActivated =
    aice.reduce((s, r) => s + r.Activated, 0) +
    pf.reduce((s, r) => s + r.Activated, 0) +
    va.reduce((s, r) => s + r.Activated, 0);

  const totalGraduated =
    aice.reduce((s, r) => s + r.Graduated, 0) +
    pf.reduce((s, r) => s + r.Graduated, 0) +
    va.reduce((s, r) => s + r.Graduated, 0);

  const avgCSAT = (csat.reduce((a, b) => a + b.CSAT, 0) / csat.length).toFixed(1);
  const avgNPS = Math.round(csat.reduce((a, b) => a + b.NPS, 0) / csat.length);
  const latestCSAT = csat[csat.length - 1];

  const programData = [
    { name: "AiCE", value: aice.reduce((s, r) => s + r.Enrolled, 0), color: "#E22D2D" },
    { name: "PF",   value: pf.reduce((s, r) => s + r.Enrolled, 0),   color: "#8B5CF6" },
    { name: "VA",   value: va.reduce((s, r) => s + r.Enrolled, 0),   color: "#10B981" },
  ];

  const totalForPie = programData.reduce((s, e) => s + e.value, 0);

  const funnelData = [
    { stage: "Enrolled",  value: totalEnrolled },
    { stage: "Activated", value: totalActivated },
    { stage: "Graduated", value: totalGraduated },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      <h1 className="text-4xl font-bold text-alxRed">CA Performance Dashboard</h1>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Avg Activation">
          <p className="text-3xl font-bold">
            {totalEnrolled ? Math.round((totalActivated / totalEnrolled) * 100) : 0}%
          </p>
        </Card>
        <Card title="Avg Completion">
          <p className="text-3xl font-bold">
            {totalEnrolled ? Math.round((totalGraduated / totalEnrolled) * 100) : 0}%
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

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie */}
        <Card title="Enrollment by Program">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={programData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={(props: any) => {
                  const { payload, value } = props;
                  const percent = totalForPie ? ((value as number) / totalForPie) * 100 : 0;
                  return `${payload.name} ${percent.toFixed(0)}%`;
                }}
              >
                {programData.map((e, i) => (
                  <Cell key={`cell-${i}`} fill={e.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Funnel */}
        <Card title="Overall Funnel">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={funnelData}>
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
              <Bar dataKey="value" fill="#E22D2D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Key Insights">
        <ul className="space-y-2 text-darkText">
          <li>AiCE dominates enrollment in Nigeria and Kenya</li>
          <li>PF has the highest graduation rate across cohorts</li>
          <li>VA activation dipped in Sprint 2 — investigate onboarding</li>
          <li>NPS improved from 61 to 75 over 3 months</li>
        </ul>
      </Card>
    </div>
  );
}

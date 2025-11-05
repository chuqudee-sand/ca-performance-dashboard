// src/app/sprint/page.tsx
import Card from "@/components/Card";
import { getAllData } from "@/lib/fetchData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const revalidate = 3600;

export default async function Sprint() {
  const { csat, aice, pf, va } = await getAllData();

  const sprintData = csat.map(row => ({
    sprint: `${row.Sprint} ${row.Cohort}`,
    AiCE: csat.find(c => c.Program === "AiCE" && c.Sprint === row.Sprint)?.CSAT || 0,
    PF:   csat.find(c => c.Program === "PF"   && c.Sprint === row.Sprint)?.CSAT || 0,
    VA:   csat.find(c => c.Program === "VA"   && c.Sprint === row.Sprint)?.CSAT || 0,
    NPS:  row.NPS,
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Sprint Trends</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="CSAT Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sprintData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sprint" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="AiCE" stroke="#E22D2D" strokeWidth={3} />
              <Line type="monotone" dataKey="PF"   stroke="#8B5CF6" strokeWidth={3} />
              <Line type="monotone" dataKey="VA"   stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="NPS Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sprintData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sprint" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="NPS" stroke="#FBBF24" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

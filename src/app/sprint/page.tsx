// src/app/sprint/page.tsx
import Card from "@/components/Card";
import ClientChart from "@/components/ClientChart";
import { getAllData, Row } from "@/lib/fetchData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const revalidate = 3600;

export default async function Sprint() {
  const { csat } = await getAllData();
  const data = csat.map(r => ({
    sprint: `${r.Sprint} ${r.Cohort}`,
    CSAT: r.CSAT ?? 0,
    NPS: r.NPS ?? 0,
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Sprint Trends</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="CSAT Trend">
          <ClientChart>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="sprint" stroke="#9CA3AF" />
                <YAxis domain={[0, 5]} stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="CSAT" stroke="#E22D2D" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </ClientChart>
        </Card>

        <Card title="NPS Trend">
          <ClientChart>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="sprint" stroke="#9CA3AF" />
                <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="NPS" stroke="#FBBF24" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </ClientChart>
        </Card>
      </div>
    </div>
  );
}

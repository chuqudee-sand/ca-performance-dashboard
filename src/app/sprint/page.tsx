// src/app/sprint/page.tsx
import Card from "@/components/Card";
import ChartWrapper from "@/components/ChartWrapper";
import { getAllData } from "@/lib/fetchData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const revalidate = 3600;

export default async function Sprint() {
  const { csat } = await getAllData();
  const data = csat.map(r => ({ sprint: `${r.Sprint} ${r.Cohort}`, CSAT: r.CSAT, NPS: r.NPS }));

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Sprint Trends</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="CSAT Trend">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="CSAT" stroke="#E22D2D" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </Card>
        <Card title="NPS Trend">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sprint" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="NPS" stroke="#FBBF24" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </Card>
      </div>
    </div>
  );
}

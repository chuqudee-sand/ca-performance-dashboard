// src/app/sprint/page.tsx
import Card from "@/components/Card";
import CSATLineChart from "@/components/Charts/CSATLineChart";
import NPSLineChart from "@/components/Charts/NPSLineChart";
import { getAllData } from "@/lib/fetchData";

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
          <CSATLineChart data={data} />
        </Card>

        <Card title="NPS Trend">
          <NPSLineChart data={data} />
        </Card>
      </div>
    </div>
  );
}

// src/app/page.tsx
import Card from "@/components/Card";
import PieChartClient from "@/components/Charts/PieChartClient";
import FunnelChartClient from "@/components/Charts/FunnelChartClient";
import { getAllData, Row } from "@/lib/fetchData";

export const revalidate = 3600;

export default async function Overview() {
  const { aice, pf, va, csat } = await getAllData();

  const total = (rows: Row[], key: keyof Row) => rows.reduce((s, r) => s + (r[key] as number), 0);

  const enrolled = total(aice, "Enrolled") + total(pf, "Enrolled") + total(va, "Enrolled");
  const activated = total(aice, "Activated") + total(pf, "Activated") + total(va, "Activated");
  const graduated = total(aice, "Graduated") + total(pf, "Graduated") + total(va, "Graduated");

  const programData = [
    { name: "AiCE", value: total(aice, "Enrolled"), color: "#E22D2D" },
    { name: "PF", value: total(pf, "Enrolled"), color: "#8B5CF6" },
    { name: "VA", value: total(va, "Enrolled"), color: "#10B981" },
  ];

  const funnelData = [
    { stage: "Enrolled", value: enrolled },
    { stage: "Activated", value: activated },
    { stage: "Graduated", value: graduated },
  ];

  const avgCSAT = csat.length ? (csat.reduce((s, r) => s + (r.CSAT ?? 0), 0) / csat.length).toFixed(1) : "0";
  const avgNPS = csat.length ? Math.round(csat.reduce((s, r) => s + (r.NPS ?? 0), 0) / csat.length) : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">CA Performance Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Activation Rate">
          <p className="text-3xl font-bold">{enrolled ? Math.round((activated / enrolled) * 100) : 0}%</p>
        </Card>
        <Card title="Completion Rate">
          <p className="text-3xl font-bold">{enrolled ? Math.round((graduated / enrolled) * 100) : 0}%</p>
        </Card>
        <Card title="CSAT">
          <p className="text-3xl font-bold">{avgCSAT}/5</p>
        </Card>
        <Card title="NPS">
          <p className="text-3xl font-bold">{avgNPS}</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Enrollment by Program">
          <PieChartClient data={programData} />
        </Card>

        <Card title="Overall Funnel">
          <FunnelChartClient data={funnelData} />
        </Card>
      </div>
    </div>
  );
}

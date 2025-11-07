// src/components/ProgramCharts.tsx
import { getAllData, Row } from "@/lib/fetchData";
import ProgramSprintBar from "./ProgramSprintBar";
import ProgramTrendLine from "./ProgramTrendLine";
import InsightBox from "./InsightBox";

export default async function ProgramCharts() {
  const { aice, pf, va } = await getAllData();

  const insight = (rows: Row[], name: string) => {
    const enrolled = rows.reduce((s, r) => s + r.Enrolled, 0);
    const graduated = rows.reduce((s, r) => s + r.Graduated, 0);
    const rate = enrolled ? Math.round((graduated / enrolled) * 100) : 0;
    return [
      `${name}: <strong>${enrolled.toLocaleString()}</strong> enrolled`,
      `Graduation: <strong>${rate}%</strong>`,
    ];
  };

  return (
    <div className="space-y-12">
      {[
        { data: aice, name: "AiCE" },
        { data: pf, name: "PF" },
        { data: va, name: "VA" },
      ].map(({ data, name }) => (
        <div key={name} className="space-y-8">
          <section className="grid md:grid-cols-2 gap-6">
            <ProgramSprintBar rows={data} program={name} />
            <InsightBox title={`${name} Insights`} bullets={insight(data, name)} />
          </section>
          <section className="grid md:grid-cols-2 gap-6">
            <ProgramTrendLine rows={data} program={name} />
            <InsightBox
              title={`${name} Trend`}
              bullets={[
                `Graduation rate over cohorts`,
                `Data from ${new Set(data.map(r => r.Cohort)).size} cohorts`,
              ]}
            />
          </section>
        </div>
      ))}
    </div>
  );
}

// src/components/ProgramCharts.tsx
import { getAllData } from "@/lib/fetchData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default async function ProgramCharts() {
  const { aice, pf, va } = await getAllData();

  const aggregateByCohort = (rows: any[]) => {
    const cohortMap = new Map<string, { enrolled: number; graduated: number }>();

    rows.forEach((r) => {
      const key = r.Cohort;
      const current = cohortMap.get(key) || { enrolled: 0, graduated: 0 };
      cohortMap.set(key, {
        enrolled: current.enrolled + Number(r.Enrolled),
        graduated: current.graduated + Number(r.Graduated),
      });
    });

    return Array.from(cohortMap.entries())
      .map(([cohort, { enrolled, graduated }]) => ({
        cohort,
        grad: enrolled > 0 ? Math.round((graduated / enrolled) * 100) : 0,
      }))
      .sort((a, b) => a.cohort.localeCompare(b.cohort));
  };

  const aiceData = aggregateByCohort(aice);
  const pfData = aggregateByCohort(pf);
  const vaData = aggregateByCohort(va);

  // Merge all cohorts
  const allCohorts = [...new Set([...aiceData, ...pfData, ...vaData].map((d) => d.cohort))].sort();

  const chartData = allCohorts.map((cohort) => ({
    cohort,
    AiCE: aiceData.find((d) => d.cohort === cohort)?.grad ?? null,
    PF: pfData.find((d) => d.cohort === cohort)?.grad ?? null,
    VA: vaData.find((d) => d.cohort === cohort)?.grad ?? null,
  }));

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-alxRed">Graduation Rate by Cohort</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="cohort" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => (value === null ? "N/A" : `${value}%`)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="AiCE"
            stroke="#E22D2D"
            strokeWidth={3}
            dot={{ r: 6 }}
            name="AiCE"
          />
          <Line
            type="monotone"
            dataKey="PF"
            stroke="#8B5CF6"
            strokeWidth={3}
            dot={{ r: 6 }}
            name="PF"
          />
          <Line
            type="monotone"
            dataKey="VA"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ r: 6 }}
            name="VA"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

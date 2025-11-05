// src/app/cohort/page.tsx
import Card from "@/components/Card";
import { getAllData } from "@/lib/fetchData";

export const revalidate = 3600;

export default async function Cohort() {
  const { aice, pf, va } = await getAllData();
  const cohorts = [...new Set([...aice, ...pf, ...va].map(r => r.Cohort))].sort();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Cohort Explorer</h1>

      {cohorts.map(cohort => {
        const rows = [...aice, ...pf, ...va].filter(r => r.Cohort === cohort);
        const total = rows.reduce((s,r) => s + r.Enrolled, 0);
        return (
          <Card key={cohort} title={`Cohort ${cohort}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm opacity-70">Total Enrolled</p>
                <p className="text-2xl font-bold">{total.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Avg Activation</p>
                <p className="text-2xl font-bold">
                  {Math.round(rows.reduce((s,r)=>s + r.Activated,0) / total * 100)}%
                </p>
              </div>
              <div>
                <p className="text-sm opacity-70">Avg Graduation</p>
                <p className="text-2xl font-bold">
                  {Math.round(rows.reduce((s,r)=>s + r.Graduated,0) / total * 100)}%
                </p>
              </div>
              <div>
                <p className="text-sm opacity-70">Top Country</p>
                <p className="text-2xl font-bold">
                  {rows.sort((a,b)=>b.Enrolled-a.Enrolled)[0].Country}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

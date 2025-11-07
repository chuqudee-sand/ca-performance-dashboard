// src/app/cohort/page.tsx
import Card from "@/components/Card";
import { getAllData } from "@/lib/fetchData";

export const revalidate = 3600;

export default async function Cohort() {
  const { aice, pf, va } = await getAllData();
  const all = [...aice, ...pf, ...va];
  const cohorts = [...new Set(all.map(r => r.Cohort))].sort();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Cohort Explorer</h1>
      <div className="grid gap-6">
        {cohorts.map(c => {
          const rows = all.filter(r => r.Cohort === c);
          const enrolled = rows.reduce((s, r) => s + Number(r.Enrolled), 0);
          const activated = rows.reduce((s, r) => s + Number(r.Activated), 0);
          const graduated = rows.reduce((s, r) => s + Number(r.Graduated), 0);
          return (
            <Card key={c} title={`Cohort ${c}`}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div><p className="text-sm opacity-70">Enrolled</p><p className="text-2xl font-bold">{enrolled}</p></div>
                <div><p className="text-sm opacity-70">Activation</p><p className="text-2xl font-bold">{enrolled ? Math.round((activated / enrolled) * 100) : 0}%</p></div>
                <div><p className="text-sm opacity-70">Graduation</p><p className="text-2xl font-bold">{enrolled ? Math.round((graduated / enrolled) * 100) : 0}%</p></div>
                <div><p className="text-sm opacity-70">Programs</p><p className="text-2xl font-bold">{new Set(rows.map(r => r.Program)).size}</p></div>
                <div><p className="text-sm opacity-70">Top Country</p><p className="text-2xl font-bold">{rows.sort((a,b) => b.Enrolled - a.Enrolled)[0]?.Country ?? "-"}</p></div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

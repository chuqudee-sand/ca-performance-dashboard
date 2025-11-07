// src/app/cohort/page.tsx
import Card from "@/components/Card";
import { getAllData } from "@/lib/fetchData";

export const revalidate = 3600;

export default async function Cohort() {
  const { aice, pf, va } = await getAllData();
  const all = [...aice, ...pf, ...va];

  const cohorts = [...new Set(all.map(r => r.Cohort))].sort();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Cohort Explorer</h1>

      <div className="grid gap-6">
        {cohorts.map(cohort => {
          const rows = all.filter(r => r.Cohort === cohort);
          const totalEnrolled = rows.reduce((s, r) => s + r.Enrolled, 0);
          const totalActivated = rows.reduce((s, r) => s + r.Activated, 0);
          const totalGraduated = rows.reduce((s, r) => s + r.Graduated, 0);
          const topCountry = rows.sort((a, b) => b.Enrolled - a.Enrolled)[0]?.Country ?? "N/A";

          return (
            <Card key={cohort} title={`Cohort ${cohort}`}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div>
                  <p className="text-sm opacity-70">Total Enrolled</p>
                  <p className="text-2xl font-bold">{totalEnrolled.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Activation Rate</p>
                  <p className="text-2xl font-bold">
                    {totalEnrolled ? Math.round((totalActivated / totalEnrolled) * 100) : 0}%
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Graduation Rate</p>
                  <p className="text-2xl font-bold">
                    {totalEnrolled ? Math.round((totalGraduated / totalEnrolled) * 100) : 0}%
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Top Country</p>
                  <p className="text-2xl font-bold">{topCountry}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Programs</p>
                  <p className="text-2xl font-bold">{new Set(rows.map(r => r.Program)).size}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

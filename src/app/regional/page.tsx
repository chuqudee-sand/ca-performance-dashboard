// src/app/regional/page.tsx
import Card from "@/components/Card";
import RegionalFunnelChart from "@/components/Charts/RegionalFunnelChart";
import { getAllData, Row } from "@/lib/fetchData";

export const revalidate = 3600;

export default async function Regional() {
  const { aice, pf, va } = await getAllData();
  const all: Row[] = [...aice, ...pf, ...va];

  const byCountry = all.reduce((map, r) => {
    const key = r.Country;
    if (!map.has(key)) map.set(key, { Enrolled: 0, Activated: 0, Graduated: 0 });
    const o = map.get(key)!;
    o.Enrolled += r.Enrolled;
    o.Activated += r.Activated;
    o.Graduated += r.Graduated;
    return map;
  }, new Map<string, { Enrolled: number; Activated: number; Graduated: number }>());

  const data = Array.from(byCountry.entries())
    .map(([Country, d]) => ({
      Country,
      ...d,
      Activation: d.Enrolled ? Math.round((d.Activated / d.Enrolled) * 100) : 0,
      Graduation: d.Enrolled ? Math.round((d.Graduated / d.Enrolled) * 100) : 0,
    }))
    .sort((a, b) => b.Enrolled - a.Enrolled);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Regional Performance</h1>

      <Card title="Top Countries">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-2">Country</th>
                <th className="text-right py-2">Enrolled</th>
                <th className="text-right py-2">Activation</th>
                <th className="text-right py-2">Graduation</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map(r => (
                <tr key={r.Country} className="border-b border-gray-800">
                  <td className="py-2">{r.Country}</td>
                  <td className="text-right">{r.Enrolled.toLocaleString()}</td>
                  <td className="text-right">{r.Activation}%</td>
                  <td className="text-right">{r.Graduation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Funnel (Top 8)">
        <RegionalFunnelChart data={data.slice(0, 8)} />
      </Card>
    </div>
  );
}

// src/app/regional/page.tsx
import Card from "@/components/Card";
import ChartWrapper from "@/components/ChartWrapper";
import { getAllData } from "@/lib/fetchData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const revalidate = 3600;

export default async function Regional() {
  const { aice, pf, va } = await getAllData();
  const all = [...aice, ...pf, ...va];

  const byCountry = all.reduce((map, r) => {
    const c = r.Country;
    if (!map.has(c)) map.set(c, { Enrolled: 0, Activated: 0, Graduated: 0 });
    const o = map.get(c);
    o.Enrolled += Number(r.Enrolled);
    o.Activated += Number(r.Activated);
    o.Graduated += Number(r.Graduated);
    return map;
  }, new Map());

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
        <ChartWrapper>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.slice(0, 8)}>
              <XAxis dataKey="Country" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Enrolled" fill="#4B5563" />
              <Bar dataKey="Activated" fill="#10B981" />
              <Bar dataKey="Graduated" fill="#E22D2D" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </Card>
    </div>
  );
}

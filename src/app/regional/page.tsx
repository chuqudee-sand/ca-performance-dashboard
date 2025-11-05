// src/app/regional/page.tsx
import Card from "@/components/Card";
import { getAllData } from "@/lib/fetchData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const revalidate = 3600;

export default async function Regional() {
  const { aice, pf, va } = await getAllData();
  const all = [...aice, ...pf, ...va];

  const countries = [...new Set(all.map(r => r.Country))].sort();

  const data = countries.map(country => {
    const rows = all.filter(r => r.Country === country);
    const enrolled = rows.reduce((s, r) => s + r.Enrolled, 0);
    const activated = rows.reduce((s, r) => s + r.Activated, 0);
    const graduated = rows.reduce((s, r) => s + r.Graduated, 0);
    return {
      Country: country,
      Enrolled: enrolled,
      Activated: activated,
      Graduated: graduated,
      Activation: enrolled > 0 ? Math.round((activated / enrolled) * 100) : 0,
      Graduation: enrolled > 0 ? Math.round((graduated / enrolled) * 100) : 0,
    };
  }).sort((a, b) => b.Enrolled - a.Enrolled);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Regional Performance</h1>

      <Card title="Country Leaderboard">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="pb-3 font-medium">Country</th>
                <th className="pb-3 text-right font-medium">Enrolled</th>
                <th className="pb-3 text-right font-medium">Activation</th>
                <th className="pb-3 text-right font-medium">Graduation</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row) => (
                <tr key={row.Country} className="border-b border-gray-800">
                  <td className="py-3">{row.Country}</td>
                  <td className="py-3 text-right">{row.Enrolled.toLocaleString()}</td>
                  <td className="py-3 text-right">{row.Activation}%</td>
                  <td className="py-3 text-right">{row.Graduation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Funnel by Country (Top 8)">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.slice(0, 8)}>
            <XAxis dataKey="Country" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip formatter={(v: number) => v.toLocaleString()} />
            <Bar dataKey="Enrolled" fill="#4B5563" />
            <Bar dataKey="Activated" fill="#10B981" />
            <Bar dataKey="Graduated" fill="#E22D2D" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

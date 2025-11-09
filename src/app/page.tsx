// src/app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllData, Row } from "@/lib/fetchData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GraduationCap, Users, Target, ThumbsUp, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils"; // ← ADD THIS LINE

export const revalidate = 3600;

export default async function Overview() {
  const { aice, pf, va, csat } = await getAllData();

  const total = (rows: Row[], key: keyof Row) => rows.reduce((s, r) => s + (r[key] as number), 0);
  const avg = (rows: Row[], key: keyof Row) => {
    const sum = total(rows, key);
    const enrolled = total(rows, "Enrolled");
    return enrolled ? (sum / enrolled) * 100 : 0;
  };

  const enrolled = total(aice, "Enrolled") + total(pf, "Enrolled") + total(va, "Enrolled");
  const activated = total(aice, "Activated") + total(pf, "Activated") + total(va, "Activated");
  const graduated = total(aice, "Graduated") + total(pf, "Graduated") + total(va, "Graduated");

  const avgCSAT = csat.length ? (csat.reduce((s, r) => s + (r.CSAT ?? 0), 0) / csat.length).toFixed(1) : "0";
  const avgNPS = csat.length ? Math.round(csat.reduce((s, r) => s + (r.NPS ?? 0), 0) / csat.length) : 0;

  const avgActivation = avg([...aice, ...pf, ...va], "Activated");
  const avgGraduation = avg([...aice, ...pf, ...va], "Graduated");

  const programConversion = [
    { name: "AiCE", value: total(aice, "Enrolled") ? (total(aice, "Graduated") / total(aice, "Enrolled")) * 100 : 0, color: "#E22D2D" },
    { name: "PF", value: total(pf, "Enrolled") ? (total(pf, "Graduated") / total(pf, "Enrolled")) * 100 : 0, color: "#8B5CF6" },
    { name: "VA", value: total(va, "Enrolled") ? (total(va, "Graduated") / total(va, "Enrolled")) * 100 : 0, color: "#10B981" },
  ];

  const kpiCards = [
    { title: "Total Paid Enrolled", value: enrolled.toLocaleString(), icon: Users, color: "text-blue-400" },
    { title: "Total Activated", value: activated.toLocaleString(), icon: Target, color: "text-green-400" },
    { title: "Total Graduated", value: graduated.toLocaleString(), icon: GraduationCap, color: "text-red-400" },
    { title: "Average CSAT", value: `${avgCSAT}/5`, icon: ThumbsUp, color: "text-yellow-400" },
    { title: "Average NPS", value: avgNPS, icon: TrendingUp, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className={cn("h-4 w-4", card.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Average Rates</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{ name: "Rates", Activation: avgActivation, Graduation: avgGraduation }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                <Bar dataKey="Activation" fill="#10B981" />
                <Bar dataKey="Graduation" fill="#E22D2D" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Program Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around">
              {programConversion.map((p) => (
                <div key={p.name} className="flex flex-col items-center">
                  <div
                    className="relative flex h-32 w-32 items-center justify-center rounded-full text-2xl font-bold text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.value.toFixed(0)}%
                    <div className="absolute -bottom-6 text-sm text-muted-foreground">{p.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

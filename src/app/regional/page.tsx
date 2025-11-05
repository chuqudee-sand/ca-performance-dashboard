// src/app/regional/page.tsx
import React from "react";
import { fetchCSV, dataSources } from "../../lib/fetchData";
import { CountryLineCompare } from "../../components/ProgramCharts";
import InsightBox from "../../components/InsightBox";

async function loadAll() {
  const [aice, pf, va] = await Promise.all([
    fetchCSV(dataSources.AiCE),
    fetchCSV(dataSources.PF),
    fetchCSV(dataSources.VA),
  ]);
  return { aice, pf, va };
}

export default async function Page() {
  const { aice, pf, va } = await loadAll();

  // Build per-country aggregated graduation %
  const countries = Array.from(new Set(aice.map((r: any) => r.Country)));
  const data = countries.map((country: string) => {
    const a = aice.filter((r: any) => r.Country === country);
    const p = pf.filter((r: any) => r.Country === country);
    const v = va.filter((r: any) => r.Country === country);
    const toNum = (arr: any[]) => {
      const en = arr.reduce((s, row) => s + Number(row.Enrolled || 0), 0);
      const gr = arr.reduce((s, row) => s + Number(row.Graduated || 0), 0);
      return en === 0 ? 0 : Math.round((gr / en) * 100 * 10) / 10;
    };
    return {
      country,
      AiCE: toNum(a),
      PF: toNum(p),
      VA: toNum(v),
    };
  });

  const series = [
    { key: "AiCE", color: "#60a5fa" },
    { key: "PF", color: "#f97316" },
    { key: "VA", color: "#16a34a" },
  ];

  return (
    <main>
      <h2 className="text-2xl font-bold mb-4">Regional Graduation Performance</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CountryLineCompare data={data as any} xKey="country" series={series} title="Graduation % by Country" />
        </div>
        <aside>
          <InsightBox
            title="Regional takeaways"
            bullets={[
              "Kenya and Nigeria are consistent top contributors to graduation volumes and efficiency.",
              "Small markets like Rwanda and Ghana show strong conversion — use them as engagement labs.",
            ]}
          />
        </aside>
      </div>
    </main>
  );
}

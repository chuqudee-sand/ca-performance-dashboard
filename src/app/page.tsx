// src/app/page.tsx
import React from "react";
import Link from "next/link";
import { fetchCSV, dataSources } from "../lib/fetchData";
import KpiCard from "../components/KpiCard";
import InsightBox from "../components/InsightBox";
import { ProgramSprintBar } from "../components/ProgramCharts";

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

  // compute quick KPIs (global averages)
  const computeAvg = (arr: any[], field: string) => {
    const vals = arr.map((r) => Number(r[field] ?? 0)).filter((v) => !isNaN(v));
    if (!vals.length) return 0;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  const avgActivation = ((Number(computeAvg(aice, "Activation Rate")) + Number(computeAvg(pf, "Activation Rate")) + Number(computeAvg(va, "Activation Rate"))) / 3).toFixed(1);
  const avgGraduation = ((Number(computeAvg(aice, "Graduation Rate")) + Number(computeAvg(pf, "Graduation Rate")) + Number(computeAvg(va, "Graduation Rate"))) / 3).toFixed(1);

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">Career Accelerator — Overview</h1>
        <p className="text-gray-400 mt-1">Sprint comparison, regional trends and cohort storytelling.</p>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-6">
        <KpiCard title="Avg Activation" value={`${avgActivation}%`} subtitle="Average across programs" />
        <KpiCard title="Avg Graduation" value={`${avgGraduation}%`} subtitle="Average across programs" />
        <KpiCard title="Programs" value="AiCE · PF · VA" subtitle="Click a program below for details" />
      </section>

      <section className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProgramSprintBar rows={aice as any} program="AI Career Essentials" />
          <div className="mt-4" />
          <ProgramSprintBar rows={pf as any} program="Professional Foundations" />
          <div className="mt-4" />
          <ProgramSprintBar rows={va as any} program="Virtual Assistant" />
        </div>

        <aside className="space-y-4">
          <InsightBox
            title="Topline Insight"
            bullets={[
              "PF provides the largest enrollment volumes (mandatory), VA shows highest completion consistency.",
              "Focus retention efforts on high-volume countries (Nigeria, Kenya) while replicating VA engagement model in PF/AiCE.",
            ]}
          />
          <div className="bg-darkCard p-3 rounded-lg border border-neutral-700">
            <div className="text-sm text-gray-300">Quick links</div>
            <ul className="mt-2 text-sm space-y-1">
              <li><Link href="/regional">Regional performance</Link></li>
              <li><Link href="/sprint">Sprint trends</Link></li>
              <li><Link href="/cohort">Cohort explorer</Link></li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}

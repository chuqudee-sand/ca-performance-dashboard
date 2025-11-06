// src/components/ProgramCharts.tsx
import { getAllData } from "@/lib/fetchData";
import ProgramSprintBar from "./ProgramSprintBar";
import ProgramTrendLine from "./ProgramTrendLine";
import InsightBox from "./InsightBox";

export default async function ProgramCharts() {
  const { aice, pf, va } = await getAllData();

  // Helper to calculate a quick insight for a program
  const insightFor = (rows: any[], program: string) => {
    const enrolled = rows.reduce((s: number, r: any) => s + Number(r.Enrolled), 0);
    const graduated = rows.reduce((s: number, r: any) => s + Number(r.Graduated), 0);
    const avgGrad = enrolled ? Math.round((graduated / enrolled) * 100) : 0;
    const cohorts = [...new Set(rows.map((r: any) => r.Cohort))].length;

    return [
      `${program} has **${enrolled.toLocaleString()}** learners enrolled.`,
      `Average graduation rate: **${avgGrad}%**.`,
      `Data from **${cohorts}** cohort${cohorts > 1 ? "s" : ""}.`,
    ];
  };

  return (
    <div className="space-y-12">
      {/* AiCE */}
      <section className="grid md:grid-cols-2 gap-6">
        <ProgramSprintBar rows={aice} program="AiCE" />
        <InsightBox
          title="AiCE Insights"
          bullets={insightFor(aice, "AiCE")}
          className="self-start"
        />
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <ProgramTrendLine rows={aice} program="AiCE" />
        <InsightBox
          title="AiCE Cohort Trend"
          bullets={[
            "Graduation rate improves with newer cohorts.",
            "Check Sprint‑2 onboarding for any dips.",
          ]}
          className="self-start"
        />
      </section>

      {/* PF */}
      <section className="grid md:grid-cols-2 gap-6">
        <ProgramSprintBar rows={pf} program="PF" />
        <InsightBox title="PF Insights" bullets={insightFor(pf, "PF")} className="self-start" />
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <ProgramTrendLine rows={pf} program="PF" />
        <InsightBox
          title="PF Cohort Trend"
          bullets={["PF consistently above 70% graduation.", "Strongest performer."]}
          className="self-start"
        />
      </section>

      {/* VA */}
      <section className="grid md:grid-cols-2 gap-6">
        <ProgramSprintBar rows={va} program="VA" />
        <InsightBox title="VA Insights" bullets={insightFor(va, "VA")} className="self-start" />
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <ProgramTrendLine rows={va} program="VA" />
        <InsightBox
          title="VA Cohort Trend"
          bullets={["Activation dip in Sprint 2 – investigate.", "Graduation improving."]}
          className="self-start"
        />
      </section>
    </div>
  );
}

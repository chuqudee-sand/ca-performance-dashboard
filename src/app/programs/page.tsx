// src/app/programs/page.tsx
import ProgramCharts from "@/components/ProgramCharts";

export default function ProgramsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-alxRed">Program Performance</h1>
      <ProgramCharts />
    </div>
  );
}

// src/app/programs/page.tsx
import ProgramCharts from "@/components/ProgramCharts";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-darkBg text-darkText p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-alxRed mb-8">
          Program Performance Deep Dive
        </h1>
        <ProgramCharts />
      </div>
    </div>
  );
}
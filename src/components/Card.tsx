// src/components/Card.tsx
export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-darkCard rounded-xl p-6 border border-gray-800 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-alxRed">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

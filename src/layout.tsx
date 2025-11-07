// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "CA Performance Dashboard",
  description: "ALX Career Accelerator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-darkBg text-darkText min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex gap-6 mb-10 text-lg border-b border-alxRed pb-4">
            <a href="/" className="hover:text-alxRed transition-colors">Overview</a>
            <a href="/regional" className="hover:text-alxRed transition-colors">Regional</a>
            <a href="/sprint" className="hover:text-alxRed transition-colors">Sprint</a>
            <a href="/cohort" className="hover:text-alxRed transition-colors">Cohort</a>
            <a href="/programs" className="hover:text-alxRed transition-colors">Programs</a>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}

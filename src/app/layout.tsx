import "./globals.css";

export const metadata = {
  title: "CA Performance Dashboard",
  description: "ALX Career Accelerator Program Metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-darkBg text-darkText p-6 min-h-screen">
        <nav className="flex gap-6 mb-10 text-lg border-b border-alxRed pb-4">
          <a href="/" className="hover:text-alxRed transition-colors">Overview</a>
          <a href="/programs" className="hover:text-alxRed transition-colors">Programs</a>
          <a href="/regional" className="hover:text-alxRed transition-colors">Regional Performance</a>
          <a href="/sprint" className="hover:text-alxRed transition-colors">Sprint Trends</a>
          <a href="/cohort" className="hover:text-alxRed transition-colors">Cohort Explorer</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
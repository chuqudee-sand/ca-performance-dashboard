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
    <html lang="en">
      <body className="bg-darkBg text-darkText p-6">
        <nav className="flex gap-6 mb-10 text-lg border-b border-alxRed pb-4">
          <a href="/" className="hover:text-alxRed">Overview</a>
          <a href="/regional" className="hover:text-alxRed">Regional Performance</a>
          <a href="/sprint" className="hover:text-alxRed">Sprint Trends</a>
          <a href="/cohort" className="hover:text-alxRed">Cohort Explorer</a>
        </nav>
        {children}
      </body>
    </html>
  );
}

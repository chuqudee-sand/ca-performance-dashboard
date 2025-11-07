// src/app/layout.tsx
import "./globals.css";
import AppProvider from "@/components/AppProvider";

export const metadata = {
  title: "CA Performance Dashboard",
  description: "ALX Career Accelerator metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-darkBg text-darkText p-6 min-h-screen">
        {/* Client‑side provider – only file that uses React Context */}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

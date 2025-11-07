// src/app/layout.tsx
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper"; // ← This is safe (will be tree-shaken)

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
        {/* ClientWrapper will be rendered only on client */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { CivicProvider } from "@/context/CivicContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CivicPulse OS - Smart City Municipal Triage ERP",
  description: "Enterprise Municipal Citizen Complaint Triage, 60 FPS Geotagged Incident Radar & Field Dispatch OS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#0a0e1a] text-slate-100 antialiased">
        <CivicProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
        </CivicProvider>
      </body>
    </html>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCivic } from "@/context/CivicContext";
import { formatNumber } from "@/lib/utils";
import {
  MapPin,
  Truck,
  BarChart3,
  FileText,
  PhoneCall,
  RefreshCw,
  Building2,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { kpis, resetToDefaults } = useCivic();

  const navItems = [
    { label: "Incident Triage Map", href: "/", icon: MapPin },
    { label: "Field Dispatch Desk", href: "/dispatch/", icon: Truck },
    { label: "Heatmap Analytics", href: "/analytics/", icon: BarChart3 },
    { label: "SP4N LAPOR! A4", href: "/surat/", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-blue-900/40 text-slate-100">
      {/* Top Municipal Status Strip */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-slate-900/80 border-b border-blue-950 text-xs font-mono">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-slate-400">SMART CITY COMMAND:</span>
            <span className="text-blue-300 font-bold">DKI JAKARTA MUNICIPAL OS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">OPEN TICKETS:</span>
            <span className="text-amber-400 font-bold">{kpis.activePendingTriageCount + kpis.inProgressFieldWorksCount} TIKET</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">SLA COMPLIANCE:</span>
            <span className="text-emerald-400 font-bold">{kpis.slaCompliancePercentage}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">AVG RESOLUTION:</span>
            <span className="text-cyan-400 font-bold">{kpis.averageResolutionHours} Jam</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">CSAT SCORE:</span>
            <span className="text-slate-200 font-bold">★ {kpis.citizenSatisfactionScore}/5.0</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-600/40 text-rose-300 text-[11px] font-bold">
            <PhoneCall className="w-3 h-3 text-rose-400 animate-pulse" />
            <span>HOTLINE 112 SIAGA 24/7</span>
          </div>

          <button
            onClick={resetToDefaults}
            title="Reset Simulation"
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
            <Building2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-wider text-slate-100">CIVICPULSE</span>
              <span className="px-1.5 py-0.2 text-[10px] font-mono bg-blue-950 text-blue-400 rounded border border-blue-800">
                SMART CITY OS
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">Citizen Complaint Triage & Municipal SLA Resolution</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-500/20 text-blue-300 border border-blue-400/40 shadow-sm shadow-blue-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

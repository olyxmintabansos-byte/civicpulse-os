"use client";

import React from "react";
import { useCivic } from "@/context/CivicContext";
import { formatNumber } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  MapPin,
  CheckCircle2,
  DollarSign,
  PieChart,
  Users,
  Sliders,
} from "lucide-react";

export default function MunicipalAnalyticsPage() {
  const { districts, kpis, updateDistrictBudget } = useCivic();

  const channels = [
    { name: "WhatsApp Lapor Bot", sharePct: 45, count: 67 },
    { name: "Mobile App JAKI/CitizenApp", sharePct: 32, count: 48 },
    { name: "Call Center Darurat 112", sharePct: 15, count: 22 },
    { name: "Portal Nasional SP4N LAPOR!", sharePct: 8, count: 11 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Municipal Heatmap Analytics & Citizen Sentiment Studio
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Kinerja Penanganan Keluhan per Kecamatan, Metrik Kepuasan CSAT & Alokasi Anggaran Tanggap Cepat
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-blue-900/40 px-3 py-1.5 rounded-lg font-mono text-xs">
          <span className="text-slate-400">TOTAL APBD TANGGAP DARURAT:</span>
          <span className="font-bold text-emerald-400">
            Rp {formatNumber(districts.reduce((a, b) => a + b.allocatedEmergencyBudgetMillionIdr, 0))} JUTA
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
          <span className="text-slate-400">RATA-RATA RESOLUSI</span>
          <p className="text-2xl font-bold text-cyan-400 mt-1">{kpis.averageResolutionHours} Jam</p>
          <p className="text-[10px] text-slate-500">Benchmark Nasional: &lt; 24 Jam</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
          <span className="text-slate-400">KEPATUHAN SLA</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{kpis.slaCompliancePercentage}%</p>
          <p className="text-[10px] text-slate-500">Standar Ombudsman: &gt; 90%</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
          <span className="text-slate-400">SENTIMEN WARGA (CSAT)</span>
          <p className="text-2xl font-bold text-amber-400 mt-1">★ {kpis.citizenSatisfactionScore} / 5.0</p>
          <p className="text-[10px] text-slate-500">94.8% Feedback Positif</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
          <span className="text-slate-400">TOTAL TIKET TUNTAS</span>
          <p className="text-2xl font-bold text-blue-400 mt-1">{kpis.resolvedTodayCount}</p>
          <p className="text-[10px] text-slate-500">Periode Triwulan III</p>
        </div>
      </div>

      {/* Kecamatan Leaderboard & Channel Ingestion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District Performance Table */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-blue-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono font-bold text-sm text-slate-200">
              Kecamatan Resolution Performance & Budget Allocation
            </h3>
            <span className="text-[11px] font-mono text-slate-400">SLA Audit Ranking</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {districts.map((dist) => (
              <div
                key={dist.districtName}
                className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-bold text-slate-200">{dist.districtName}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-bold">
                    SLA {dist.slaCompliancePct}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400">
                  <div>Terselesaikan: <strong className="text-slate-200">{dist.resolvedComplaints}/{dist.totalComplaints}</strong></div>
                  <div>Waktu Rata-rata: <strong className="text-cyan-400">{dist.averageResolutionHours} Jam</strong></div>
                  <div>Rating CSAT: <strong className="text-amber-400">★ {dist.citizenCsatRating}</strong></div>
                </div>

                {/* Budget Slider */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-4">
                  <span className="text-slate-400 text-[10px]">Alokasi Kas Cepat:</span>
                  <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                    <input
                      type="range"
                      min="100"
                      max="800"
                      step="20"
                      value={dist.allocatedEmergencyBudgetMillionIdr}
                      onChange={(e) => updateDistrictBudget(dist.districtName, parseInt(e.target.value))}
                      className="w-full accent-blue-500 bg-slate-800 h-1 rounded cursor-pointer"
                    />
                    <span className="font-bold text-emerald-400 text-[11px]">
                      Rp {dist.allocatedEmergencyBudgetMillionIdr}M
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Ingestion Breakdown */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-blue-900/40 space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <h3 className="font-mono font-bold text-sm text-slate-200">
              Kanal Distribusi Pelaporan
            </h3>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {channels.map((ch) => (
              <div key={ch.name} className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>{ch.name}</span>
                  <span className="font-bold text-blue-400">{ch.sharePct}% ({ch.count})</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${ch.sharePct}%` }}
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-300">
            <strong>Otomasi Triase AI:</strong> 78% laporan via WhatsApp Bot otomatis dikategorikan dan diberi koordinat GPS tanpa intervensi manual operator.
          </div>
        </div>
      </div>
    </div>
  );
}
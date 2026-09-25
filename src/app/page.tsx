"use client";

import React from "react";
import { useCivic } from "@/context/CivicContext";
import { CityIncidentCanvas } from "@/components/CityIncidentCanvas";
import { formatNumber } from "@/lib/utils";
import {
  MapPin,
  AlertTriangle,
  Clock,
  Send,
  CheckCircle2,
  CheckCircle,
  ShieldAlert,
  Flame,
  Droplets,
  Zap,
  Trash2,
} from "lucide-react";
import { ComplaintCategory } from "@/types/civic";

export default function IncidentTriageMapPage() {
  const {
    reports,
    kpis,
    activeFilter,
    setActiveFilter,
    resolveReport,
    escalateSeverity,
  } = useCivic();

  const filterButtons = [
    { label: "Semua Laporan", value: "ALL" },
    { label: "Jalan Rusak", value: "POTHOLE_ROAD_DAMAGE" },
    { label: "Banjir & Drainase", value: "FLOODING_DRAINAGE" },
    { label: "PJU Padam", value: "STREETLIGHT_OUTAGE" },
    { label: "Sampah Liar", value: "ILLEGAL_WASTE_DUMP" },
  ];

  const filteredReports = reports.filter((r) =>
    activeFilter === "ALL" ? true : r.category === activeFilter
  );

  return (
    <div className="space-y-6">
      {/* Municipal KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Laporan Hari Ini</span>
            <MapPin className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-blue-400">
              {kpis.totalIncomingReportsToday}
            </span>
            <span className="text-xs font-mono text-slate-400">LAPORAN</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">Kanal: App, WA, 112 &amp; SP4N</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Menunggu Triase Lapangan</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-amber-400">
              {kpis.activePendingTriageCount}
            </span>
            <span className="text-xs font-mono text-slate-400">TIKET</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">SLA Respon Target &lt; 2 Jam</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Kepatuhan SLA Kota</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-emerald-400">
              {kpis.slaCompliancePercentage}%
            </span>
            <span className="text-xs font-mono text-slate-400">ON-TIME</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">Permenpan RB No. 62/2018</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Selesai Terverifikasi</span>
            <CheckCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-cyan-400">
              {kpis.resolvedTodayCount}
            </span>
            <span className="text-xs font-mono text-slate-400">RESOLVED</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">Kepuasan Warga: 4.82 / 5.0</p>
        </div>
      </div>

      {/* 60 FPS City Incident Radar Canvas */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              Geotagged Municipal Incident Radar Map (60 FPS Telemetry)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Coordinates: DKI Jakarta Smart City Grid</span>
        </div>
        <CityIncidentCanvas activeCount={filteredReports.length} />
      </div>

      {/* Filter Tabs & Complaint List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setActiveFilter(btn.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFilter === btn.value
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400">
            Showing {filteredReports.length} Active Complaints
          </span>
        </div>

        {/* Complaints Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map((report) => {
            const isResolved = report.status === "RESOLVED_VERIFIED";
            const isCritical = report.severity === "CRITICAL_HAZARD";
            return (
              <div
                key={report.id}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  isResolved
                    ? "bg-slate-950/60 border-slate-800 opacity-60"
                    : isCritical
                    ? "bg-rose-950/20 border-rose-500/50"
                    : "bg-slate-900/80 border-blue-900/40 hover:border-blue-500/40"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-blue-400">{report.ticketNumber}</span>
                      <h4 className="text-sm font-bold text-slate-100 mt-0.5">{report.title}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" /> {report.streetAddress}, {report.districtKecamatan}
                      </p>
                    </div>

                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase border ${
                        isCritical
                          ? "bg-rose-950 text-rose-300 border-rose-600"
                          : "bg-amber-950 text-amber-300 border-amber-600"
                      }`}
                    >
                      {report.severity.replace(/_/g, " ")}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{report.description}</p>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500">PELAPOR:</span>
                      <p className="text-slate-300">{report.reportedBy}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">KANAL LAPOR:</span>
                      <p className="text-cyan-400">{report.channel}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">BATAS SLA:</span>
                      <p className="text-amber-400 font-bold">{report.slaDeadlineHours} Jam Target</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">SISA WAKTU:</span>
                      <p className={isResolved ? "text-emerald-400" : "text-rose-400 font-bold animate-pulse"}>
                        {isResolved ? "SELESAI" : `${report.remainingHours} Jam`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {!isResolved && (
                    <button
                      onClick={() => escalateSeverity(report.id)}
                      className="text-[10px] font-mono text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                    >
                      + ESKALASI KRITIS
                    </button>
                  )}

                  {!isResolved ? (
                    <button
                      onClick={() => resolveReport(report.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIKASI SELESAI
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      RESOLVED ✓ {report.resolvedAt}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

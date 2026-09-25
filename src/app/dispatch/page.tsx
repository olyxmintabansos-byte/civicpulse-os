"use client";

import React from "react";
import { useCivic } from "@/context/CivicContext";
import { formatNumber } from "@/lib/utils";
import {
  Truck,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Radio,
} from "lucide-react";

export default function FieldDispatchPage() {
  const { teams, reports, dispatchTeamToReport } = useCivic();

  const pendingReports = reports.filter((r) => r.status === "TRIAGED_PENDING");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-400" />
            Field Officer Dispatch &amp; Work Order Desk
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Alokasi Regu Reaksi Cepat: Pasukan Kuning (Bina Marga), Pasukan Biru (SDA), Pasukan Oranye (LH)
          </p>
        </div>

        <span className="px-3 py-1 rounded bg-blue-950 border border-blue-700/50 text-blue-300 font-mono text-xs font-bold">
          4 REGULER PATROL UNITS ACTIVE
        </span>
      </div>

      {/* 4 Dispatch Teams Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="p-5 rounded-xl bg-slate-900/80 border border-blue-900/40 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-400">{team.unitCallsign}</span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase border ${
                      team.status === "ON_SCENE_REPAIRING"
                        ? "bg-amber-950 text-amber-300 border-amber-600"
                        : team.status === "EN_ROUTE"
                        ? "bg-cyan-950 text-cyan-300 border-cyan-600"
                        : "bg-emerald-950 text-emerald-300 border-emerald-600"
                    }`}
                  >
                    {team.status.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-100 mt-1">{team.name}</h3>
                <p className="text-xs text-slate-400">{team.department.replace(/_/g, " ")}</p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                <Truck className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            {/* Crew & Location Details */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500">PENANGGUNG JAWAB:</span>
                <p className="font-bold text-slate-200">{team.leaderName}</p>
              </div>
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500">JUMLAH PERSONEL:</span>
                <p className="font-bold text-emerald-400">{team.crewCount} Anggota Tim</p>
              </div>
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 col-span-2">
                <span className="text-[10px] text-slate-500">LOKASI SAAT INI:</span>
                <p className="font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> {team.currentLocation}
                </p>
              </div>
            </div>

            {/* Active Task or Assignment Selector */}
            <div className="pt-2 border-t border-slate-800">
              {team.activeTaskId ? (
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Tugas Aktif:</span>
                  <span className="font-bold text-cyan-400">{team.activeTaskId}</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400">Tugaskan ke Laporan Menunggu:</span>
                  <div className="flex items-center gap-2">
                    {pendingReports.length > 0 ? (
                      pendingReports.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => dispatchTeamToReport(p.id, team.id)}
                          className="px-2.5 py-1 rounded bg-blue-950 border border-blue-700/50 text-blue-300 text-xs font-mono hover:bg-blue-900 transition-all cursor-pointer"
                        >
                          Kirim ke {p.ticketNumber}
                        </button>
                      ))
                    ) : (
                      <span className="text-xs font-mono text-slate-500">Tidak ada tiket menunggu</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

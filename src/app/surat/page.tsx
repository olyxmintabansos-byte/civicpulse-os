"use client";

import React from "react";
import { useCivic } from "@/context/CivicContext";
import { formatNumber } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Building,
  Award,
} from "lucide-react";

export default function Sp4nAuditReportPage() {
  const { sp4nReport, kpis, districts } = useCivic();

  const handlePrint = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden on Print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-blue-900/40">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Official SP4N LAPOR! & Walikota Municipal SLA Audit Report Studio
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Laporan Akuntabilitas Kinerja Pelayanan Publik (LAKIP) Berdasarkan Permenpan RB No. 62/2018
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
        >
          <Printer className="w-4 h-4" /> CETAK LAPORAN A4 (1-CLICK PRINT)
        </button>
      </div>

      {/* Official A4 Document Container */}
      <div className="max-w-[850px] mx-auto bg-white text-slate-900 shadow-2xl rounded-xl p-8 sm:p-12 border border-slate-300 font-sans print:border-none print:shadow-none print:p-0">
        {/* Header Pemprov & Ombudsman */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-blue-700 text-white flex items-center justify-center font-black text-xl">
              DKI
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide text-slate-900 uppercase">
                {sp4nReport.cityGovernmentName} // DINAS KOMUNIKASI, INFORMATIKA & STATISTIK
              </h1>
              <h2 className="text-xs font-bold text-slate-600 tracking-wider">
                LAPORAN AUDIT RESOLUSI PENGADUAN MASYARAKAT SP4N LAPOR! & KEPATUHAN TATA KELOLA KOTA
              </h2>
            </div>
          </div>

          <div className="text-right font-mono text-[10px] text-slate-600">
            <p><strong>FORM:</strong> LAKIP-SP4N-04</p>
            <p><strong>STANDAR:</strong> PERMENPAN-RB 62/2018</p>
            <p><strong>TANGGAL:</strong> 25 SEPTEMBER 2026</p>
          </div>
        </div>

        {/* Title */}
        <div className="mt-4 text-center space-y-1">
          <h2 className="text-lg font-black tracking-wider uppercase underline underline-offset-4">
            BERITA ACARA AUDIT TAHAPAN PENYELESAIAN PENGADUAN WARGA
          </h2>
          <p className="text-xs font-mono text-slate-600 uppercase">
            EVALUASI KINERJA PELAYANAN PUBLIK {sp4nReport.reportingPeriod}
          </p>
          <div className="inline-block px-3 py-0.5 rounded bg-slate-100 border border-slate-300 text-xs font-mono font-bold mt-1">
            DOKUMEN NO: {sp4nReport.reportDocumentNo}
          </div>
        </div>

        {/* Executive Summary Table */}
        <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden text-xs">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="w-1/4 p-2.5 bg-slate-50 font-bold text-slate-700">ENTITAS AUDIT:</td>
                <td className="w-1/4 p-2.5 font-mono">{sp4nReport.cityGovernmentName}</td>
                <td className="w-1/4 p-2.5 bg-slate-50 font-bold text-slate-700">PENGAWAS EKSTERNAL:</td>
                <td className="w-1/4 p-2.5 font-mono">{sp4nReport.ombudsmanRegion}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">TOTAL TIKET MASUK:</td>
                <td className="p-2.5 font-mono font-bold">{formatNumber(sp4nReport.totalAuditedTickets)} Tiket</td>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">RESOLUSI TEPAT WAKTU:</td>
                <td className="p-2.5 font-mono font-bold text-emerald-700">{formatNumber(sp4nReport.withinSlaCount)} ({((sp4nReport.withinSlaCount / sp4nReport.totalAuditedTickets) * 100).toFixed(1)}%)</td>
              </tr>
              <tr>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">INDEKS KEPUASAN (IKM):</td>
                <td className="p-2.5 font-mono font-bold text-blue-800">{sp4nReport.ikmPublicSatisfactionIndex} / 100.0 (SANGAT BAIK)</td>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">DEVIASI MELEBIHI SLA:</td>
                <td className="p-2.5 font-mono text-rose-700 font-bold">{sp4nReport.breachedSlaCount} Tiket (3.2%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Detailed Breakdown Per District */}
        <div className="mt-6 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            REKAPITULASI CAPAIAN RESOLUSI PER KECAMATAN / WILAYAH
          </h3>

          <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
            <table className="w-full border-collapse font-mono">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-left text-slate-700 font-sans">
                  <th className="p-2.5">WILAYAH KECAMATAN</th>
                  <th className="p-2.5 text-center">TOTAL LAPORAN</th>
                  <th className="p-2.5 text-center">TERTANGANI</th>
                  <th className="p-2.5 text-right">SLA TEPAT WAKTU</th>
                  <th className="p-2.5 text-right">RATING CSAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {districts.map((d, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 font-sans font-medium">{d.districtName}</td>
                    <td className="p-2.5 text-center">{d.totalComplaints}</td>
                    <td className="p-2.5 text-center font-bold text-blue-800">{d.resolvedComplaints}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-700">{d.slaCompliancePct}%</td>
                    <td className="p-2.5 text-right font-bold text-amber-700">★ {d.citizenCsatRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legal Statement */}
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 leading-relaxed font-sans">
          <strong>PERNYATAAN RESMI AUDITOR:</strong> Berdasarkan verifikasi digital sistem SP4N LAPOR! dan audit lapangan Dinas Kominfotik bersama Ombudsman RI, seluruh penanganan pengaduan masyarakat telah memenuhi standar kepatuhan operasional tanggap darurat dan perbaikan sarana prasarana publik sesuai amanat UU No. 25 Tahun 2009 tentang Pelayanan Publik.
        </div>

        {/* 3-Party Signatures Block */}
        <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-3 gap-6 text-center text-xs font-sans">
          <div className="space-y-2">
            <p className="font-bold text-slate-700">KEPALA DAERAH</p>
            <p className="text-[10px] text-slate-500 font-mono">Pj. Gubernur DKI Jakarta</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-slate-900 border-b border-dotted border-slate-400 px-4">
                Teguh Setyabudi
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{sp4nReport.mayorSignatoryName}</p>
            <p className="text-[9px] text-slate-400 font-mono">NIP: 19670308 199303 1 001</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-slate-700">KEPALA SMART CITY</p>
            <p className="text-[10px] text-slate-500 font-mono">Kepala BLUD Smart City</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-blue-900 border-b border-dotted border-slate-400 px-4">
                Yudhistira Nugraha
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{sp4nReport.headOfSmartCityName}</p>
            <p className="text-[9px] text-slate-400 font-mono">NIP: 19840214 200801 1 005</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-slate-700">OMBUDSMAN RI</p>
            <p className="text-[10px] text-slate-500 font-mono">Perwakilan Jakarta Raya</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-emerald-900 border-b border-dotted border-slate-400 px-4">
                Dedy Irsan
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{sp4nReport.ombudsmanRepresentativeName}</p>
            <p className="text-[9px] text-slate-400 font-mono">REG: ORI-JKT-8821</p>
          </div>
        </div>

        {/* Security QR Seal Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>TERDAFTAR DI SISTEM NASIONAL SP4N LAPOR! KEMENPAN-RB // HASH: {sp4nReport.verificationHash}</span>
          </div>
          <span>TIMESTAMP: 25-SEP-2026 17:15 UTC+8</span>
        </div>
      </div>
    </div>
  );
}
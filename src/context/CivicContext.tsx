"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CitizenReport,
  FieldDispatchTeam,
  MunicipalKPIs,
  DistrictAnalytics,
  Sp4nAuditReport,
} from "@/types/civic";

const INITIAL_REPORTS: CitizenReport[] = [
  {
    id: "REP-2026-001",
    ticketNumber: "JAK-BM-9921",
    category: "POTHOLE_ROAD_DAMAGE",
    title: "Lubang Jalan Amblas Diameter 1.2m di Jalur Busway",
    description: "Aspal berlubang cukup dalam membahayakan pengendara motor dan Transjakarta, tepat 50m sebelum Halte Harmoni.",
    districtKecamatan: "Gambir, Jakarta Pusat",
    streetAddress: "Jl. Gajah Mada No. 18",
    coordinates: { lat: -6.1624, lng: 106.8189 },
    reportedBy: "Darmawan Santoso",
    citizenContact: "0812-8821-4491",
    channel: "MOBILE_APP",
    severity: "HIGH_PRIORITY",
    status: "DISPATCHED_TO_FIELD",
    reportedAt: "25 Sep 2026, 08:30 WIB",
    slaDeadlineHours: 24,
    remainingHours: 14.5,
    assignedTeamId: "TEAM-BM-01",
  },
  {
    id: "REP-2026-002",
    ticketNumber: "JAK-SDA-4820",
    category: "FLOODING_DRAINAGE",
    title: "Genangan Banjir 40cm Akibat Saluran Tersumbat Sampah",
    description: "Air meluap ke badan jalan setelah hujan deras, drainase tersumbat sedimen lumpur dan material proyek.",
    districtKecamatan: "Cilandak, Jakarta Selatan",
    streetAddress: "Jl. Fatmawati Raya No. 42",
    coordinates: { lat: -6.2891, lng: 106.7942 },
    reportedBy: "Ibu Nurul Aini",
    citizenContact: "0813-9942-1200",
    channel: "CALL_CENTER_112",
    severity: "CRITICAL_HAZARD",
    status: "WORK_IN_PROGRESS",
    reportedAt: "25 Sep 2026, 09:15 WIB",
    slaDeadlineHours: 12,
    remainingHours: 5.2,
    assignedTeamId: "TEAM-SDA-02",
  },
  {
    id: "REP-2026-003",
    ticketNumber: "JAK-PJU-1142",
    category: "STREETLIGHT_OUTAGE",
    title: "Lampu PJU Mati Total Sepanjang 300 Meter Jalur Rawan",
    description: "Sebanyak 6 tiang penerangan jalan umum mati berderet membuat area gelap dan rawan tindak kriminal.",
    districtKecamatan: "Pancoran, Jakarta Selatan",
    streetAddress: "Jl. Duren Tiga Timur",
    coordinates: { lat: -6.2514, lng: 106.8423 },
    reportedBy: "Agus Pratama",
    citizenContact: "0857-1120-8842",
    channel: "WHATSAPP_BOT",
    severity: "MEDIUM",
    status: "TRIAGED_PENDING",
    reportedAt: "25 Sep 2026, 10:00 WIB",
    slaDeadlineHours: 48,
    remainingHours: 41.8,
  },
  {
    id: "REP-2026-004",
    ticketNumber: "JAK-LH-5519",
    category: "ILLEGAL_WASTE_DUMP",
    title: "Tumpukan Sampah Liar Menumpuk di Bantaran Kali Ciliwung",
    description: "Volume sampah diperkirakan mencapai 3 ton menimbulkan bau menyengat dan mengotori aliran air sungai.",
    districtKecamatan: "Jatinegara, Jakarta Timur",
    streetAddress: "Jl. Otista Raya Bantaran Ciliwung",
    coordinates: { lat: -6.2312, lng: 106.8654 },
    reportedBy: "Ketua RT 05 RW 02",
    citizenContact: "0811-9981-3321",
    channel: "SP4N_LAPOR",
    severity: "HIGH_PRIORITY",
    status: "DISPATCHED_TO_FIELD",
    reportedAt: "25 Sep 2026, 07:45 WIB",
    slaDeadlineHours: 24,
    remainingHours: 16.0,
    assignedTeamId: "TEAM-LH-01",
  },
  {
    id: "REP-2026-005",
    ticketNumber: "JAK-DIS-8802",
    category: "FALLEN_TREE_HAZARD",
    title: "Dahan Pohon Trembesi Tua Rapuh Nyaris Tumbang ke Jalan",
    description: "Dahan besar berdiameter 40cm miring ke kabel listrik PLN dan jalur lintasan kendaraan.",
    districtKecamatan: "Kebayoran Baru, Jakarta Selatan",
    streetAddress: "Jl. Kyai Maja Depan RS Pusat Pertamina",
    coordinates: { lat: -6.2411, lng: 106.7915 },
    reportedBy: "Rian Hidayat",
    citizenContact: "0878-4421-9900",
    channel: "MOBILE_APP",
    severity: "CRITICAL_HAZARD",
    status: "RESOLVED_VERIFIED",
    reportedAt: "25 Sep 2026, 06:20 WIB",
    slaDeadlineHours: 8,
    remainingHours: 0,
    assignedTeamId: "TEAM-LH-02",
    resolvedAt: "25 Sep 2026, 09:40 WIB",
  },
];

const INITIAL_TEAMS: FieldDispatchTeam[] = [
  {
    id: "TEAM-BM-01",
    name: "Pasukan Kuning Reaksi Cepat 01",
    department: "DINAS_BINA_MARGA",
    unitCallsign: "KUNING-CENTRAL-1",
    leaderName: "Suryadi (Koordinator Jalan)",
    crewCount: 6,
    activeTaskId: "REP-2026-001",
    currentLocation: "Jl. Gajah Mada (Harmoni)",
    status: "ON_SCENE_REPAIRING",
  },
  {
    id: "TEAM-SDA-02",
    name: "Pasukan Biru Satgas Drainase 02",
    department: "DINAS_SUMBER_DAYA_AIR",
    unitCallsign: "BIRU-SOUTH-2",
    leaderName: "Wahyu Triyono",
    crewCount: 8,
    activeTaskId: "REP-2026-002",
    currentLocation: "Jl. Fatmawati Raya",
    status: "ON_SCENE_REPAIRING",
  },
  {
    id: "TEAM-LH-01",
    name: "Pasukan Oranye Kebersihan 01",
    department: "DINAS_LINGKUNGAN_HIDUP",
    unitCallsign: "ORANYE-EAST-1",
    leaderName: "Hendra Gunawan",
    crewCount: 10,
    activeTaskId: "REP-2026-004",
    currentLocation: "Jl. Otista Raya",
    status: "EN_ROUTE",
  },
  {
    id: "TEAM-PJU-03",
    name: "Regu Khusus PJU & Kelistrikan Kota",
    department: "DINAS_PERHUBUNGAN",
    unitCallsign: "DISHUB-LIGHT-3",
    leaderName: "Eko Wicaksono",
    crewCount: 4,
    currentLocation: "Pool Dishub MT Haryono",
    status: "STANDBY_BASE",
  },
];

const INITIAL_DISTRICTS: DistrictAnalytics[] = [
  {
    districtName: "Gambir (Jakarta Pusat)",
    totalComplaints: 42,
    resolvedComplaints: 40,
    slaCompliancePct: 95.2,
    averageResolutionHours: 3.4,
    citizenCsatRating: 4.88,
    allocatedEmergencyBudgetMillionIdr: 450,
  },
  {
    districtName: "Cilandak (Jakarta Selatan)",
    totalComplaints: 38,
    resolvedComplaints: 35,
    slaCompliancePct: 92.1,
    averageResolutionHours: 4.2,
    citizenCsatRating: 4.75,
    allocatedEmergencyBudgetMillionIdr: 380,
  },
  {
    districtName: "Jatinegara (Jakarta Timur)",
    totalComplaints: 54,
    resolvedComplaints: 49,
    slaCompliancePct: 90.7,
    averageResolutionHours: 5.1,
    citizenCsatRating: 4.65,
    allocatedEmergencyBudgetMillionIdr: 520,
  },
  {
    districtName: "Kebayoran Baru (Jakarta Selatan)",
    totalComplaints: 28,
    resolvedComplaints: 28,
    slaCompliancePct: 100.0,
    averageResolutionHours: 2.8,
    citizenCsatRating: 4.95,
    allocatedEmergencyBudgetMillionIdr: 310,
  },
];

const INITIAL_SP4N_REPORT: Sp4nAuditReport = {
  reportDocumentNo: "LAKIP/SP4N-LAPOR/DKI/2026/09/104",
  reportingPeriod: "TRIWULAN III TAHUN ANGGARAN 2026",
  cityGovernmentName: "PEMERINTAH PROVINSI DKI JAKARTA",
  ombudsmanRegion: "PERWAKILAN OMBUDSMAN RI WILAYAH JAKARTA RAYA",
  totalAuditedTickets: 1620,
  withinSlaCount: 1568,
  breachedSlaCount: 52,
  ikmPublicSatisfactionIndex: 88.4, // Kategori Sangat Baik
  mayorSignatoryName: "Teguh Setyabudi, M.Si (Pj. Gubernur DKI Jakarta)",
  headOfSmartCityName: "Yudhistira Nugraha, D.Phil (Kepala BLUD Smart City)",
  ombudsmanRepresentativeName: "Dedy Irsan, SH, M.Hum (Kepala Ombudsman RI Jakarta)",
  verificationHash: "SP4N-OMBUDSMAN-DKI-8841-A9C2",
};

interface CivicContextType {
  reports: CitizenReport[];
  teams: FieldDispatchTeam[];
  districts: DistrictAnalytics[];
  kpis: MunicipalKPIs;
  sp4nReport: Sp4nAuditReport;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  dispatchTeamToReport: (reportId: string, teamId: string) => void;
  resolveReport: (reportId: string) => void;
  escalateSeverity: (reportId: string) => void;
  updateDistrictBudget: (districtName: string, newBudgetMillion: number) => void;
  resetToDefaults: () => void;
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export const CivicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<CitizenReport[]>(INITIAL_REPORTS);
  const [teams, setTeams] = useState<FieldDispatchTeam[]>(INITIAL_TEAMS);
  const [districts, setDistricts] = useState<DistrictAnalytics[]>(INITIAL_DISTRICTS);
  const [sp4nReport] = useState<Sp4nAuditReport>(INITIAL_SP4N_REPORT);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  // Sync from LocalStorage
  useEffect(() => {
    try {
      const savedRep = localStorage.getItem("civic_reports_v1");
      const savedTeams = localStorage.getItem("civic_teams_v1");
      const savedDist = localStorage.getItem("civic_districts_v1");
      if (savedRep) setReports(JSON.parse(savedRep));
      if (savedTeams) setTeams(JSON.parse(savedTeams));
      if (savedDist) setDistricts(JSON.parse(savedDist));
    } catch {
      console.warn("Storage fallback");
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("civic_reports_v1", JSON.stringify(reports));
    localStorage.setItem("civic_teams_v1", JSON.stringify(teams));
    localStorage.setItem("civic_districts_v1", JSON.stringify(districts));
  }, [reports, teams, districts]);

  // Recalculate Municipal KPIs
  const pendingCount = reports.filter((r) => r.status === "TRIAGED_PENDING").length;
  const inProgressCount = reports.filter((r) => r.status === "DISPATCHED_TO_FIELD" || r.status === "WORK_IN_PROGRESS").length;
  const resolvedCount = reports.filter((r) => r.status === "RESOLVED_VERIFIED").length;

  const kpis: MunicipalKPIs = {
    totalIncomingReportsToday: 148,
    activePendingTriageCount: pendingCount,
    inProgressFieldWorksCount: inProgressCount,
    resolvedTodayCount: 114 + resolvedCount,
    slaCompliancePercentage: 96.8,
    averageResolutionHours: 4.8,
    citizenSatisfactionScore: 4.82,
  };

  const dispatchTeamToReport = (reportId: string, teamId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: "DISPATCHED_TO_FIELD", assignedTeamId: teamId } : r))
    );
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, activeTaskId: reportId, status: "EN_ROUTE" } : t))
    );
  };

  const resolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: "RESOLVED_VERIFIED",
              remainingHours: 0,
              resolvedAt: "25 Sep 2026, Baru Saja",
            }
          : r
      )
    );
  };

  const escalateSeverity = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, severity: "CRITICAL_HAZARD", slaDeadlineHours: 6 } : r))
    );
  };

  const updateDistrictBudget = (districtName: string, newBudgetMillion: number) => {
    setDistricts((prev) =>
      prev.map((d) => (d.districtName === districtName ? { ...d, allocatedEmergencyBudgetMillionIdr: newBudgetMillion } : d))
    );
  };

  const resetToDefaults = () => {
    setReports(INITIAL_REPORTS);
    setTeams(INITIAL_TEAMS);
    setDistricts(INITIAL_DISTRICTS);
    setActiveFilter("ALL");
    localStorage.clear();
  };

  return (
    <CivicContext.Provider
      value={{
        reports,
        teams,
        districts,
        kpis,
        sp4nReport,
        activeFilter,
        setActiveFilter,
        dispatchTeamToReport,
        resolveReport,
        escalateSeverity,
        updateDistrictBudget,
        resetToDefaults,
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => {
  const context = useContext(CivicContext);
  if (!context) throw new Error("useCivic must be used within CivicProvider");
  return context;
};
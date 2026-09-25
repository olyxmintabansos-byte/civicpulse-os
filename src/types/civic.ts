export type ComplaintCategory =
  | "POTHOLE_ROAD_DAMAGE"
  | "FLOODING_DRAINAGE"
  | "STREETLIGHT_OUTAGE"
  | "ILLEGAL_WASTE_DUMP"
  | "FALLEN_TREE_HAZARD"
  | "PUBLIC_PARK_VANDALISM";

export type ComplaintStatus =
  | "TRIAGED_PENDING"
  | "DISPATCHED_TO_FIELD"
  | "WORK_IN_PROGRESS"
  | "RESOLVED_VERIFIED";

export type SeverityLevel = "CRITICAL_HAZARD" | "HIGH_PRIORITY" | "MEDIUM" | "ROUTINE";

export interface CitizenReport {
  id: string;
  ticketNumber: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  districtKecamatan: string;
  streetAddress: string;
  coordinates: { lat: number; lng: number };
  reportedBy: string;
  citizenContact: string;
  channel: "WHATSAPP_BOT" | "MOBILE_APP" | "CALL_CENTER_112" | "SP4N_LAPOR";
  severity: SeverityLevel;
  status: ComplaintStatus;
  reportedAt: string;
  slaDeadlineHours: number;
  remainingHours: number;
  assignedTeamId?: string;
  resolutionPhotoUrl?: string;
  resolvedAt?: string;
}

export interface FieldDispatchTeam {
  id: string;
  name: string;
  department: "DINAS_BINA_MARGA" | "DINAS_SUMBER_DAYA_AIR" | "DINAS_LINGKUNGAN_HIDUP" | "DINAS_PERHUBUNGAN";
  unitCallsign: string;
  leaderName: string;
  crewCount: number;
  activeTaskId?: string;
  currentLocation: string;
  status: "ON_SCENE_REPAIRING" | "EN_ROUTE" | "STANDBY_BASE";
}

export interface MunicipalKPIs {
  totalIncomingReportsToday: number;
  activePendingTriageCount: number;
  inProgressFieldWorksCount: number;
  resolvedTodayCount: number;
  slaCompliancePercentage: number;
  averageResolutionHours: number;
  citizenSatisfactionScore: number; // out of 5.0
}

// Sprint 3 & 4 Types
export interface DistrictAnalytics {
  districtName: string;
  totalComplaints: number;
  resolvedComplaints: number;
  slaCompliancePct: number;
  averageResolutionHours: number;
  citizenCsatRating: number;
  allocatedEmergencyBudgetMillionIdr: number;
}

export interface Sp4nAuditReport {
  reportDocumentNo: string;
  reportingPeriod: string;
  cityGovernmentName: string;
  ombudsmanRegion: string;
  totalAuditedTickets: number;
  withinSlaCount: number;
  breachedSlaCount: number;
  ikmPublicSatisfactionIndex: number;
  mayorSignatoryName: string;
  headOfSmartCityName: string;
  ombudsmanRepresentativeName: string;
  verificationHash: string;
}

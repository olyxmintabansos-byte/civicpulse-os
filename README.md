# CivicPulse OS (Titan #21)
### Smart City Citizen Complaint Triage, 60 FPS Incident Radar, Field Officer Dispatch & SP4N LAPOR! SLA Audit ERP

![CivicPulse Architecture](https://img.shields.io/badge/Architecture-Client--Side%20Local--First-blue?style=for-the-badge)
![Compliance](https://img.shields.io/badge/Compliance-Permenpan%20RB%2062%2F2018%20%26%20SP4N%20LAPOR-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)

---

## 🌐 Live Production Deployments
- **Citizen Complaint Triage Map:** [https://olyxmintabansos-byte.github.io/civicpulse-os/](https://olyxmintabansos-byte.github.io/civicpulse-os/)
- **Field Officer Dispatch Desk:** [https://olyxmintabansos-byte.github.io/civicpulse-os/dispatch/](https://olyxmintabansos-byte.github.io/civicpulse-os/dispatch/)
- **Municipal Heatmap & Sentiment Studio:** [https://olyxmintabansos-byte.github.io/civicpulse-os/analytics/](https://olyxmintabansos-byte.github.io/civicpulse-os/analytics/)
- **Official SP4N LAPOR! SLA Audit A4 Studio:** [https://olyxmintabansos-byte.github.io/civicpulse-os/surat/](https://olyxmintabansos-byte.github.io/civicpulse-os/surat/)

---

## 📐 Arsitektur & Fitur Utama

1. **Citizen Complaint Triage Map (`/`)**:
   - Pemantauan multi-kanal pengaduan warga (WhatsApp Bot, Mobile App, Hotline Darurat 112, dan portal SP4N LAPOR!).
   - Layar radar insiden perkotaan berkecepatan **60 FPS** berbasis HTML5 Canvas yang menampilkan titik-titik keluhan (jalan amblas/rusak, genangan air/drainase, lampu PJU padam, dan tumpukan sampah liar).
   - Indikator sisa waktu kepatuhan SLA (*Service Level Agreement*) interaktif dengan batas respon 8 s/d 48 jam sesuai bobot kedaruratan.

2. **Field Officer Dispatch Desk (`/dispatch/`)**:
   - Alokasi dan perintah kerja (*Work Order*) regu reaksi cepat pemerintah kota: Pasukan Kuning (Dinas Bina Marga), Pasukan Biru (Dinas SDA), Pasukan Oranye (Dinas Lingkungan Hidup), dan Tim Dishub PJU.
   - Pemantauan status regu lapangan (*On Scene Repairing*, *En Route*, atau *Standby Base*).

3. **Municipal Heatmap Analytics & Sentiment (`/analytics/`)**:
   - Papan peringkat kinerja penanganan keluhan per wilayah kecamatan (Gambir, Cilandak, Jatinegara, Kebayoran Baru).
   - Metrik kepuasan warga (*Customer Satisfaction Score* - CSAT 4.82/5.0).
   - Simulator interaktif alokasi anggaran tanggap darurat per kecamatan berdasarkan konsentrasi indeks keparahan insiden.

4. **SP4N LAPOR! SLA Audit A4 Studio (`/surat/`)**:
   - Format cetak A4 presisi Laporan Akuntabilitas Kinerja Pelayanan Publik (LAKIP) standar Permenpan RB No. 62/2018.
   - Rekapitulasi persentase kepatuhan resolusi tepat waktu ($96.8\%$) dan perhitungan Indeks Kepuasan Masyarakat (IKM 88.4 kategori Sangat Baik).
   - Tiga blok tanda tangan resmi: Pj. Gubernur DKI Jakarta, Kepala BLUD Smart City, dan Perwakilan Ombudsman RI.

---

## 🛠️ Stack Teknologi
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";`)
- **State & Storage:** React Context + LocalStorage Persistence
- **Graphics & FX:** HTML5 Canvas (60 FPS Incident Radar) + Canvas-Confetti
- **Iconography:** Lucide React
- **Static Export:** GitHub Pages (`output: 'export'`, `trailingSlash: true`, `.nojekyll`)

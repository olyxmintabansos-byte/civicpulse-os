"use client";

import React, { useEffect, useRef } from "react";

interface IncidentPoint {
  x: number;
  y: number;
  category: string;
  severity: string;
}

export const CityIncidentCanvas: React.FC<{ activeCount: number }> = ({ activeCount }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let ringRadius = 0;

    const incidents: IncidentPoint[] = [
      { x: 140, y: 55, category: "POTHOLE", severity: "HIGH" },
      { x: 260, y: 90, category: "FLOOD", severity: "CRITICAL" },
      { x: 380, y: 40, category: "LIGHT", severity: "MEDIUM" },
      { x: 490, y: 110, category: "TREE", severity: "HIGH" },
      { x: 610, y: 70, category: "WASTE", severity: "ROUTINE" },
    ];

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = 160);

      ctx.clearRect(0, 0, width, height);

      // City District Grid lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 1;
      const step = 25;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Simulated River / Main Arterial Road
      ctx.beginPath();
      ctx.strokeStyle = "rgba(14, 165, 233, 0.25)";
      ctx.lineWidth = 12;
      ctx.moveTo(0, 80);
      ctx.bezierCurveTo(width * 0.3, 130, width * 0.7, 30, width, 90);
      ctx.stroke();

      // Radar Pulse Rings around incidents
      ringRadius = (ringRadius + 0.4) % 24;

      incidents.forEach((inc) => {
        const isCritical = inc.severity === "CRITICAL";
        const color = isCritical ? "#f43f5e" : "#f59e0b";

        // Radar Expanding Circle
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.arc(inc.x, inc.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Pin Point
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(inc.x, inc.y, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "bold 9px monospace";
        ctx.fillText(inc.category, inc.x - 14, inc.y - 8);
      });

      // Watermark HUD
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px monospace";
      ctx.fillText(
        `MUNICIPAL GIS RADAR // ACTIVE PINGS: ${activeCount} HOTSPOTS // GPS ACCURACY: ±2.4m // DRAINAGE RUNOFF: NORMAL`,
        12,
        20
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCount]);

  return (
    <div className="relative w-full h-[160px] bg-slate-950/80 rounded-xl border border-blue-900/40 p-2 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 right-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
          LIVE GPS INCIDENT RADAR
        </span>
      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";

interface ProjectReraInfo {
  name: string;
  rera: string;
  reraId?: string | null;
  reraLabel?: string | null;
  reraQrImage?: string | null;
}

interface FooterProps {
  singleProject?: ProjectReraInfo | null;
}

function ReraQr({ name, qrImage }: { name: string; qrImage?: string | null }) {
  if (qrImage) {
    return (
      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-white/10 shadow-sm w-36 h-36 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrImage} alt={`RERA QR Code for ${name}`} className="w-28 h-28 object-contain" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white border border-white/10 shadow-sm text-[#1e293b] w-36 h-36">
      {/* Mock QR Code Pattern using SVG for high performance and visual assurance */}
      <svg className="w-20 h-20 text-[#1e293b]" viewBox="0 0 100 100" fill="currentColor">
        {/* Corners */}
        <rect x="0" y="0" width="30" height="30" />
        <rect x="5" y="5" width="20" height="20" fill="white" />
        <rect x="10" y="10" width="10" height="10" />

        <rect x="70" y="0" width="30" height="30" />
        <rect x="75" y="5" width="20" height="20" fill="white" />
        <rect x="80" y="10" width="10" height="10" />

        <rect x="0" y="70" width="30" height="30" />
        <rect x="5" y="75" width="20" height="20" fill="white" />
        <rect x="10" y="80" width="10" height="10" />

        {/* Center small alignment marker */}
        <rect x="70" y="70" width="10" height="10" />
        <rect x="85" y="85" width="15" height="15" />

        {/* Random dots to make it look like a real QR code */}
        <rect x="40" y="0" width="10" height="20" />
        <rect x="40" y="30" width="20" height="10" />
        <rect x="10" y="40" width="20" height="10" />
        <rect x="50" y="10" width="10" height="10" />
        <rect x="0" y="55" width="15" height="10" />
        <rect x="25" y="55" width="10" height="10" />

        <rect x="70" y="40" width="10" height="15" />
        <rect x="85" y="30" width="15" height="10" />
        <rect x="85" y="50" width="10" height="15" />

        <rect x="40" y="50" width="10" height="35" />
        <rect x="55" y="50" width="15" height="10" />
        <rect x="55" y="70" width="10" height="20" />
        <rect x="30" y="85" width="10" height="15" />
        <rect x="15" y="85" width="10" height="5" />
      </svg>
    </div>
  );
}

export default function Footer({ singleProject }: FooterProps) {
  const [dbProjects, setDbProjects] = useState<ProjectReraInfo[]>([]);

  // Default hardcoded fallback QRs if database is empty/loading
  const fallbackQrs = [
    { name: "Godrej The Greenfront", rera: "P52100079064" },
    { name: "Godrej Evergreen Square", rera: "P52100078240" },
    { name: "Godrej River Royale", rera: "P52100052957" },
    { name: "The Aqua Retreat", rera: "PM1260002500070" },
    { name: "Godrej Elaris", rera: "PM1260002501385" },
    { name: "Godrej Aqua Vista", rera: "PM1260002500389" },
    { name: "Godrej Skyline", rera: "PM1260002400007" },
    { name: "Godrej Emerald Water (1)", rera: "P52100051200" },
    { name: "Godrej Emerald Water (2)", rera: "PP1260002500516" },
  ];

  useEffect(() => {
    if (!singleProject) {
      async function loadProjects() {
        try {
          const res = await fetch("/api/projects");
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setDbProjects(json.data);
          }
        } catch (err) {
          console.warn("Failed to load projects for footer RERA listings:", err);
        }
      }
      loadProjects();
    }
  }, [singleProject]);

  // Determine display list
  const displayQrs: ProjectReraInfo[] = singleProject
    ? [singleProject]
    : dbProjects.length > 0
      ? dbProjects
      : fallbackQrs;

  return (
    <footer className="bg-[#1e293b] text-white/80 py-16 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* RERA Agent registration */}
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-accent-gold-light uppercase border-b border-accent-gold/20 pb-2 px-4">
            Agent Rera : A51700032694
          </span>
        </div>

        {/* QR Codes Grid */}
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          {displayQrs.map((qr, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <ReraQr name={qr.name} qrImage={qr.reraQrImage} />
              <div className="text-center">
                <span className="block text-[10px] font-bold text-accent-gold truncate max-w-[144px]">
                  {qr.reraLabel || qr.name}
                </span>
                <span className="text-[9px] font-medium text-white/50 block select-all">
                  {qr.reraId || qr.rera}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="text-[10px] text-white/40 leading-relaxed border-t border-white/10 pt-8 space-y-3 font-light">
          <p>
            Disclaimer: The information provided on this website is for informational purposes only and does not constitute
            an offer or contract. All renderings, floor plans, specifications, layouts, dimensions, pricing, and project
            highlights are conceptual/representative and subject to change by the developer without prior notice.
          </p>
          <p>
            The RERA registration details are sourced directly from the Maharashtra Real Estate Regulatory Authority (MahaRERA)
            and can be verified on their official website. This website is managed by an authorized channel partner
            (RERA Agent Reg: A51700032694) to assist home buyers. Logos, trademarks, and project renders are property of
            their respective owners.
          </p>
          <p className="text-center pt-4 text-white/50 text-[11px] font-medium">
            &copy; {new Date().getFullYear()} Godrej Properties Pune. All Rights Reserved. Managed by Authorized Channel Partner.
          </p>
        </div>

      </div>
    </footer>
  );
}

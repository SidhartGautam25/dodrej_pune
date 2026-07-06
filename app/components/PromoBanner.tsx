"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PromoBannerData {
  imageUrl: string;
  sec1Title: string;
  sec1Sub: string;
  sec2Title: string;
  sec2Sub: string;
  sec3Title: string;
  sec3Sub: string;
  sec4Title: string;
  sec4Sub: string;
}

interface PromoBannerProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function PromoBanner({ onOpenEnquiry }: PromoBannerProps) {
  const [data, setData] = useState<PromoBannerData>({
    imageUrl: "/assets/one_percent_plan.png",
    sec1Title: "Premium 2, 3 & 4 BHK",
    sec1Sub: "Starting At ₹82 Lacs*",
    sec2Title: "At Prime Locations",
    sec2Sub: "Of Pune",
    sec3Title: "Introducing The",
    sec3Sub: "1% Payment Plan",
    sec4Title: "New Launch",
    sec4Sub: "Projects",
  });

  useEffect(() => {
    async function loadBanner() {
      try {
        const res = await fetch("/api/promo-banner");
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.warn("Failed to load promo banner data, using defaults:", err);
      }
    }
    loadBanner();
  }, []);

  return (
    <div className="w-full bg-white text-text-main">
      {/* 1. Full-Width Promotional Banner Image */}
      {/* 1. Full-Width Promotional Banner Image */}
      <div className="w-full relative overflow-hidden bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.imageUrl}
          alt="Promotional Banner"
          className="w-full h-auto block"
        />
      </div>

      {/* 2. Official Brand Primary Theme Action Bar */}
      <div className="w-full bg-primary py-4 px-4 border-y border-white/5 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:items-center sm:gap-4">
          <button
            onClick={() => onOpenEnquiry("Book Site Visit")}
            className="w-full sm:w-auto justify-center gold-gradient hover:gold-gradient-hover text-primary rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
          >
            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4M8 6C5.79 6 4 7.79 4 10v4c0 2.21 1.79 4 4 4h8" />
            </svg>
            <span className="whitespace-nowrap">Book Site Visit</span>
          </button>

          <button
            onClick={() => onOpenEnquiry("Get Details")}
            className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 shadow-sm hover:scale-[1.02] cursor-pointer"
          >
            <svg className="w-4 h-4 text-accent-gold-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="whitespace-nowrap">Get Details</span>
          </button>
        </div>
      </div>

      {/* 3. Four Column Content Section */}
      <div className="w-full border-b border-black/[0.06] py-8 bg-bg-tan/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-y-0 text-center relative divide-y divide-black/[0.06] md:divide-y-0 md:divide-x md:divide-black/[0.08]">

          {/* Section 1 */}
          <div className="flex flex-col justify-center px-4 pb-4 md:pb-0">
            <span className="text-xs md:text-sm font-extrabold text-primary tracking-tight leading-snug">
              {data.sec1Title}
            </span>
            <span className="text-[10px] md:text-xs font-semibold mt-1.5 uppercase tracking-wider">
              {data.sec1Sub}
            </span>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col justify-center px-4 py-4 md:py-0">
            <span className="text-xs md:text-sm font-extrabold text-primary tracking-tight leading-snug">
              {data.sec2Title}
            </span>
            <span className="text-[10px] md:text-xs font-semibold  mt-1.5 uppercase tracking-wider">
              {data.sec2Sub}
            </span>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col justify-center px-4 py-4 md:py-0">
            <span className="text-xs md:text-sm font-extrabold text-primary tracking-tight leading-snug">
              {data.sec3Title}
            </span>
            <span className="text-[10px] md:text-xs font-semibold  mt-1.5 uppercase tracking-wider">
              {data.sec3Sub}
            </span>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col justify-center px-4 pt-4 md:pt-0">
            <span className="text-xs md:text-sm font-extrabold text-primary tracking-tight leading-snug">
              {data.sec4Title}
            </span>
            <span className="text-[10px] md:text-xs font-semibold mt-1.5 uppercase tracking-wider">
              {data.sec4Sub}
            </span>
          </div>

        </div>
      </div>

      {/* 4. India's No. 1 Developer text & introduction */}
      {/* <div className="w-full bg-white py-12 px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-xs md:text-sm font-extrabold tracking-widest text-accent-gold-dark uppercase font-serif">
            India's No.1 Real Estate Developer
          </h3>
          <p className="text-[11px] md:text-xs text-text-muted leading-relaxed font-medium">
            Explore premium homes by Godrej Properties across Pune, crafted for those who seek more from everyday living.
            Located in high-potential areas, these communities combine smart connectivity, green landscapes, and elevated comfort—delivering
            both lifestyle and long-term value.
          </p>
        </div>
      </div> */}
    </div>
  );
}

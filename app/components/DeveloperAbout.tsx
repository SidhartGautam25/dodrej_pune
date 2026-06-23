"use client";

import React, { useState } from "react";
import { projectsData } from "../data/projects";

interface DeveloperAboutProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function DeveloperAbout({ onOpenEnquiry }: DeveloperAboutProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    project: projectsData[0].name,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) return setError("Please enter your name.");
    if (!formData.email.trim()) return setError("Please enter your email.");
    if (!formData.phone.trim() || formData.phone.length < 10) {
      return setError("Please enter a valid 10-digit phone number.");
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: formData.project,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit request.");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        project: projectsData[0].name,
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="about-section" className="py-20 px-4 md:px-8 bg-bg-tan border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold tracking-widest text-accent-gold-dark uppercase block mb-1">
            Legacy of Trust
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary">
            About Developer
          </h2>
          <div className="w-12 h-1 bg-accent-gold rounded-full" />
          
          <div className="space-y-4 text-sm text-text-main/90 leading-relaxed font-medium">
            <p>
              Godrej Properties brings the renowned Godrej Properties philosophy of innovation, sustainability, and
              excellence to the real estate industry. Each development by Godrej Properties blends a 122-year legacy of
              trust and superior quality with a dedication to cutting-edge design and technology. This commitment has
              not gone unnoticed; in recent years, Godrej Properties has garnered over 250 awards and recognitions.
            </p>
            <p>
              Among these accolades are notable honors such as 'The Most Trusted Real Estate Brand' in 2019 from the
              Brand Trust Report, and 'Real Estate Company of the Year' at the 9th Construction Week Awards 2019.
              Furthermore, the company was celebrated as the 'Equality and Diversity Champion' in 2019 at the APREA
              Property Leaders Awards, and it was named 'The Economic Times Best Real Estate Brand' in 2018.
              Additionally, Godrej Properties earned the prestigious title of 'Builder of the Year' at the CNBC-Awaaz
              Real Estate Awards 2018.
            </p>
          </div>

          {/* Call Badge */}
          <div className="pt-4">
            <a
              href="tel:+919225532615"
              className="inline-flex items-center space-x-3 bg-white border border-accent-gold/40 hover:border-accent-gold rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-accent-gold/15 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="block text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                  Talk to Sales Executive
                </span>
                <span className="text-base font-extrabold text-primary tracking-wide">
                  +91-9225532615
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Lead Form Card */}
        <div className="lg:col-span-5 w-full">
          <div className="w-full rounded-2xl shadow-lg bg-[#334155]/90 backdrop-blur-md p-6 md:p-8 border border-white/10 text-white">
            <h3 className="text-lg font-bold font-serif text-accent-gold mb-6 border-b border-white/10 pb-3">
              Get a Call Back from Our Expert:
            </h3>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-10 space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-serif text-accent-gold">Request Submitted!</h4>
                <p className="text-[11px] text-white/70 max-w-xs">
                  We have received your enquiry. An expert will reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-4 py-1.5 rounded-full border border-white/20 hover:border-accent-gold text-xs transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 text-xs text-red-200 bg-red-500/20 border border-red-500/30 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b]/90 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent-gold text-white"
                  >
                    {projectsData.map((proj) => (
                      <option key={proj.id} value={proj.name} className="bg-primary text-white">
                        {proj.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b]/90 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b]/90 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                  />
                </div>

                <div>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-lg border border-r-0 border-white/20 bg-[#1e293b] text-xs text-white/70">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      placeholder="Enter Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#1e293b]/90 border border-white/20 rounded-r-lg px-3.5 py-2.5 text-xs placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="Enter Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b]/90 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                  />
                </div>

                <div className="flex items-start mt-2">
                  <input
                    type="checkbox"
                    id="about-consent"
                    required
                    defaultChecked
                    className="mt-1 mr-2 rounded text-accent-gold bg-primary border-white/20 focus:ring-accent-gold"
                  />
                  <label htmlFor="about-consent" className="text-[10px] text-white/50 leading-tight">
                    I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg gold-gradient hover:gold-gradient-hover text-[#1e293b] font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : null}
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT NOW"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

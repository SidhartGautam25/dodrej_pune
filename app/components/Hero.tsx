"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectsData } from "../data/projects";

interface HeroProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
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
    <section className="relative min-h-[95vh] w-full flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-primary">
      {/* Background Image with blur effect at edges */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero_bg.png"
          alt="Godrej Pune Projects"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Dark overlay for glassmorphism readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-black/40 to-primary/30 z-0" />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        
        {/* Left Column: Glass Info Card */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-white max-w-2xl">
          <div className="w-full rounded-2xl shadow-xl glass-card p-6 md:p-8 border border-white/10">
            <span className="text-sm font-bold tracking-widest text-accent-gold uppercase mb-1 block">
              Pune
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-serif mb-6 leading-tight">
              Godrej Projects
            </h1>

            {/* List of Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center border border-accent-gold/30">
                  <svg className="w-4.5 h-4.5 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium tracking-wide">Avail Pre-Launch Offers!</span>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center border border-accent-gold/30">
                  <svg className="w-4.5 h-4.5 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.554-.589 1.448-.589 2.002 0l.207.22 1.213-.879a3.75 3.75 0 01.004 5.303l-2.002 2.002a3.75 3.75 0 01-5.304-5.303l1.213.88.207-.223zm3.134 5.164l-.207-.22-1.213.879a3.75 3.75 0 01-.004-5.303l2.002-2.002a3.75 3.75 0 015.304 5.303l-1.213-.88-.207.223z" />
                  </svg>
                </div>
                <span className="text-sm font-medium tracking-wide">Avail Special Payment plans</span>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center border border-accent-gold/30">
                  <svg className="w-4.5 h-4.5 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h3a1 1 0 100-2H9z" />
                  </svg>
                </div>
                <span className="text-sm font-medium tracking-wide">Fully Furnished Apartments</span>
              </div>
            </div>

            {/* Pricing capsules */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="px-5 py-3 rounded-full bg-accent-gold/25 border border-accent-gold text-white font-semibold text-center text-sm tracking-wide">
                1, 2, 3 & 4 BHK Apartments
              </div>
              <div className="px-5 py-3 rounded-full bg-accent-gold text-primary font-bold text-center text-sm tracking-wide shadow-md">
                Starting Price : ₹ 75 Lacs*
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Callback Form */}
        <div className="lg:col-span-5 w-full">
          <div className="w-full rounded-2xl shadow-xl glass-card p-6 md:p-8 border border-white/10 text-white">
            <h3 className="text-lg md:text-xl font-semibold tracking-tight font-serif text-accent-gold mb-6 border-b border-white/10 pb-3">
              Get a Call Back from Our Expert:
            </h3>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400">
                  <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-serif text-accent-gold">Request Submitted!</h4>
                <p className="text-xs text-white/70 max-w-xs leading-relaxed">
                  Thank you for your interest. An executive will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-5 py-1.5 rounded-full border border-white/20 hover:border-accent-gold text-xs transition-colors"
                >
                  Submit Another Query
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
                    className="w-full bg-primary/75 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent-gold text-white"
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
                    className="w-full bg-primary/75 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-primary/75 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                  />
                </div>

                <div>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-lg border border-r-0 border-white/20 bg-primary/90 text-xs text-white/70">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      placeholder="Enter Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-primary/75 border border-white/20 rounded-r-lg px-3.5 py-2.5 text-xs placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
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
                    className="w-full bg-primary/75 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                  />
                </div>

                <div className="flex items-start mt-2">
                  <input
                    type="checkbox"
                    id="hero-consent"
                    required
                    defaultChecked
                    className="mt-1 mr-2 rounded text-accent-gold bg-primary border-white/20 focus:ring-accent-gold"
                  />
                  <label htmlFor="hero-consent" className="text-[10px] text-white/50 leading-tight">
                    I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg gold-gradient hover:gold-gradient-hover text-primary font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50"
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

      {/* Rotating Circle Text Badge at bottom center */}
      <div 
        onClick={() => onOpenEnquiry("Site Visit")}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center w-28 h-28 cursor-pointer group hover:scale-105 transition-transform duration-300 hidden md:flex"
      >
        <div className="absolute inset-0 rounded-full bg-black/40 border border-white/10 backdrop-blur-md" />
        {/* Rotating text */}
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow text-white text-[9.5px] font-bold tracking-widest fill-current">
          <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text>
            <textPath href="#circlePath" startOffset="0%">
              • Book A Free Site Visit Now! • Book A Free Site Visit Now!
            </textPath>
          </text>
        </svg>
        {/* Center car icon */}
        <div className="absolute w-12 h-12 rounded-full bg-accent-gold text-primary flex items-center justify-center shadow-lg group-hover:bg-accent-gold-dark transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>
    </section>
  );
}

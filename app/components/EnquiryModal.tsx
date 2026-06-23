"use client";

import React, { useState, useEffect } from "react";
import { projectsData } from "../data/projects";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function EnquiryModal({ isOpen, onClose, defaultProject = "" }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    project: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        project: defaultProject || prev.project || projectsData[0].name,
      }));
      setIsSuccess(false);
      setError("");
    }
  }, [isOpen, defaultProject]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
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
        throw new Error(json.error || "Failed to submit enquiry.");
      }

      setIsSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        project: "",
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl glass-card text-white border border-white/20 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight font-serif text-accent-gold">
            {isSuccess ? "Thank You!" : "Enquire / Request Call Back"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 animate-pulse">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-2xl font-serif text-accent-gold">Submission Received!</h4>
              <p className="text-white/80 max-w-sm text-sm">
                Our property expert will contact you shortly on your provided number. Have a great day!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded-full gold-gradient text-primary font-medium tracking-wide shadow-lg hover:shadow-accent-gold/20 hover:scale-105 transition-all duration-200"
              >
                Close
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
                <label className="block text-xs uppercase tracking-wider text-accent-gold/80 mb-1.5 font-medium">
                  Select Project
                </label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-primary/80 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent-gold text-white"
                >
                  {projectsData.map((proj) => (
                    <option key={proj.id} value={proj.name} className="bg-primary text-white">
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold/80 mb-1.5 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-primary/80 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold/80 mb-1.5 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-primary/80 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold/80 mb-1.5 font-medium">
                  Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-lg border border-r-0 border-white/20 bg-primary/90 text-sm text-white/70">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    placeholder="Enter Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-primary/80 border border-white/20 rounded-r-lg px-3.5 py-2.5 text-sm placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-accent-gold/80 mb-1.5 font-medium">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Enter Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-primary/80 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm placeholder-white/40 focus:outline-none focus:border-accent-gold text-white"
                />
              </div>

              <div className="flex items-start mt-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  defaultChecked
                  className="mt-1 mr-2 rounded text-accent-gold bg-primary border-white/20 focus:ring-accent-gold"
                />
                <label htmlFor="consent" className="text-[10px] text-white/60 leading-tight">
                  I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 rounded-lg gold-gradient hover:gold-gradient-hover text-primary font-semibold tracking-wider transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
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
  );
}

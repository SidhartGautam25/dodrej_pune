"use client";

import React, { useState, useEffect } from "react";
import { projectsData } from "../data/projects";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function EnquiryModal({ isOpen, onClose, defaultProject = "" }: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
    project: "",
  });

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch all listed projects dynamically from the database
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjectsList(json.data);
        } else {
          setProjectsList(projectsData);
        }
      } catch (err) {
        console.warn("Failed to fetch projects for modal dropdown:", err);
        setProjectsList(projectsData);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        project: defaultProject || prev.project || (projectsList.length > 0 ? projectsList[0].name : ""),
      }));
      setName("");
      setIsSuccess(false);
      setError("");
    }
  }, [isOpen, defaultProject, projectsList]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Please enter your Name.");
    if (!formData.project) return setError("Please select a Project of Interest.");
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10) {
      return setError("Please enter a valid 10-digit Phone Number.");
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: formData.project,
          name: name.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message || `Request callback for ${formData.project}`,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit enquiry.");
      }

      setIsSuccess(true);
      setFormData({
        email: "",
        phone: "",
        message: "",
        project: "",
      });
      setName("");
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-gray-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-800 hover:text-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 animate-bounce">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900">Request Submitted!</h4>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Thank you for your interest. A representative will contact you shortly on your mobile number.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-2.5 bg-[#658216] hover:bg-[#536b12] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header Text */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight leading-tight">
                Godrej Property Pune
              </h3>
              <p className="text-xs text-gray-600 font-semibold mt-1.5">
                Register Here And Avail The Best Benefits!!
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name*"
                className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-sm text-gray-800 placeholder-gray-400 font-medium transition-colors"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <div className="flex items-center border-b border-gray-300 focus-within:border-gray-800 py-1 transition-colors">
                <div className="flex items-center space-x-1 pr-2 select-none mr-2 border-r border-gray-200">
                  <span className="text-sm">🇮🇳</span>
                  <svg className="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-400 font-medium"
                  required
                />
              </div>
            </div>

            {/* Email Field (Optional) */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (Optional)"
                className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-sm text-gray-800 placeholder-gray-400 font-medium transition-colors"
              />
            </div>

            {/* Project Select Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-500">Project of Interest*</label>
              <div className="relative">
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-sm text-gray-800 font-medium appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Project</option>
                  {projectsList.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start mt-6">
              <input
                type="checkbox"
                id="consent"
                required
                defaultChecked
                className="mt-1 mr-3 rounded border-gray-300 text-gray-800 focus:ring-gray-800 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="consent" className="text-[10px] text-gray-500 leading-normal font-medium select-none">
                I Consent to The Processing of Provided Data According To{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">Privacy Policy</a>
                {" | "}
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">Terms & Conditions</a>. 
                I Authorize Prop Solutions 4 U Pvt. Ltd. and its representatives to Call, SMS, Email or WhatsApp Me About Its Products and Benefits. This Consent Overrides Any Registration For DNC/NDNC.
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-xs py-3 px-8 bg-[#658216] hover:bg-[#536b12] text-white font-bold text-sm rounded-xl transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-md text-center transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? "Submitting..." : "Enquire Now"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

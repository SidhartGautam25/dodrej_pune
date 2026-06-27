"use client";

import React, { useState, useEffect } from "react";
import { projectsData } from "../data/projects";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function EnquiryModal({ isOpen, onClose, defaultProject = "" }: EnquiryModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
    project: "",
  });

  const [modalImage, setModalImage] = useState("/assets/hero_bg.png");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        project: defaultProject || prev.project || projectsData[0].name,
      }));
      setFirstName("");
      setLastName("");
      setIsSuccess(false);
      setError("");

      // Pick a random project cover image for the modal header
      if (projectsData.length > 0) {
        const randomIndex = Math.floor(Math.random() * projectsData.length);
        const selected = projectsData[randomIndex];
        if (selected && selected.image) {
          setModalImage(selected.image);
        }
      }
    }
  }, [isOpen, defaultProject]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim()) return setError("Please enter your First Name.");
    if (!lastName.trim()) return setError("Please enter your Last Name.");
    if (!formData.email.trim()) return setError("Please enter your Email.");
    if (!formData.phone.trim() || formData.phone.length < 10) {
      return setError("Please enter a valid 10-digit Phone Number.");
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: formData.project,
          name: `${firstName.trim()} ${lastName.trim()}`,
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
      setFirstName("");
      setLastName("");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Section */}
        <div className="relative w-full h-44 sm:h-52 bg-gray-100">
          <img
            src={modalImage}
            alt="Godrej Property Banner"
            className="w-full h-full object-cover"
          />
          {/* Red Circle Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-[#ef4444] text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Bottom Form Section */}
        <div className="p-6 sm:p-8">
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
                className="mt-6 px-8 py-2.5 bg-[#1e293b] hover:bg-black text-white font-bold text-xs rounded shadow-md transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-center text-gray-800 tracking-tight leading-tight">
                Welcome to Godrej Properties Limited
              </h3>
              <p className="text-[11px] text-gray-500 text-center mb-6 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                Find your perfect home at {formData.project || "Godrej Projects"} with premium amenities and a location that keeps you connected.
              </p>

              {error && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}

              {/* First Name & Last Name (2 columns) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-gray-400 font-bold uppercase mb-0.5">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-1 text-xs text-gray-800 placeholder-gray-300 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-gray-400 font-bold uppercase mb-0.5">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-1 text-xs text-gray-800 placeholder-gray-300 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[9px] text-gray-400 font-bold uppercase mb-0.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-1.5 text-xs text-gray-800 placeholder-gray-300 font-medium"
                  required
                />
              </div>

              {/* Mobile Field */}
              <div>
                <label className="block text-[9px] text-gray-400 font-bold uppercase mb-0.5">Mobile * (Click flag to change country)</label>
                <div className="flex items-center border-b border-gray-300 focus-within:border-gray-800">
                  <div className="flex items-center space-x-1 py-1.5 text-xs text-gray-500 select-none mr-2 font-medium">
                    <span className="text-sm">🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full bg-transparent focus:outline-none py-1.5 text-xs text-gray-800 placeholder-gray-300 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start mt-4">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  defaultChecked
                  className="mt-1 mr-2.5 rounded border-gray-300 text-gray-800 focus:ring-gray-800 w-3.5 h-3.5"
                />
                <label htmlFor="consent" className="text-[10px] text-gray-500 leading-tight">
                  Yes, I would like to receive updates & promotions from Godrej Properties Limited.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mx-auto block mt-6 px-10 py-2.5 bg-[#1e293b] hover:bg-black text-white font-bold text-xs rounded transition-colors disabled:opacity-50 uppercase tracking-widest cursor-pointer shadow-md"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

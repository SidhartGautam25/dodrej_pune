"use client";

import React, { useState, useEffect } from "react";
import { ProjectDataInput } from "../hooks/useProjects";
import { X, Plus, Trash, Upload, Image as ImageIcon } from "lucide-react";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectDataInput) => void;
  initialData?: any | null;
  isSubmitting: boolean;
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting,
}: ProjectFormModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [typology, setTypology] = useState("");
  const [price, setPrice] = useState("");
  const [possession, setPossession] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [rera, setRera] = useState("");
  const [category, setCategory] = useState<"apartments" | "plots">("apartments");
  
  // Highlights handling
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");

  // File Upload handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [validationError, setValidationError] = useState("");

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setLocation(initialData.location || "");
      setTypology(initialData.typology || "");
      setPrice(initialData.price || "");
      setPossession(initialData.possession || "");
      setTag1(initialData.tag1 || "");
      setTag2(initialData.tag2 || "");
      setRera(initialData.rera || "");
      setCategory(initialData.category || "apartments");
      setHighlights(initialData.highlights || []);
      setImagePreview(initialData.image || "");
      setImageFile(null);
    } else {
      // Reset form
      setName("");
      setLocation("");
      setTypology("");
      setPrice("");
      setPossession("");
      setTag1("");
      setTag2("");
      setRera("");
      setCategory("apartments");
      setHighlights([]);
      setImagePreview("");
      setImageFile(null);
    }
    setValidationError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights((prev) => [...prev, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create local preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Required fields check
    if (!name.trim()) return setValidationError("Project Name is required.");
    if (!location.trim()) return setValidationError("Location is required.");
    if (!typology.trim()) return setValidationError("Typology is required.");
    if (!price.trim()) return setValidationError("Price is required.");
    if (!rera.trim()) return setValidationError("RERA ID is required.");
    if (!imagePreview) return setValidationError("An image is required (upload a file).");

    const submissionData: ProjectDataInput = {
      id: initialData?.id,
      name,
      location,
      typology,
      price,
      possession,
      tag1,
      tag2,
      rera,
      category,
      highlights,
      image: imageFile, // Passed as File to be appended in FormData
    };

    onSubmit(submissionData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/[0.05] flex items-center justify-between bg-bg-tan/20">
          <h3 className="text-lg font-bold font-serif text-primary">
            {initialData ? "Edit Godrej Project" : "Add New Godrej Project"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 text-text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto p-6 space-y-6">
          {validationError && (
            <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
              {validationError}
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Project Name */}
            <div className="col-span-full">
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Project Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Godrej Eden Estate Phase 3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Location *
              </label>
              <input
                type="text"
                placeholder="e.g. At Park World, Hinjawadi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold appearance-none cursor-pointer"
              >
                <option value="apartments">Premium Apartments</option>
                <option value="plots">Luxury Plots</option>
              </select>
            </div>

            {/* Typology */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Typology *
              </label>
              <input
                type="text"
                placeholder="e.g. 2 & 3 BHK Apartments"
                value={typology}
                onChange={(e) => setTypology(e.target.value)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Price *
              </label>
              <input
                type="text"
                placeholder="e.g. ₹ 1.15 Cr* Onwards"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {/* RERA ID */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                RERA ID *
              </label>
              <input
                type="text"
                placeholder="e.g. P52100079064"
                value={rera}
                onChange={(e) => setRera(e.target.value)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {/* Possession Year */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Possession Year (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 2029"
                value={possession}
                onChange={(e) => setPossession(e.target.value)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {/* Tag 1 */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Badge Tag 1 (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 20:20:60 Payment Plan"
                value={tag1}
                onChange={(e) => setTag1(e.target.value)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {/* Tag 2 */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Badge Tag 2 (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Zero EMI for 36 Months"
                value={tag2}
                onChange={(e) => setTag2(e.target.value)}
                className="w-full bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {/* Image File Selector */}
            <div className="col-span-full">
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-2">
                Project Cover Image *
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Preview Thumbnail */}
                <div className="relative w-28 h-28 rounded-2xl bg-bg-tan border border-black/[0.06] overflow-hidden flex items-center justify-center flex-shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-text-muted" />
                  )}
                </div>

                {/* Upload Action Area */}
                <div className="flex-1 w-full">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-black/[0.12] hover:border-accent-gold rounded-2xl p-4 cursor-pointer text-center group transition-colors">
                    <Upload className="w-6 h-6 text-text-muted group-hover:text-accent-gold-dark transition-colors mb-1.5" />
                    <span className="text-xs font-bold text-primary group-hover:text-accent-gold-dark">
                      Click to upload image file
                    </span>
                    <span className="text-[9px] text-text-muted mt-1 block">
                      PNG, JPG, JPEG formats
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Highlights Lists Input */}
            <div className="col-span-full border-t border-black/[0.05] pt-4 mt-2">
              <label className="block text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1.5">
                Project Key Highlights
              </label>
              
              {/* Add highlight sub-form */}
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="e.g. Pay only 1% Every Month"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddHighlight();
                    }
                  }}
                  className="flex-1 bg-bg-tan/30 border border-black/[0.08] rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent-gold"
                />
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="bg-primary hover:bg-primary/95 text-white p-2.5 rounded-xl cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Highlights item list */}
              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-bg-tan/20 border border-black/[0.04] rounded-xl px-4 py-2 text-xs text-primary"
                  >
                    <span>{highlight}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 cursor-pointer"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {highlights.length === 0 && (
                  <span className="text-[11px] text-text-muted italic block py-2">
                    No highlights added yet.
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Footer controls */}
        <div className="px-6 py-4 border-t border-black/[0.05] flex items-center justify-end gap-3 bg-bg-tan/20">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary hover:bg-black/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmitForm}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-6 py-2.5 rounded-xl text-xs tracking-wider transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "SAVING..." : "SAVE PROJECT"}
          </button>
        </div>
      </div>
    </div>
  );
}

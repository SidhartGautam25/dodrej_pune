"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { projectsData, Project } from "../data/projects";

interface ProjectGridProps {
  onOpenEnquiry: (projectName: string) => void;
}

export default function ProjectGrid({ onOpenEnquiry }: ProjectGridProps) {
  const [activeTab, setActiveTab] = useState<"all" | "apartments" | "plots">("all");
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Map backend database format back to UI Project interface
          const mapped: Project[] = json.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            location: p.location,
            typology: p.typology,
            price: p.price,
            image: p.image,
            possession: p.possession || undefined,
            tag1: p.tag1 || undefined,
            tag2: p.tag2 || undefined,
            highlights: p.highlights,
            rera: p.rera,
            category: p.category,
          }));
          setProjects(mapped);
        }
      } catch (err) {
        console.warn("Failed to load projects from API, falling back to static data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    return project.category === activeTab;
  });

  return (
    <section id="projects-section" className="py-20 px-4 md:px-8 bg-bg-tan">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-accent-gold-dark uppercase mb-2 block">
            Project List
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary tracking-tight">
            Unlock the Door to Affordable Luxury
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-black/[0.04] p-1.5 rounded-full border border-black/[0.02]">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-primary text-white shadow-md"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveTab("apartments")}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "apartments"
                  ? "bg-primary text-white shadow-md"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              Premium Apartments
            </button>
            <button
              onClick={() => setActiveTab("plots")}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "plots"
                  ? "bg-primary text-white shadow-md"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              Luxury Plots
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenEnquiry={onOpenEnquiry}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

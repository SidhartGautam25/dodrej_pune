import React from "react";
import { notFound } from "next/navigation";
import { projectService } from "@/lib/services/ProjectService";
import { projectsData } from "@/app/data/projects";
import ProjectDetailsClient from "./ProjectDetailsClient";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import StickyWidgets from "@/app/components/StickyWidgets";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  
  // Try fetching from database, fallback to static
  let dbProject = null;
  try {
    dbProject = await projectService.getProject(id);
  } catch (err) {
    console.error("Database fetch failed in generateMetadata:", err);
  }

  const project = dbProject || projectsData.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Godrej Pune",
      description: "The requested project details could not be found.",
    };
  }

  return {
    title: `${project.name} | Godrej Properties Pune`,
    description: `Explore premium properties, pricing, layouts, floor plans, and amenities of ${project.name} located at ${project.location}.`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;

  let dbProject: any = null;
  try {
    dbProject = await projectService.getProject(id);
  } catch (err) {
    console.error("Database fetch failed in Page component:", err);
  }

  const project = dbProject
    ? {
        id: dbProject.id,
        name: dbProject.name,
        location: dbProject.location,
        typology: dbProject.typology,
        price: dbProject.price,
        image: dbProject.image,
        possession: dbProject.possession || undefined,
        tag1: dbProject.tag1 || undefined,
        tag2: dbProject.tag2 || undefined,
        highlights: Array.isArray(dbProject.highlights)
          ? dbProject.highlights
          : typeof dbProject.highlights === "string"
          ? JSON.parse(dbProject.highlights)
          : [],
        rera: dbProject.rera,
        category: dbProject.category,
        description: dbProject.description || undefined,
        amenities: Array.isArray(dbProject.amenities)
          ? dbProject.amenities
          : typeof dbProject.amenities === "string"
          ? JSON.parse(dbProject.amenities)
          : [],
        gallery: Array.isArray(dbProject.gallery)
          ? dbProject.gallery
          : typeof dbProject.gallery === "string"
          ? JSON.parse(dbProject.gallery)
          : [],
        floorPlans: Array.isArray(dbProject.floorPlans)
          ? dbProject.floorPlans
          : typeof dbProject.floorPlans === "string"
          ? JSON.parse(dbProject.floorPlans)
          : [],
      }
    : projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-bg-tan">
      {/* Dynamic Project Details Container */}
      <ProjectDetailsClient project={project} />
    </div>
  );
}

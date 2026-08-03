import React from "react";
import { notFound } from "next/navigation";
import { projectService } from "@/lib/services/ProjectService";
import { projectsData } from "@/app/data/projects";
import ProjectDetailsClient from "./ProjectDetailsClient";
import { slugify } from "@/lib/utils/slugify";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  // Try fetching from database, fallback to static
  let dbProject = null;
  try {
    const dbProjects = await projectService.listProjects();
    dbProject = dbProjects.find(p => slugify(p.name) === slug || p.id === slug) || null;
  } catch (err) {
    console.error("Database fetch failed in generateMetadata:", err);
  }

  const project = dbProject || projectsData.find((p) => slugify(p.name) === slug || p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found | Godrej Pune",
      description: "The requested project details could not be found.",
    };
  }

  const projectTitle = `${project.name} | Godrej Properties Pune`;
  const projectDesc = `Discover price, floor plans, location map, and reviews of ${project.name} in ${project.location}, Pune by Godrej Properties.`;
  const projectKeywords = `${project.name}, ${project.name} Pune, Godrej ${project.name}, Godrej ${project.name} Pune, Godrej Properties ${project.name}, ${project.name} price, ${project.name} floor plan, ${project.name} contact number, Godrej Properties Pune, Godrej Pune, Godrej Property`;

  return {
    title: projectTitle,
    description: projectDesc,
    keywords: projectKeywords,
    alternates: {
      canonical: `https://godrejpropertypune.com/${slug}`,
    },
    openGraph: {
      title: projectTitle,
      description: projectDesc,
      url: `https://godrejpropertypune.com/${slug}`,
      siteName: "Godrej Property Pune",
      images: [
        {
          url: project.image || "/godrej_logo_final.jpeg",
          width: 800,
          height: 600,
          alt: `${project.name} Logo`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  let dbProject: any = null;
  try {
    const dbProjects = await projectService.listProjects();
    dbProject = dbProjects.find(p => slugify(p.name) === slug || p.id === slug) || null;
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
        reraId: dbProject.reraId || undefined,
        reraLabel: dbProject.reraLabel || undefined,
        reraQrImage: dbProject.reraQrImage || undefined,
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
    : projectsData.find((p) => slugify(p.name) === slug || p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-bg-tan">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            "name": `${project.name} | Godrej Properties Pune`,
            "image": project.image ? (project.image.startsWith("http") ? project.image : `https://godrejpropertypune.com${project.image}`) : undefined,
            "url": `https://godrejpropertypune.com/${slug}`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": project.location || "Pune",
              "addressRegion": "MH",
              "addressCountry": "IN"
            },
            "description": `Explore premium properties, pricing, layouts, floor plans, and amenities of ${project.name} located at ${project.location}.`,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": project.price || undefined
            }
          })
        }}
      />
      {/* Dynamic Project Details Container */}
      <ProjectDetailsClient project={project} />
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  onOpenEnquiry: (projectName: string) => void;
}

export default function ProjectCard({ project, onOpenEnquiry }: ProjectCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-xl transition-all duration-300 group">
      
      {/* Top Image Section */}
      <Link href={`/projects/${project.id}`} className="relative h-60 w-full overflow-hidden block">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Floating tags */}
        {project.possession && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/75 text-[10px] font-bold text-white uppercase tracking-wider">
            Possession: {project.possession}
          </div>
        )}

        {project.tag1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-accent-gold text-primary text-[10px] font-bold shadow-md">
            {project.tag1}
          </div>
        )}

        {project.tag2 && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/75 text-[10px] font-bold text-white shadow-md">
            {project.tag2}
          </div>
        )}
      </Link>

      {/* Details Section */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-xl font-bold font-serif text-primary text-center mb-1 transition-colors">
            <Link href={`/projects/${project.id}`} className="hover:text-accent-gold transition-colors block">
              {project.name}
            </Link>
          </h3>
          
          {/* Location */}
          <p className="text-xs text-text-muted text-center mb-4 pb-4 border-b border-black/[0.06] font-medium tracking-wide">
            {project.location}
          </p>

          {/* Configuration & Price Row */}
          <div className="space-y-2.5 mb-6 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary">Typology :</span>
              <span className="text-text-muted font-medium">{project.typology}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary">Price :</span>
              <span className="text-accent-gold-dark font-bold">{project.price}</span>
            </div>
          </div>

          {/* Star Bullets */}
          <ul className="space-y-2 mb-6 flex flex-col items-center">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center text-xs font-semibold text-primary/80">
                <span className="text-accent-gold mr-2 text-sm">★</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onOpenEnquiry(project.name)}
          className="w-full py-3 rounded-xl gold-gradient hover:gold-gradient-hover text-primary font-bold text-xs tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
        >
          Interested
        </button>
      </div>
    </div>
  );
}

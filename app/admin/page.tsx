"use client";

import React, { useState, useEffect } from "react";
import { useGetProjects, useCreateProject, useUpdateProject, useDeleteProject } from "./hooks/useProjects";
import { useGetLeads } from "./hooks/useLeads";
import DashboardStats from "./components/DashboardStats";
import LeadsTable from "./components/LeadsTable";
import ProjectsList from "./components/ProjectsList";
import ProjectFormModal from "./components/ProjectFormModal";
import { Layers, Users, LogOut, Lock, Key } from "lucide-react";

export default function AdminDashboard() {
  // Passcode verification state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState<"leads" | "projects">("leads");

  // Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  // Queries
  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjects();
  const { data: leads = [], isLoading: isLoadingLeads } = useGetLeads();

  // Mutations
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  // Check auth session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("godrej_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (passcode === "godrej2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("godrej_admin_auth", "true");
    } else {
      setAuthError("Invalid admin passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("godrej_admin_auth");
    setPasscode("");
  };

  // CRUD Actions
  const handleOpenAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project? This will also remove the image file.")) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSubmit = (data: any) => {
    if (editingProject) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  // Derived statistics metrics
  const apartmentsCount = projects.filter((p: any) => p.category === "apartments").length;
  const plotsCount = projects.filter((p: any) => p.category === "plots").length;

  // Render Gate Barrier
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-tan/60 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-black/[0.06] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          {/* Padlock Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-serif text-primary">Admin Access Portal</h2>
            <p className="text-xs text-text-muted">
              Please enter the administrator passcode to manage database entries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                {authError}
              </div>
            )}

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                <Key className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="Passcode (default: godrej2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-bg-tan/40 border border-black/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-primary focus:outline-none focus:border-accent-gold text-center font-bold tracking-widest"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-xl text-xs tracking-wider transition-all shadow-md cursor-pointer"
            >
              UNLOCK PORTAL
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-bg-tan/20 flex flex-col md:flex-row">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-primary text-white flex flex-col justify-between p-6 md:fixed md:inset-y-0 md:left-0 z-30">
        <div className="space-y-8">
          {/* Logo Title */}
          <div>
            <span className="text-[10px] font-bold tracking-widest text-accent-gold uppercase block mb-0.5">
              Admin Workspace
            </span>
            <h2 className="text-lg font-bold font-serif tracking-tight border-b border-white/10 pb-4">
              Godrej Properties
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2.5">
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "leads"
                  ? "bg-accent-gold text-primary shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer Leads</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-accent-gold text-primary shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Project Listings</span>
            </button>
          </nav>
        </div>

        {/* Log Out button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-white/60 hover:text-red-300 transition-colors pt-6 border-t border-white/10 text-xs font-bold tracking-wide cursor-pointer mt-8 md:mt-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Main content body */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 space-y-8 max-w-7xl">
        {/* Top Header stats area */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-serif text-primary tracking-tight">
              Management Dashboard
            </h1>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Track customer enquiries and configure premium property listings.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <DashboardStats
          totalLeads={leads.length}
          totalProjects={projects.length}
          apartmentsCount={apartmentsCount}
          plotsCount={plotsCount}
        />

        {/* Main Panel View */}
        <div className="pt-2">
          {isLoadingProjects || isLoadingLeads ? (
            <div className="bg-white border border-black/[0.06] rounded-2xl p-12 text-center text-text-muted flex flex-col items-center justify-center space-y-3">
              <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-xs font-bold tracking-wider uppercase text-text-muted">
                Synchronizing Database state...
              </span>
            </div>
          ) : activeTab === "leads" ? (
            <LeadsTable leads={leads} />
          ) : (
            <ProjectsList
              projects={projects}
              onAdd={handleOpenAddModal}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteProject}
            />
          )}
        </div>
      </main>

      {/* Project Form Modal */}
      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProject}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

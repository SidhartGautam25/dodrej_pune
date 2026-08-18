import { leadRepository, LeadRepository } from "../repositories/LeadRepository";
import { Lead } from "@prisma/client";
import { LeadratService } from "./LeadratService";

export class LeadService {
  private repo: LeadRepository;

  constructor(repo: LeadRepository = leadRepository) {
    this.repo = repo;
  }

  async listLeads(): Promise<Lead[]> {
    return this.repo.getAll();
  }

  async createLead(data: {
    projectName: string;
    name: string;
    email: string;
    phone: string;
    message?: string | null;
  }): Promise<Lead> {
    // Validations
    if (!data.name.trim()) throw new Error("Name is required.");
    if (!data.phone.trim()) throw new Error("Phone number is required.");
    if (!data.projectName.trim()) throw new Error("Project selection is required.");

    // Simple Email Regex validation
    if (data.email && data.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Please enter a valid email address.");
      }
    }

    // Phone validation: must be digits, let's keep it flexible but ensure length >= 10
    const cleanPhone = data.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      throw new Error("Please enter a valid 10-digit mobile number.");
    }

    const lead = await this.repo.create({
      ...data,
      phone: cleanPhone,
    });

    // Push to Leadrat CRM asynchronously
    LeadratService.pushLead({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      projectName: lead.projectName,
      message: lead.message,
    }).catch((err) => {
      console.error("[LeadService] Background error pushing lead to Leadrat:", err);
    });

    return lead;
  }
}

export const leadService = new LeadService();

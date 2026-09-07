import { leadRepository, LeadRepository } from "../repositories/LeadRepository";
import { Lead } from "@prisma/client";
import { LeadratService } from "./LeadratService";

export class LeadService {
  private repo: LeadRepository;

  constructor(repo: LeadRepository = leadRepository) {
    this.repo = repo;
  }

  async listLeads(): Promise<Lead[]> {
    const leads = await this.repo.getAll();

    // Automatically fix any historical leads where the message erroneously got set to
    // "Request for: Godrej Eden Estate Phase 3" even though the lead was requested for a different project
    return leads.map((lead) => {
      if (
        lead.message &&
        lead.message.includes("Godrej Eden Estate Phase 3") &&
        lead.projectName &&
        !lead.projectName.includes("Godrej Eden Estate Phase 3")
      ) {
        const correctedMessage = `Request for: ${lead.projectName}`;
        // Asynchronously update in DB so database records become permanent and consistent
        this.repo.updateMessage(lead.id, correctedMessage).catch((err) => {
          console.warn(
            `[LeadService] Auto-update message failed for lead ${lead.id}:`,
            err,
          );
        });
        return {
          ...lead,
          message: correctedMessage,
        };
      }
      return lead;
    });
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
    if (!data.projectName.trim())
      throw new Error("Project selection is required.");

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

    const finalMessage =
      data.message && data.message.trim()
        ? data.message.trim()
        : `Request for: ${data.projectName}`;

    const lead = await this.repo.create({
      ...data,
      phone: cleanPhone,
      message: finalMessage,
    });

    // Push to Leadrat CRM asynchronously
    LeadratService.pushLead({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      projectName: lead.projectName,
      message: lead.message,
    }).catch((err) => {
      console.error(
        "[LeadService] Background error pushing lead to Leadrat:",
        err,
      );
    });

    return lead;
  }
}

export const leadService = new LeadService();

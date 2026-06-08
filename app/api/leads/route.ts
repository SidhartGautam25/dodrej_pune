import { NextRequest } from "next/server";
import { leadController } from "@/lib/controllers/LeadController";

export async function GET() {
  return leadController.getLeads();
}

export async function POST(req: NextRequest) {
  return leadController.createLead(req);
}

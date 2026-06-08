import { NextRequest } from "next/server";
import { projectController } from "@/lib/controllers/ProjectController";

export async function GET() {
  return projectController.getProjects();
}

export async function POST(req: NextRequest) {
  return projectController.createProject(req);
}

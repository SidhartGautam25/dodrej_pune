import { NextResponse } from "next/server";
import { projectService, ProjectService } from "../services/ProjectService";

export class ProjectController {
  private service: ProjectService;

  constructor(service: ProjectService = projectService) {
    this.service = service;
  }

  async getProjects(): Promise<NextResponse> {
    try {
      const list = await this.service.listProjects();
      return NextResponse.json({ success: true, data: list }, { status: 200 });
    } catch (error: any) {
      console.error("GET /api/projects error:", error);
      return NextResponse.json({ success: false, error: error.message || "Failed to fetch projects" }, { status: 500 });
    }
  }

  async getProject(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
      const id = params.id;
      const project = await this.service.getProject(id);
      if (!project) {
        return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: project }, { status: 200 });
    } catch (error: any) {
      console.error("GET /api/projects/:id error:", error);
      return NextResponse.json({ success: false, error: error.message || "Failed to fetch project" }, { status: 500 });
    }
  }

  async createProject(req: Request): Promise<NextResponse> {
    try {
      // Check if multipart form data
      const contentType = req.headers.get("content-type") || "";
      if (!contentType.includes("multipart/form-data")) {
        return NextResponse.json({ success: false, error: "Content type must be multipart/form-data" }, { status: 400 });
      }

      const formData = await req.formData();
      
      const name = formData.get("name") as string;
      const location = formData.get("location") as string;
      const typology = formData.get("typology") as string;
      const price = formData.get("price") as string;
      const possession = formData.get("possession") as string | null;
      const tag1 = formData.get("tag1") as string | null;
      const tag2 = formData.get("tag2") as string | null;
      const rera = formData.get("rera") as string;
      const category = formData.get("category") as string;
      
      // Parse highlights list
      const highlightsRaw = formData.get("highlights") as string;
      let highlights: string[] = [];
      if (highlightsRaw) {
        try {
          highlights = JSON.parse(highlightsRaw);
        } catch {
          highlights = highlightsRaw.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }

      const imageFile = formData.get("image") as File | null;

      // Extract new fields
      const description = formData.get("description") as string | null;
      
      const amenitiesRaw = formData.get("amenities") as string | null;
      let amenities: string[] = [];
      if (amenitiesRaw) {
        try {
          amenities = JSON.parse(amenitiesRaw);
        } catch {
          amenities = [];
        }
      }

      const galleryUrlsRaw = formData.get("galleryUrls") as string | null;
      let galleryUrls: string[] = [];
      if (galleryUrlsRaw) {
        try {
          galleryUrls = JSON.parse(galleryUrlsRaw);
        } catch {
          galleryUrls = [];
        }
      }

      const galleryFiles = formData.getAll("galleryFiles") as File[];

      const floorPlansRaw = formData.get("floorPlans") as string | null;
      let floorPlans: any[] = [];
      if (floorPlansRaw) {
        try {
          floorPlans = JSON.parse(floorPlansRaw);
        } catch {
          floorPlans = [];
        }
      }

      const floorPlanFiles: { file: File; index: number }[] = [];
      for (const fp of floorPlans) {
        if (fp.tempIndex !== undefined) {
          const file = formData.get(`floorPlanFile_${fp.tempIndex}`) as File | null;
          if (file) {
            floorPlanFiles.push({ file, index: fp.tempIndex });
          }
        }
      }

      const project = await this.service.createProject({
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
        imageFile,
        description,
        amenities,
        galleryUrls,
        galleryFiles,
        floorPlans,
        floorPlanFiles,
      });

      return NextResponse.json({ success: true, data: project }, { status: 201 });
    } catch (error: any) {
      console.error("POST /api/projects error:", error);
      return NextResponse.json({ success: false, error: error.message || "Failed to create project" }, { status: 400 });
    }
  }

  async updateProject(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
      const id = params.id;
      const contentType = req.headers.get("content-type") || "";
      
      let updateData: any = {};

      if (contentType.includes("multipart/form-data")) {
        const formData = await req.formData();
        
        // Extract fields if provided
        if (formData.has("name")) updateData.name = formData.get("name") as string;
        if (formData.has("location")) updateData.location = formData.get("location") as string;
        if (formData.has("typology")) updateData.typology = formData.get("typology") as string;
        if (formData.has("price")) updateData.price = formData.get("price") as string;
        if (formData.has("possession")) updateData.possession = formData.get("possession") as string;
        if (formData.has("tag1")) updateData.tag1 = formData.get("tag1") as string;
        if (formData.has("tag2")) updateData.tag2 = formData.get("tag2") as string;
        if (formData.has("rera")) updateData.rera = formData.get("rera") as string;
        if (formData.has("category")) updateData.category = formData.get("category") as string;
        
        if (formData.has("highlights")) {
          const highlightsRaw = formData.get("highlights") as string;
          try {
            updateData.highlights = JSON.parse(highlightsRaw);
          } catch {
            updateData.highlights = highlightsRaw.split(",").map((s) => s.trim()).filter(Boolean);
          }
        }
        
        if (formData.has("image")) {
          updateData.imageFile = formData.get("image") as File | null;
        }

        if (formData.has("description")) {
          updateData.description = formData.get("description") as string;
        }

        if (formData.has("amenities")) {
          const amenitiesRaw = formData.get("amenities") as string;
          try {
            updateData.amenities = JSON.parse(amenitiesRaw);
          } catch {
            updateData.amenities = [];
          }
        }

        if (formData.has("galleryUrls")) {
          const galleryUrlsRaw = formData.get("galleryUrls") as string;
          try {
            updateData.galleryUrls = JSON.parse(galleryUrlsRaw);
          } catch {
            updateData.galleryUrls = [];
          }
        }

        if (formData.has("galleryFiles")) {
          updateData.galleryFiles = formData.getAll("galleryFiles") as File[];
        }

        if (formData.has("floorPlans")) {
          const floorPlansRaw = formData.get("floorPlans") as string;
          try {
            updateData.floorPlans = JSON.parse(floorPlansRaw);
          } catch {
            updateData.floorPlans = [];
          }

          // Gather corresponding floor plan files
          const floorPlanFiles: { file: File; index: number }[] = [];
          for (const fp of updateData.floorPlans) {
            if (fp.tempIndex !== undefined) {
              const file = formData.get(`floorPlanFile_${fp.tempIndex}`) as File | null;
              if (file) {
                floorPlanFiles.push({ file, index: fp.tempIndex });
              }
            }
          }
          updateData.floorPlanFiles = floorPlanFiles;
        }
      } else {
        // Plain JSON update
        const body = await req.json();
        updateData = body;
      }

      const project = await this.service.updateProject(id, updateData);
      return NextResponse.json({ success: true, data: project }, { status: 200 });
    } catch (error: any) {
      console.error("PUT /api/projects/:id error:", error);
      return NextResponse.json({ success: false, error: error.message || "Failed to update project" }, { status: 400 });
    }
  }

  async deleteProject(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
      const id = params.id;
      const deleted = await this.service.deleteProject(id);
      return NextResponse.json({ success: true, data: deleted }, { status: 200 });
    } catch (error: any) {
      console.error("DELETE /api/projects/:id error:", error);
      return NextResponse.json({ success: false, error: error.message || "Failed to delete project" }, { status: 400 });
    }
  }
}

export const projectController = new ProjectController();

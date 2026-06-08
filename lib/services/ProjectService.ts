import { projectRepository, ProjectRepository } from "../repositories/ProjectRepository";
import { storageService, IStorageService } from "../storage/StorageService";
import { Project } from "@prisma/client";

export class ProjectService {
  private repo: ProjectRepository;
  private storage: IStorageService;

  constructor(repo: ProjectRepository = projectRepository, storage: IStorageService = storageService) {
    this.repo = repo;
    this.storage = storage;
  }

  async listProjects(): Promise<Project[]> {
    return this.repo.getAll();
  }

  async getProject(id: string): Promise<Project | null> {
    return this.repo.getById(id);
  }

  async createProject(data: {
    name: string;
    location: string;
    typology: string;
    price: string;
    imageFile?: File | null;
    imagePath?: string; // fallback if already uploaded/seeded
    possession?: string | null;
    tag1?: string | null;
    tag2?: string | null;
    highlights: string[];
    rera: string;
    category: string;
  }): Promise<Project> {
    // Validations
    if (!data.name.trim()) throw new Error("Project name is required.");
    if (!data.location.trim()) throw new Error("Project location is required.");
    if (!data.typology.trim()) throw new Error("Project typology is required.");
    if (!data.price.trim()) throw new Error("Project price is required.");
    if (!data.rera.trim()) throw new Error("Project RERA number is required.");
    if (!["apartments", "plots"].includes(data.category)) {
      throw new Error("Invalid project category.");
    }

    // Check duplicate
    const existing = await this.repo.getByName(data.name);
    if (existing) {
      throw new Error(`A project named '${data.name}' already exists.`);
    }

    // Handle Image Upload
    let imageUrl = data.imagePath || "";
    if (data.imageFile) {
      imageUrl = await this.storage.uploadFile(data.imageFile, "assets");
    }

    if (!imageUrl) {
      throw new Error("Project image file or path is required.");
    }

    return this.repo.create({
      ...data,
      image: imageUrl,
    });
  }

  async updateProject(
    id: string,
    data: {
      name?: string;
      location?: string;
      typology?: string;
      price?: string;
      imageFile?: File | null;
      possession?: string | null;
      tag1?: string | null;
      tag2?: string | null;
      highlights?: string[];
      rera?: string;
      category?: string;
    }
  ): Promise<Project> {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error("Project not found.");
    }

    // Validate category if updating
    if (data.category && !["apartments", "plots"].includes(data.category)) {
      throw new Error("Invalid project category.");
    }

    let imageUrl = existing.image;
    if (data.imageFile) {
      // Upload new file
      imageUrl = await this.storage.uploadFile(data.imageFile, "assets");
      // Optionally clean up old file if it was locally uploaded
      if (existing.image.startsWith("/assets/")) {
        // Only delete if it's dynamic upload, we'll keep static template assets
        if (existing.image.includes("-")) {
          await this.storage.deleteFile(existing.image);
        }
      }
    }

    return this.repo.update(id, {
      ...data,
      image: imageUrl,
    });
  }

  async deleteProject(id: string): Promise<Project> {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error("Project not found.");
    }

    const deleted = await this.repo.delete(id);
    // Delete image file if it's an uploaded asset
    if (existing.image.includes("-")) {
      await this.storage.deleteFile(existing.image);
    }
    return deleted;
  }
}

export const projectService = new ProjectService();

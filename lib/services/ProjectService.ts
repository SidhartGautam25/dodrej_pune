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
    reraId?: string | null;
    reraLabel?: string | null;
    reraQrImageFile?: File | null;
    reraQrImagePath?: string;
    category: string;
    description?: string | null;
    amenities?: string[];
    galleryUrls?: string[];
    galleryFiles?: File[];
    floorPlans?: { title: string; size: string; image?: string; tempIndex?: number }[];
    floorPlanFiles?: { file: File; index: number }[];
    isNewLaunch?: boolean;
    sortOrder?: number;
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

    // Handle RERA QR Image Upload
    let reraQrImageUrl = data.reraQrImagePath || "";
    if (data.reraQrImageFile) {
      reraQrImageUrl = await this.storage.uploadFile(data.reraQrImageFile, "assets");
    }

    // Handle Gallery Uploads
    const uploadedGalleryUrls: string[] = [];
    if (data.galleryFiles && data.galleryFiles.length > 0) {
      for (const file of data.galleryFiles) {
        const url = await this.storage.uploadFile(file, "assets");
        uploadedGalleryUrls.push(url);
      }
    }
    const finalGallery = [...(data.galleryUrls || []), ...uploadedGalleryUrls];

    // Handle Floor Plans Uploads
    const finalFloorPlans = [];
    if (data.floorPlans) {
      for (const fp of data.floorPlans) {
        let fpImageUrl = fp.image || "";
        if (data.floorPlanFiles) {
          const associated = data.floorPlanFiles.find((f) => f.index === fp.tempIndex);
          if (associated) {
            fpImageUrl = await this.storage.uploadFile(associated.file, "assets");
          }
        }
        finalFloorPlans.push({
          title: fp.title,
          size: fp.size,
          image: fpImageUrl,
        });
      }
    }

    const { imageFile, imagePath, galleryUrls, galleryFiles, floorPlans: rawFloorPlans, floorPlanFiles, reraQrImageFile, reraQrImagePath, ...rest } = data;

    return this.repo.create({
      ...rest,
      image: imageUrl,
      gallery: finalGallery,
      floorPlans: finalFloorPlans,
      reraQrImage: reraQrImageUrl || null,
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
      reraId?: string | null;
      reraLabel?: string | null;
      reraQrImageFile?: File | null;
      category?: string;
      description?: string | null;
      amenities?: string[];
      galleryUrls?: string[];
      galleryFiles?: File[];
      floorPlans?: { title: string; size: string; image?: string; tempIndex?: number }[];
      floorPlanFiles?: { file: File; index: number }[];
      isNewLaunch?: boolean;
      sortOrder?: number;
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

    // Handle cover image
    let imageUrl = existing.image;
    if (data.imageFile) {
      imageUrl = await this.storage.uploadFile(data.imageFile, "assets");
      if (existing.image.startsWith("/assets/") && existing.image.includes("-")) {
        await this.storage.deleteFile(existing.image);
      }
    }

    // Handle RERA QR Image Update
    let reraQrImageUrl = existing.reraQrImage || "";
    if (data.hasOwnProperty("reraQrImageFile")) {
      if (data.reraQrImageFile) {
        reraQrImageUrl = await this.storage.uploadFile(data.reraQrImageFile, "assets");
        if (existing.reraQrImage && existing.reraQrImage.startsWith("/assets/") && existing.reraQrImage.includes("-")) {
          await this.storage.deleteFile(existing.reraQrImage);
        }
      } else if (data.reraQrImageFile === null) {
        if (existing.reraQrImage && existing.reraQrImage.startsWith("/assets/") && existing.reraQrImage.includes("-")) {
          await this.storage.deleteFile(existing.reraQrImage);
        }
        reraQrImageUrl = "";
      }
    }

    // Handle Gallery Uploads
    let finalGallery: string[] | undefined = undefined;
    if (data.galleryUrls || data.galleryFiles) {
      const uploadedGalleryUrls: string[] = [];
      if (data.galleryFiles && data.galleryFiles.length > 0) {
        for (const file of data.galleryFiles) {
          const url = await this.storage.uploadFile(file, "assets");
          uploadedGalleryUrls.push(url);
        }
      }
      const galleryList = [...(data.galleryUrls || []), ...uploadedGalleryUrls];
      finalGallery = galleryList;

      // Cleanup deleted gallery images
      const existingGallery = (existing.gallery as string[]) || [];
      const deletedUrls = existingGallery.filter((url) => !galleryList.includes(url));
      for (const url of deletedUrls) {
        if (url.includes("-")) {
          await this.storage.deleteFile(url);
        }
      }
    }

    // Handle Floor Plans Uploads
    let finalFloorPlans: any[] | undefined = undefined;
    if (data.floorPlans) {
      const floorPlansList = [];
      for (const fp of data.floorPlans) {
        let fpImageUrl = fp.image || "";
        if (data.floorPlanFiles) {
          const associated = data.floorPlanFiles.find((f) => f.index === fp.tempIndex);
          if (associated) {
            fpImageUrl = await this.storage.uploadFile(associated.file, "assets");
          }
        }
        floorPlansList.push({
          title: fp.title,
          size: fp.size,
          image: fpImageUrl,
        });
      }
      finalFloorPlans = floorPlansList;

      // Cleanup deleted floor plan images
      const existingFloorPlans = (existing.floorPlans as { image?: string }[]) || [];
      const finalImages = floorPlansList.map((fp) => fp.image).filter(Boolean);
      for (const fp of existingFloorPlans) {
        if (fp.image && fp.image.includes("-") && !finalImages.includes(fp.image)) {
          await this.storage.deleteFile(fp.image);
        }
      }
    }

    const { imageFile, galleryUrls, galleryFiles, floorPlans: rawFloorPlans, floorPlanFiles, reraQrImageFile, ...rest } = data;

    return this.repo.update(id, {
      ...rest,
      image: imageUrl,
      gallery: finalGallery,
      floorPlans: finalFloorPlans,
      reraQrImage: reraQrImageUrl || null,
    });
  }

  async deleteProject(id: string): Promise<Project> {
    const existing = await this.repo.getById(id);
    if (!existing) {
      throw new Error("Project not found.");
    }

    const deleted = await this.repo.delete(id);

    // Delete cover image
    if (existing.image.includes("-")) {
      await this.storage.deleteFile(existing.image);
    }

    // Delete gallery images
    const gallery = (existing.gallery as string[]) || [];
    for (const url of gallery) {
      if (url.includes("-")) {
        await this.storage.deleteFile(url);
      }
    }

    // Delete floor plan images
    const floorPlans = (existing.floorPlans as { image?: string }[]) || [];
    for (const fp of floorPlans) {
      if (fp.image && fp.image.includes("-")) {
        await this.storage.deleteFile(fp.image);
      }
    }

    return deleted;
  }
}

export const projectService = new ProjectService();

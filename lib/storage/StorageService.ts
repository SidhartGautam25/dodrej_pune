import fs from "fs/promises";
import path from "path";

export interface IStorageService {
  uploadFile(file: File, folder?: string): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
}

export class LocalStorageService implements IStorageService {
  private baseDir: string;

  constructor() {
    // Save in public directory so Next.js can serve it statically
    this.baseDir = path.join(process.cwd(), "public");
  }

  async uploadFile(file: File, folder: string = "uploads"): Promise<string> {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || ".png";
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
      
      const targetFolder = path.join(this.baseDir, folder);
      // Ensure target directory exists
      await fs.mkdir(targetFolder, { recursive: true });
      
      const absolutePath = path.join(targetFolder, uniqueName);
      await fs.writeFile(absolutePath, buffer);
      
      // Return the public URL path
      return `/${folder}/${uniqueName}`;
    } catch (error) {
      console.error("Local storage upload failed:", error);
      throw new Error("Failed to upload file to local storage.");
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Remove leading slash if present to map to absolute local path
      const relativePath = fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl;
      const absolutePath = path.join(this.baseDir, relativePath);
      
      // Check if file exists before trying to delete
      await fs.access(absolutePath);
      await fs.unlink(absolutePath);
    } catch (error) {
      console.warn(`Could not delete file ${fileUrl}:`, error);
    }
  }
}
export const storageService: IStorageService = new LocalStorageService();

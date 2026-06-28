import fs from "fs/promises";
import path from "path";
import { Readable } from "stream";
import * as ftp from "basic-ftp";

export interface IStorageService {
  uploadFile(file: File, folder?: string): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
}

// Platform-independent FTP path helper
function joinFtpPaths(...parts: string[]): string {
  return parts
    .map((p) => p.replace(/\\/g, "/"))
    .join("/")
    .replace(/\/+/g, "/");
}

export class LocalStorageService implements IStorageService {
  private baseDir: string;

  constructor() {
    this.baseDir = path.join(process.cwd(), "public");
  }

  async uploadFile(file: File, folder: string = "uploads"): Promise<string> {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || ".png";
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
      
      const targetFolder = path.join(this.baseDir, folder);
      await fs.mkdir(targetFolder, { recursive: true });
      
      const absolutePath = path.join(targetFolder, uniqueName);
      await fs.writeFile(absolutePath, buffer);
      
      return `/${folder}/${uniqueName}`;
    } catch (error) {
      console.error("Local storage upload failed:", error);
      throw new Error("Failed to upload file to local storage.");
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const relativePath = fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl;
      const absolutePath = path.join(this.baseDir, relativePath);
      
      await fs.access(absolutePath);
      await fs.unlink(absolutePath);
    } catch (error) {
      console.warn(`Could not delete file ${fileUrl}:`, error);
    }
  }
}

export class FtpStorageService implements IStorageService {
  private host = process.env.FTP_HOST;
  private user = process.env.FTP_USER;
  private password = process.env.FTP_PASSWORD;
  private port = Number(process.env.FTP_PORT) || 21;
  private remotePath = process.env.FTP_REMOTE_PATH || "public/assets";

  async uploadFile(file: File, folder: string = "assets"): Promise<string> {
    const client = new ftp.Client();
    
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || ".png";
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
      
      await client.access({
        host: this.host,
        user: this.user,
        password: this.password,
        port: this.port,
        secure: false,
      });

      // Target directory on FTP: e.g. "public/assets" or "public_html/public/assets"
      const remoteDir = joinFtpPaths(this.remotePath);
      await client.ensureDir(remoteDir);
      
      // Upload buffer as a Readable stream
      const stream = Readable.from(buffer);
      await client.uploadFrom(stream, uniqueName);
      
      // Return the public URL path served by Next.js (e.g. "/assets/12345-abc.png")
      return `/${folder}/${uniqueName}`;
    } catch (error) {
      console.error("FTP storage upload failed:", error);
      throw new Error(`Failed to upload file to FTP storage: ${(error as Error).message}`);
    } finally {
      client.close();
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const client = new ftp.Client();
    
    try {
      const filename = path.basename(fileUrl);
      
      await client.access({
        host: this.host,
        user: this.user,
        password: this.password,
        port: this.port,
        secure: false,
      });

      const remoteDir = joinFtpPaths(this.remotePath);
      await client.cd(remoteDir);
      await client.remove(filename);
    } catch (error) {
      console.warn(`Could not delete file ${fileUrl} on FTP:`, error);
    } finally {
      client.close();
    }
  }
}

// Export the active storage service based on configuration
export const storageService: IStorageService =
  process.env.FTP_HOST && process.env.FTP_USER && process.env.FTP_PASSWORD
    ? new FtpStorageService()
    : new LocalStorageService();

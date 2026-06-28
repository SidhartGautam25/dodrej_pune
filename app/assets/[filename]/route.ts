import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Writable } from "stream";
import * as ftp from "basic-ftp";

interface RouteParams {
  params: Promise<{ filename: string }>;
}

class WritableBuffer extends Writable {
  private chunks: Buffer[] = [];

  _write(
    chunk: any,
    encoding: string,
    callback: (error?: Error | null) => void
  ) {
    this.chunks.push(Buffer.from(chunk));
    callback();
  }

  getBuffer() {
    return Buffer.concat(this.chunks);
  }
}

async function cdFtpDir(client: ftp.Client, remotePath: string) {
  const segments = remotePath.split("/").filter(Boolean);
  for (const segment of segments) {
    if (segment === "public_html") {
      const pwd = await client.pwd();
      if (pwd === "/public_html" || pwd.startsWith("/public_html/")) {
        continue;
      }
    }
    await client.cd(segment);
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { filename } = await params;

  // Prevent directory traversal attacks
  if (
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\")
  ) {
    return new NextResponse("Invalid filename", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "assets", filename);

  const getContentType = (fname: string) => {
    let contentType = "image/png";
    const ext = path.extname(fname).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg") {
      contentType = "image/jpeg";
    } else if (ext === ".webp") {
      contentType = "image/webp";
    } else if (ext === ".avif") {
      contentType = "image/avif";
    } else if (ext === ".svg") {
      contentType = "image/svg+xml";
    } else if (ext === ".gif") {
      contentType = "image/gif";
    }
    return contentType;
  };

  // 1. Try reading from the local disk first
  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": getContentType(filename),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (localError) {
    // 2. Fallback to fetching via FTP if configured (useful on localhost development)
    const ftpHost = process.env.FTP_HOST;
    const ftpUser = process.env.FTP_USER;
    const ftpPassword = process.env.FTP_PASSWORD;

    if (ftpHost && ftpUser && ftpPassword) {
      const client = new ftp.Client();

      try {
        await client.access({
          host: ftpHost,
          user: ftpUser,
          password: ftpPassword,
          port: Number(process.env.FTP_PORT) || 21,
          secure: false,
        });

        const remotePath = process.env.FTP_REMOTE_PATH || "public/assets";
        await cdFtpDir(client, remotePath);

        const writableBuffer = new WritableBuffer();
        await client.downloadTo(writableBuffer, filename);
        const ftpBuffer = writableBuffer.getBuffer();

        // Cache the file locally to speed up subsequent requests
        try {
          await fs.mkdir(path.dirname(filePath), { recursive: true });
          await fs.writeFile(filePath, ftpBuffer);
        } catch (writeErr) {
          console.warn("Failed to cache FTP file locally:", writeErr);
        }

        return new NextResponse(ftpBuffer, {
          headers: {
            "Content-Type": getContentType(filename),
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      } catch (ftpError) {
        console.error(`FTP fallback failed for ${filename}:`, ftpError);
      } finally {
        client.close();
      }
    }

    return new NextResponse("File not found", { status: 404 });
  }
}

import * as ftp from "basic-ftp";
import dotenv from "dotenv";
import { Writable } from "stream";
dotenv.config();

class WritableBuffer extends Writable {
  private chunks: Buffer[] = [];
  _write(chunk: any, encoding: string, callback: (error?: Error | null) => void) {
    this.chunks.push(Buffer.from(chunk));
    callback();
  }
  getBuffer() {
    return Buffer.concat(this.chunks);
  }
}

async function main() {
  const client = new ftp.Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: Number(process.env.FTP_PORT) || 21,
      secure: false
    });
    const writableBuffer = new WritableBuffer();
    await client.downloadTo(writableBuffer, ".htaccess");
    console.log("Downloaded .htaccess content:");
    console.log(writableBuffer.getBuffer().toString());
  } catch (err) {
    console.error("Error reading .htaccess:", err);
  } finally {
    client.close();
  }
}
main();

import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: Number(process.env.FTP_PORT) || 21,
      secure: false
    });
    
    console.log("Current directory:", await client.pwd());
    
    console.log("Entering public/assets...");
    await client.cd("public/assets");
    console.log("Current directory:", await client.pwd());
    
    const list = await client.list();
    console.log("Files in public/assets:");
    list.forEach(file => {
      console.log(`  - ${file.name} (${file.size} bytes)`);
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
}
main();

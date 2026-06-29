import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

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
    console.log("Listing /.builds/last-source/public");
    await client.cd(".builds/last-source/public");
    const list = await client.list();
    for (const item of list) {
      console.log(`  - ${item.name} (${item.isDirectory ? 'dir' : 'file'})`);
    }
    
    console.log("Listing /.builds/last-source/public/assets");
    await client.cd("assets");
    const assetsList = await client.list();
    for (const item of assetsList) {
      console.log(`  - ${item.name} (${item.size} bytes)`);
    }
  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}
main();

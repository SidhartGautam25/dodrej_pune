import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

async function listRecursive(client: ftp.Client, currentPath: string, depth: number) {
  if (depth > 2) return;
  try {
    const list = await client.list();
    console.log(`Directory: ${currentPath}`);
    for (const item of list) {
      console.log(`  - ${item.name} (${item.isDirectory ? 'dir' : 'file'})`);
      if (item.isDirectory && item.name !== "." && item.name !== "..") {
        await client.cd(item.name);
        await listRecursive(client, `${currentPath}/${item.name}`, depth + 1);
        await client.cd("..");
      }
    }
  } catch (err) {
    console.error(`Error listing ${currentPath}:`, err);
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
    console.log("Starting recursive list from /");
    await listRecursive(client, "", 0);
  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}
main();

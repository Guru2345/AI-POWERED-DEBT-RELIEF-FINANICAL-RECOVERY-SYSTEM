import path from "path";
import fs from "fs/promises";

const DB_PATH = path.join(process.cwd(), "database", "db.json");

export async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { users: [], loans: [], letters: [], chatHistory: [] };
  }
}

export async function writeDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

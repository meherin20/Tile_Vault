import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

async function getTilesData() {
  const filePath = path.join(process.cwd(), "db", "tiles.json");
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data).tiles;
}

export async function GET() {
  try {
    const tiles = await getTilesData();
    return NextResponse.json(tiles);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tiles" }, { status: 500 });
  }
}

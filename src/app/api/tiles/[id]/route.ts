import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

async function getTilesData() {
  const filePath = path.join(process.cwd(), "db", "tiles.json");
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data).tiles;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tiles = await getTilesData();
    const tile = tiles.find((t: { id: string }) => t.id === id);

    if (!tile) {
      return NextResponse.json({ error: "Tile not found" }, { status: 404 });
    }

    return NextResponse.json(tile);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tile" }, { status: 500 });
  }
}

import { Tile } from "./types";
import { readFile } from "fs/promises";
import path from "path";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function readTilesFromFile(): Promise<Tile[]> {
  const filePath = path.join(process.cwd(), "db", "tiles.json");
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data).tiles;
}

async function fetchTilesFromApi(): Promise<Tile[]> {
  const baseUrl = API_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/tiles`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch tiles");
  return res.json();
}

async function getAllTilesInternal(): Promise<Tile[]> {
  if (API_URL && API_URL.includes("3001")) {
    try {
      const res = await fetch(`${API_URL}/tiles`, { next: { revalidate: 60 } });
      if (res.ok) return res.json();
    } catch {
      // fall through to file/API
    }
  }
  try {
    return await readTilesFromFile();
  } catch {
    return fetchTilesFromApi();
  }
}

export async function getAllTiles(): Promise<Tile[]> {
  return getAllTilesInternal();
}

export async function getTileById(id: string): Promise<Tile | null> {
  const tiles = await getAllTilesInternal();
  return tiles.find((t) => t.id === id) ?? null;
}

export async function getFeaturedTiles(limit = 4): Promise<Tile[]> {
  const tiles = await getAllTilesInternal();
  return tiles.slice(0, limit);
}

export async function searchTiles(query: string): Promise<Tile[]> {
  const tiles = await getAllTilesInternal();
  if (!query.trim()) return tiles;
  const lower = query.toLowerCase();
  return tiles.filter(
    (tile) =>
      tile.title.toLowerCase().includes(lower) ||
      tile.category.toLowerCase().includes(lower) ||
      tile.tags.some((tag) => tag.toLowerCase().includes(lower))
  );
}
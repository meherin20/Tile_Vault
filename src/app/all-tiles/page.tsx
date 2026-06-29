"use client";

import { useState, useEffect } from "react";
import TileCard from "@/components/TileCard";
import Loader from "@/components/Loader";
import { Tile } from "@/lib/types";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [filtered, setFiltered] = useState<Tile[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = apiUrl && apiUrl.includes("3001")
      ? `${apiUrl}/tiles`
      : "/api/tiles";
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tiles");
        return res.json();
      })
      .then((data: Tile[]) => {
        setTiles(data);
        setFiltered(data);
      })
      .catch(() => setError("Unable to load tiles. Please ensure the JSON server is running."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(tiles);
      return;
    }
    const lower = search.toLowerCase();
    setFiltered(
      tiles.filter(
        (tile) =>
          tile.title.toLowerCase().includes(lower) ||
          tile.category.toLowerCase().includes(lower) ||
          tile.tags.some((tag) => tag.toLowerCase().includes(lower))
      )
    );
  }, [search, tiles]);

  if (loading) return <Loader message="Loading tiles..." />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4">
        <p className="text-error text-lg">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">All Tiles</h1>
      <p className="text-center text-base-content/70 mb-8">
        Browse our complete collection of premium tiles
      </p>

      <div className="form-control w-full max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search tiles by title, category, or tag..."
          className="input input-bordered input-lg w-full focus:input-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-base-content/60 text-lg">No tiles found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((tile) => (
            <TileCard key={tile.id} tile={tile} />
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { Tile } from "@/lib/types";

interface TileCardProps {
  tile: Tile;
  showDetails?: boolean;
}

export default function TileCard({ tile, showDetails = true }: TileCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="h-48 overflow-hidden">
        <img
          src={tile.image}
          alt={tile.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{tile.title}</h2>
        <p className="text-sm text-base-content/70 line-clamp-2">{tile.description}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {tile.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="badge badge-primary badge-outline badge-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-primary">
            {tile.currency} {tile.price.toFixed(2)}
          </span>
          {!tile.inStock && (
            <span className="badge badge-error badge-sm">Out of Stock</span>
          )}
        </div>
        {showDetails && (
          <div className="card-actions justify-end mt-2">
            <Link href={`/tile/${tile.id}`} className="btn btn-primary btn-sm">
              {showDetails ? "View Details" : "Details"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

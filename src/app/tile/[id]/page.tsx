import Link from "next/link";
import { getTileById } from "@/lib/api";
import { notFound } from "next/navigation";

interface TileDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function TileDetailsPage({ params }: TileDetailsPageProps) {
  const { id } = await params;
  const tile = await getTileById(id);

  if (!tile) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={tile.image}
            alt={tile.title}
            className="w-full h-auto min-h-[400px] object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <span className="badge badge-primary badge-outline mb-3">{tile.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold">{tile.title}</h1>
            <p className="text-base-content/70 mt-2">by {tile.creator}</p>
          </div>

          <p className="text-lg leading-relaxed">{tile.description}</p>

          <div className="flex flex-wrap gap-2">
            {tile.tags.map((tag) => (
              <span key={tag} className="badge badge-secondary">
                {tag}
              </span>
            ))}
          </div>

          <div className="divider"></div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-base-content/60">Material</p>
              <p className="font-semibold">{tile.material}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Dimensions</p>
              <p className="font-semibold">{tile.dimensions}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Price</p>
              <p className="font-bold text-2xl text-primary">
                {tile.currency} {tile.price.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Availability</p>
              <p className={`font-semibold ${tile.inStock ? "text-success" : "text-error"}`}>
                {tile.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Link href="/all-tiles" className="btn btn-outline">
              Back to Gallery
            </Link>
            {tile.inStock && (
              <button className="btn btn-primary">Add to Wishlist</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

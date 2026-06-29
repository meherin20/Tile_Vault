import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import FeaturedTiles from "@/components/FeaturedTiles";
import { getFeaturedTiles } from "@/lib/api";

export default async function HomePage() {
  const featuredTiles = await getFeaturedTiles(4);

  return (
    <>
      <Banner />
      <Marquee />
      <FeaturedTiles tiles={featuredTiles} />

      <section className="py-16 px-4 bg-base-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose TileVault?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="card bg-base-100 shadow-md p-6">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-lg">Premium Quality</h3>
              <p className="text-sm text-base-content/70 mt-2">
                Handpicked tiles from the world&apos;s finest artisans and manufacturers.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-bold text-lg">Unique Designs</h3>
              <p className="text-sm text-base-content/70 mt-2">
                From minimalist to bold geometric — find tiles that match your vision.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold text-lg">Fast Delivery</h3>
              <p className="text-sm text-base-content/70 mt-2">
                Free shipping on orders over $200 with secure packaging guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

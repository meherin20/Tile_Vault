import Link from "next/link";

export default function Banner() {
  return (
    <section className="hero min-h-[70vh] bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="hero-content text-center flex-col">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Discover Your Perfect Aesthetic
          </h1>
          <p className="text-lg md:text-xl mb-8 text-base-content/80">
            Explore our curated collection of premium tiles — from classic marble to modern geometric patterns.
            Transform your space with artistry underfoot.
          </p>
          <Link href="/all-tiles" className="btn btn-primary btn-lg">
            Browse Now
          </Link>
        </div>
      </div>
    </section>
  );
}

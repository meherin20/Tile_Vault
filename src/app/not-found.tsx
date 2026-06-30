import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-8xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>
      <p className="text-base-content/70 mt-2 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or the tile may have been removed.
      </p>
      <div className="flex gap-4 mt-8">
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link href="/all-tiles" className="btn btn-outline">
          Browse Tiles
        </Link>
      </div>
    </div>
  );
}

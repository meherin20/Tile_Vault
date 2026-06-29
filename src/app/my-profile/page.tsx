"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Loader from "@/components/Loader";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) return <Loader message="Loading profile..." />;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-lg">Please login to view your profile.</p>
        <Link href="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=128`}
                alt={user.name}
              />
            </div>
          </div>

          <h2 className="card-title text-2xl">{user.name}</h2>
          <p className="text-base-content/70">{user.email}</p>

          <div className="divider w-full"></div>

          <div className="w-full text-left space-y-3">
            <div>
              <p className="text-sm text-base-content/60">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Profile Image</p>
              <p className="font-medium truncate">{user.image || "Not set"}</p>
            </div>
          </div>

          <div className="card-actions mt-6">
            <Link href="/my-profile/update" className="btn btn-primary">
              Update Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

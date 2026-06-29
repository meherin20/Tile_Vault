import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
      asResponse: true,
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { error: data.message || "Invalid email or password" },
        { status: 401 }
      );
    }

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }
}

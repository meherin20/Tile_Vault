import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, image } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const response = await auth.api.signUpEmail({
      body: { name, email, password, image },
      headers: await headers(),
      asResponse: true,
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { error: data.message || "Registration failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth/server-session";

export async function GET() {
  try {
    const user = await getCurrentProfile();
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo obtener la sesión" },
      { status: 500 }
    );
  }
}

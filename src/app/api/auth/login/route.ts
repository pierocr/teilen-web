import { NextResponse } from "next/server";
import {
  fetchBackendJson,
  normalizeUser,
  setBackendAuthCookie,
  type ServerAuthUser,
} from "@/lib/auth/server-session";

type LoginResponse = {
  token: string;
  user: ServerAuthUser;
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = await fetchBackendJson<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    await setBackendAuthCookie(data.token);

    return NextResponse.json({
      user: normalizeUser(data.user),
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status || 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo iniciar sesión" },
      { status }
    );
  }
}

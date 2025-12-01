// src/lib/api-client.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:5001";

type RequestOptions = RequestInit & { authToken?: string | null };

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && options.method && options.method !== "GET") {
    headers.set("Content-Type", "application/json");
  }
  if (options.authToken) headers.set("Authorization", `Bearer ${options.authToken}`);

  const res = await fetch(url, { ...options, headers, cache: "no-store" });
  const data = await safeParseJSON(res);

  if (!res.ok) {
    const message = (data as any)?.error || res.statusText || "Error en la solicitud";
    throw new Error(message);
  }
  return data as T;
}

async function safeParseJSON(res: Response) {
  try {
    return await res.json();
  } catch (_err) {
    return null;
  }
}

export { API_BASE_URL };

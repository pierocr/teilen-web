// src/lib/api-client.ts
const API_BASE_URL = "/api/backend";

type RequestOptions = RequestInit & { authToken?: string | null };

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { authToken, ...fetchOptions } = options;
  void authToken;
  const url = path.startsWith("/api/")
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(fetchOptions.headers || {});

  if (!headers.has("Content-Type") && fetchOptions.method && fetchOptions.method !== "GET") {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, { ...fetchOptions, headers, cache: "no-store" });
  const data = await safeParseJSON(res);

  if (!res.ok) {
    const message = (data as { error?: string })?.error || res.statusText || "Error en la solicitud";
    throw new Error(message);
  }
  return data as T;
}

async function safeParseJSON(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export { API_BASE_URL };

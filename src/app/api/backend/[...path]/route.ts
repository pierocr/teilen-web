import { NextResponse, type NextRequest } from "next/server";
import { getBackendBaseUrl } from "@/lib/auth/session";
import { getRequestAuthToken } from "@/lib/auth/server-session";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyBackend(request: NextRequest, context: RouteContext) {
  const authToken = await getRequestAuthToken();
  if (!authToken) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { path } = await context.params;
  const targetUrl = new URL(`/${path.join("/")}`, getBackendBaseUrl());
  targetUrl.search = request.nextUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");
  if (contentType) headers.set("Content-Type", contentType);
  if (accept) headers.set("Accept", accept);
  headers.set("Authorization", `Bearer ${authToken}`);

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  const responseType = response.headers.get("content-type");
  if (responseType) responseHeaders.set("Content-Type", responseType);

  if (response.status === 204) {
    return new NextResponse(null, { status: 204, headers: responseHeaders });
  }

  return new NextResponse(await response.arrayBuffer(), {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = proxyBackend;
export const POST = proxyBackend;
export const PUT = proxyBackend;
export const PATCH = proxyBackend;
export const DELETE = proxyBackend;

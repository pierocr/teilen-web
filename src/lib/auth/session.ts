export const BACKEND_AUTH_COOKIE = "teilen.backend.token";

export const BACKEND_AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function getBackendBaseUrl() {
  return (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5001"
  ).replace(/\/$/, "");
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: BACKEND_AUTH_COOKIE_MAX_AGE,
  };
}

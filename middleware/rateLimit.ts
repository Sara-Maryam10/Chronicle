import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store — resets on server restart (fine for dev; use Redis in prod)
const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10;

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Rate limit middleware — 10 requests per minute per IP.
 * Returns 429 + Retry-After header on exceed.
 */
export function withRateLimit(
  handler: (req: NextRequest, context?: unknown) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: unknown): Promise<NextResponse> => {
    const ip = getClientIP(req);
    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || now > entry.resetAt) {
      // Fresh window
      store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    } else {
      entry.count++;
      if (entry.count > MAX_REQUESTS) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return NextResponse.json(
          { error: "Too many requests — please try again later" },
          {
            status: 429,
            headers: { "Retry-After": String(retryAfter) },
          }
        );
      }
    }

    return handler(req, context);
  };
}

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

type Handler = (req: NextRequest, context?: unknown) => Promise<NextResponse>;

/**
 * Global error handler middleware.
 * Wraps API route handlers in try/catch and returns consistent error JSON.
 *
 * Handles:
 *  - ZodError  → 400 with field-level messages
 *  - Error     → 500 (message hidden in production)
 */
export function withErrorHandler(handler: Handler): Handler {
  return async (req: NextRequest, context?: unknown): Promise<NextResponse> => {
    try {
      return await handler(req, context);
    } catch (err) {
      if (err instanceof ZodError) {
        return NextResponse.json(
          {
            error: "Validation failed",
            issues: err.issues.map((i) => ({
              field: i.path.join("."),
              message: i.message,
            })),
          },
          { status: 400 }
        );
      }

      if (err instanceof Error) {
        console.error("[API Error]", err);
        return NextResponse.json(
          {
            error:
              process.env.NODE_ENV === "development"
                ? err.message
                : "An unexpected error occurred",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  };
}

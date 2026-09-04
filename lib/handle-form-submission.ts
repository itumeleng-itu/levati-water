import { NextResponse, type NextRequest } from "next/server";
import type { z } from "zod";
import { verifyTurnstile } from "./verify-turnstile";

interface BaseFields {
  website?: string;
  turnstileToken: string;
}

/**
 * Shared POST flow for both form route handlers — parse, re-validate with
 * the same Zod schema the client used (never trust the client), check the
 * honeypot, verify Turnstile server-side, then hand off to the caller to
 * actually send the email. spec §8.
 */
export async function handleFormSubmission<T extends BaseFields>(
  req: NextRequest,
  schema: z.ZodType<T>,
  onValid: (data: T) => Promise<void>
): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }
  const data = parsed.data;

  // A filled-in honeypot means a bot. Report success anyway — a bot that
  // reads success won't come back to try harder — but never send it.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const humanVerified = await verifyTurnstile(data.turnstileToken, ip);
  if (!humanVerified) {
    return NextResponse.json({ ok: false, error: "Verification failed — please try again" }, { status: 400 });
  }

  try {
    await onValid(data);
  } catch (err) {
    console.error("Form submission failed", err);
    return NextResponse.json({ ok: false, error: "Something went wrong — please try again" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

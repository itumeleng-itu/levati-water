import { Resend } from "resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renders a simple label/value table for a lead notification email, escaping every value. */
export function renderLeadEmailHtml(fields: Array<[label: string, value: string | undefined]>): string {
  const rows = fields
    .map(
      ([label, value]) =>
        `<p style="margin:0 0 8px"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || "—")}</p>`
    )
    .join("\n");
  return `<div style="font-family:sans-serif;font-size:14px;color:#0C1922">${rows}</div>`;
}

interface SendLeadEmailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Env vars required — see .env.local.example:
 *   RESEND_API_KEY, RESEND_FROM_EMAIL, LEADS_TO_EMAIL
 * RESEND_FROM_EMAIL's domain must be verified in the Resend dashboard
 * before this will actually deliver — TODO(client)/dev setup step.
 */
export async function sendLeadEmail(opts: SendLeadEmailOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error(
      "Email is not configured — set RESEND_API_KEY, RESEND_FROM_EMAIL and LEADS_TO_EMAIL in .env.local"
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });

  if (error) throw new Error(error.message);
}

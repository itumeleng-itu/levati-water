import type { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
import { handleFormSubmission } from "@/lib/handle-form-submission";
import { sendLeadEmail, renderLeadEmailHtml } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  return handleFormSubmission(req, contactSchema, async (data) => {
    await sendLeadEmail({
      subject: `Contact form — ${data.name}`,
      replyTo: data.email,
      html: renderLeadEmailHtml([
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Message", data.message],
      ]),
    });
  });
}

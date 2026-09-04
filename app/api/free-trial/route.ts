import type { NextRequest } from "next/server";
import { freeTrialSchema } from "@/lib/validation";
import { handleFormSubmission } from "@/lib/handle-form-submission";
import { sendLeadEmail, renderLeadEmailHtml } from "@/lib/send-email";

export async function POST(req: NextRequest) {
  return handleFormSubmission(req, freeTrialSchema, async (data) => {
    await sendLeadEmail({
      subject: `Free trial request — ${data.name} (${data.area})`,
      replyTo: data.email,
      html: renderLeadEmailHtml([
        ["Name", data.name],
        ["Company", data.company],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Suburb", data.suburb],
        ["Area", data.area],
        ["Cooler preference", data.coolerPreference],
        ["Message", data.message],
      ]),
    });
  });
}

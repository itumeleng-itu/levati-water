import { z } from "zod";

// Shared between the client forms (zodResolver) and the route handlers —
// spec §8: "Never trust the client." The route handlers re-run this same
// schema against the raw request body.

// Honeypot — spec §8: visually hidden with sr-only, not display:none, since
// some bots specifically skip display:none fields. Real users never see or
// fill this in; anything present here means it's a bot.
const honeypot = z.string().max(0, "Leave this field empty").optional();

const consent = z
  .boolean()
  .refine((v) => v === true, { message: "You must agree before we can respond" });

// The client sets this from the Turnstile widget's callback; the route
// handler verifies it server-side against Cloudflare before doing anything
// else with the submission.
const turnstileToken = z.string().min(1, "Verification failed — please try again");

export const AREA_OPTIONS = ["Johannesburg", "Pretoria", "Elsewhere"] as const;
export const COOLER_PREFERENCE_OPTIONS = ["Hot & cold", "Cold & ambient", "Not sure"] as const;

export const freeTrialSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(1, "Enter a phone number"),
  suburb: z.string().min(1, "Enter your suburb"),
  area: z.enum(AREA_OPTIONS, { message: "Select an area" }),
  coolerPreference: z.enum(COOLER_PREFERENCE_OPTIONS).optional(),
  message: z.string().optional(),
  consent,
  website: honeypot,
  turnstileToken,
});
export type FreeTrialInput = z.infer<typeof freeTrialSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Enter a message"),
  consent,
  website: honeypot,
  turnstileToken,
});
export type ContactInput = z.infer<typeof contactSchema>;

"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  freeTrialSchema,
  AREA_OPTIONS,
  COOLER_PREFERENCE_OPTIONS,
  type FreeTrialInput,
} from "@/lib/validation";
import { FormField, fieldA11y } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/forms/turnstile";

function FreeTrialForm() {
  const router = useRouter();
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FreeTrialInput>({
    resolver: zodResolver(freeTrialSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      suburb: "",
      message: "",
      consent: false,
      website: "",
      turnstileToken: "",
    },
  });

  // RHF's reValidateMode only takes effect after a submit attempt — before
  // that, a field that errored on blur stays governed by `mode` (onBlur)
  // and won't clear until the next blur, not spec §8's "re-validate on
  // change once a field has errored." This wraps register()'s own onChange
  // to force it explicitly whenever the field already has an error.
  function withRevalidate(name: Path<FreeTrialInput>) {
    const { onChange, ...rest } = register(name);
    return {
      ...rest,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        onChange(e);
        if (errors[name]) trigger(name);
      },
    };
  }

  const area = watch("area");

  const onVerify = React.useCallback(
    (token: string) => setValue("turnstileToken", token, { shouldValidate: true }),
    [setValue]
  );

  async function onSubmit(data: FreeTrialInput) {
    setFormError(null);
    try {
      const res = await fetch("/api/free-trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
      router.push("/thank-you");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong — please try again");
    }
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" required error={errors.name?.message}>
          <Input
            invalid={!!errors.name}
            autoComplete="name"
            {...withRevalidate("name")}
            {...fieldA11y("name", errors.name?.message)}
          />
        </FormField>
        <FormField id="company" label="Company (optional)" error={errors.company?.message}>
          <Input
            invalid={!!errors.company}
            autoComplete="organization"
            {...withRevalidate("company")}
            {...fieldA11y("company", errors.company?.message)}
          />
        </FormField>
        <FormField id="email" label="Email" required error={errors.email?.message}>
          <Input
            type="email"
            invalid={!!errors.email}
            autoComplete="email"
            {...withRevalidate("email")}
            {...fieldA11y("email", errors.email?.message)}
          />
        </FormField>
        <FormField id="phone" label="Phone" required error={errors.phone?.message}>
          <Input
            type="tel"
            invalid={!!errors.phone}
            autoComplete="tel"
            {...withRevalidate("phone")}
            {...fieldA11y("phone", errors.phone?.message)}
          />
        </FormField>
        <FormField id="suburb" label="Suburb" required error={errors.suburb?.message}>
          <Input
            invalid={!!errors.suburb}
            {...withRevalidate("suburb")}
            {...fieldA11y("suburb", errors.suburb?.message)}
          />
        </FormField>
        <FormField id="area" label="Area" required error={errors.area?.message}>
          <Select
            invalid={!!errors.area}
            defaultValue=""
            {...withRevalidate("area")}
            {...fieldA11y("area", errors.area?.message)}
          >
            <option value="" disabled>
              Select an area
            </option>
            {AREA_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      {area === "Elsewhere" && (
        <p className="rounded-md bg-blue-50 p-4 text-body text-blue-700">
          The seven-day free trial covers Johannesburg and Pretoria only. We&apos;d still love to
          hear from you — please use the{" "}
          <Link href="/contact" className="font-semibold underline">
            contact form
          </Link>{" "}
          instead and we&apos;ll confirm what&apos;s possible.
        </p>
      )}

      <FormField
        id="coolerPreference"
        label="Cooler preference (optional)"
        error={errors.coolerPreference?.message}
      >
        <Select defaultValue="" {...withRevalidate("coolerPreference")} {...fieldA11y("coolerPreference")}>
          <option value="">Not sure</option>
          {COOLER_PREFERENCE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField id="message" label="Message (optional)" error={errors.message?.message}>
        <Textarea {...withRevalidate("message")} {...fieldA11y("message", errors.message?.message)} />
      </FormField>

      {/* Honeypot — visually hidden with sr-only, not display:none, since some
          bots specifically skip display:none fields (spec §8). aria-hidden
          keeps it out of the accessibility tree so screen reader users never
          encounter it despite sr-only technically making it "visible" to AT. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <Checkbox
            invalid={!!errors.consent}
            {...withRevalidate("consent")}
            {...fieldA11y("consent", errors.consent?.message)}
          />
          <label htmlFor="consent" className="text-small text-ink-600">
            I agree to Levati Water processing my details to respond to this enquiry. See the{" "}
            <Link href="/privacy" className="font-semibold text-blue-700 hover:text-navy-900">
              privacy notice
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" role="alert" className="flex items-center gap-1.5 text-small text-error">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      {siteKey ? (
        <Turnstile siteKey={siteKey} onVerify={onVerify} onExpire={() => setValue("turnstileToken", "")} />
      ) : (
        // Dev-facing fallback: NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set, so
        // there's no widget to render and no token to produce — see
        // README.md's "Configuring variables". A real site visitor should
        // never see an env var name, so this stays generic.
        <p className="text-small text-ink-600">Spam verification is currently unavailable.</p>
      )}
      {errors.turnstileToken && (
        <p role="alert" className="flex items-center gap-1.5 text-small text-error">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {errors.turnstileToken.message}
        </p>
      )}

      {formError && (
        <p role="alert" className="flex items-center gap-1.5 text-small text-error">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isSubmitting ? "Sending…" : "Book my free trial"}
      </Button>
    </form>
  );
}

export { FreeTrialForm };

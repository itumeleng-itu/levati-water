"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { FormField, fieldA11y } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/forms/turnstile";

function ContactForm() {
  const router = useRouter();
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
      website: "",
      turnstileToken: "",
    },
  });

  // See free-trial-form.tsx: RHF's reValidateMode only takes effect after a
  // submit attempt, so this forces re-validation on change once a field
  // already has an error, per spec §8.
  function withRevalidate(name: Path<ContactInput>) {
    const { onChange, ...rest } = register(name);
    return {
      ...rest,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e);
        if (errors[name]) trigger(name);
      },
    };
  }

  const onVerify = React.useCallback(
    (token: string) => setValue("turnstileToken", token, { shouldValidate: true }),
    [setValue]
  );

  async function onSubmit(data: ContactInput) {
    setFormError(null);
    try {
      const res = await fetch("/api/contact", {
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
      <FormField id="name" label="Name" required error={errors.name?.message}>
        <Input
          invalid={!!errors.name}
          autoComplete="name"
          {...withRevalidate("name")}
          {...fieldA11y("name", errors.name?.message)}
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
      <FormField id="phone" label="Phone (optional)" error={errors.phone?.message}>
        <Input
          type="tel"
          invalid={!!errors.phone}
          autoComplete="tel"
          {...withRevalidate("phone")}
          {...fieldA11y("phone", errors.phone?.message)}
        />
      </FormField>
      <FormField id="message" label="Message" required error={errors.message?.message}>
        <Textarea
          invalid={!!errors.message}
          {...withRevalidate("message")}
          {...fieldA11y("message", errors.message?.message)}
        />
      </FormField>

      {/* Honeypot — see components/forms/free-trial-form.tsx for why sr-only
          + aria-hidden rather than display:none. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
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
          <p role="alert" className="flex items-center gap-1.5 text-small text-error">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      {siteKey ? (
        <Turnstile siteKey={siteKey} onVerify={onVerify} onExpire={() => setValue("turnstileToken", "")} />
      ) : (
        <p className="text-small text-ink-400">
          Turnstile is not configured — set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local.
        </p>
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
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

export { ContactForm };

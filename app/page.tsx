import { Button } from "@/components/ui/button";

// Temporary phase-1 smoke test — checks tokens and Button render correctly.
// Not part of the real site; delete once the real home page (spec §7.1) lands.
export default function TokenCheckPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
      <h1 className="text-display font-heading font-bold text-ink-900">Levati Water</h1>
      <p className="mt-2 text-h3 font-heading font-semibold text-blue-700">
        Phase 1 token &amp; Button check
      </p>

      <section className="mt-10">
        <h2 className="text-h2 font-heading font-bold text-ink-900">Type scale</h2>
        <div className="mt-4 space-y-3">
          <p className="text-display">Display — Pure water. Delivered.</p>
          <p className="text-h1">H1 — Pure water. Delivered.</p>
          <p className="text-h2">H2 — Pure water. Delivered.</p>
          <p className="text-h3">H3 — Pure water. Delivered.</p>
          <p className="text-lead text-ink-600">Lead — Home and office water solutions.</p>
          <p className="text-body text-ink-600">Body — Home and office water solutions.</p>
          <p className="text-small text-ink-400">Small — captions and placeholders.</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-h2 font-heading font-bold text-ink-900">Colours</h2>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {[
            ["navy-900", "bg-navy-900"],
            ["navy-800", "bg-navy-800"],
            ["blue-700", "bg-blue-700"],
            ["blue-500", "bg-blue-500"],
            ["blue-300", "bg-blue-300"],
            ["blue-100", "bg-blue-100"],
            ["aqua-500", "bg-aqua-500"],
            ["surface", "bg-surface"],
          ].map(([label, cls]) => (
            <div key={label}>
              <div className={`h-16 rounded-lg border border-line ${cls}`} />
              <p className="mt-1 text-small text-ink-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-h2 font-heading font-bold text-ink-900">Button — variants</h2>
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg bg-surface p-6">
          <Button variant="primary">Book a free trial</Button>
          <Button variant="secondary">See our products</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Privacy</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-h2 font-heading font-bold text-ink-900">Button — sizes</h2>
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg bg-surface p-6">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-h2 font-heading font-bold text-ink-900">Button — as link</h2>
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg bg-surface p-6">
          <Button href="/free-trial">Book a free trial (Link)</Button>
        </div>
      </section>
    </main>
  );
}

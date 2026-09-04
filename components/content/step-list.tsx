interface StepListProps {
  steps: readonly string[];
}

// Vertical on base/md, horizontal on lg+ — spec §4. Numbered because this one
// section is a genuine sequence (spec §7.1 item 7), unlike the eyebrow labels
// dropped everywhere else.
function StepList({ steps }: StepListProps) {
  return (
    <ol className="flex flex-col gap-8 lg:flex-row lg:gap-6">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-1 items-start gap-4 lg:flex-col lg:items-center lg:text-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 font-heading text-h3 font-bold text-white">
            {i + 1}
          </span>
          <p className="pt-2 text-body font-semibold text-ink-900 lg:pt-0">{step}</p>
        </li>
      ))}
    </ol>
  );
}

export { StepList };

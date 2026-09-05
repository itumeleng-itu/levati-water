import { Container } from "@/components/layout/container";

// "30+ years" belongs to Trevor Currie's own career (water industry since
// the early 1990s), not Levati as a trading entity — see the content
// source-of-truth doc. Scoped to "founder experience" so it stays accurate.
const STATS = [
  "30+ years of founder experience",
  "7-stage reverse osmosis",
  "Free maintenance on rentals",
  "Gauteng delivery",
] as const;

function StatBar() {
  return (
    <div data-header-theme="white" className="border-b border-line bg-white">
      <Container>
        <ul className="grid grid-cols-2 gap-y-4 py-6 text-center lg:grid-cols-4 lg:divide-x lg:divide-line">
          {STATS.map((stat) => (
            <li key={stat} className="px-4 text-small font-semibold text-ink-900 lg:text-body">
              {stat}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export { StatBar };

import { Container } from "@/components/layout/container";

const STATS = [
  "30+ years in the industry",
  "7-stage reverse osmosis",
  "Free maintenance on rentals",
  "Jhb & Pretoria delivery",
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

export interface TimelineEvent {
  year: string;
  text: string;
}

function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative flex flex-col gap-8 border-l-2 border-line pl-8">
      {events.map((event) => (
        <li key={event.year + event.text} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[calc(2rem+5px)] top-1 h-[9px] w-[9px] rounded-full bg-blue-500"
          />
          <p className="font-heading text-h3 font-semibold text-blue-700">{event.year}</p>
          <p className="mt-1 text-body text-ink-600">{event.text}</p>
        </li>
      ))}
    </ol>
  );
}

export { Timeline };

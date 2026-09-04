function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-blue-50 px-4 py-1.5 text-small font-semibold text-blue-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export { ChipList };

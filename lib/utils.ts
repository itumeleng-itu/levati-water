type ClassValue = string | number | false | null | undefined;

/**
 * Joins truthy class names. No conflict resolution — if this project adds
 * `tailwind-merge` later, swap the implementation, not the call sites.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

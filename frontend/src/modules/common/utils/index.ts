export function createEnumerationUpTo(max: number) {
  return Array.from({ length: max }, (_, i) => i + 1);
}

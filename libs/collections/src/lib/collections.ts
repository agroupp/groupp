/**
 * Returns the first element of a sequence
 * @param array
 */
export function first<T>(array: Array<T>): T | null {
  if (!array || array.length < 1) {
    return null;
  }
  return array[0];
}

export const getFirstOrDefault = <T>(
  array: T[] | T | undefined,
  defaultValue: T
): T => {
  if (Array.isArray(array)) {
    return array[0] ?? defaultValue;
  }

  return array ?? defaultValue;
};

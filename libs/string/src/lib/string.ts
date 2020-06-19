/**
 * Indicates whether a specified string is null, empty, or consists only of white-space characters.
 */
export const isNullOrWhiteSpace = (source: string): boolean => (!source || !source.trim() ? true : false);

/**
 * Represents the empty string.
 */
export const emptyString = '';

/**
 * Returns the string with first character in upper case.
 * @param value
 */
export const capitalize = (value: string) =>
  isNullOrWhiteSpace(value) ? emptyString : value.charAt(0).toUpperCase() + value.slice(1);

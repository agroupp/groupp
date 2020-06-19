import { isNullOrWhiteSpace, emptyString, capitalize } from './string';

describe('String manipulations', () => {
  it('should detect empty string', () => {
    expect(isNullOrWhiteSpace('')).toBeTruthy();
    expect(isNullOrWhiteSpace(' ')).toBeTruthy();
    expect(isNullOrWhiteSpace('          ')).toBeTruthy();
    expect(isNullOrWhiteSpace(null)).toBeTruthy();
    expect(isNullOrWhiteSpace(undefined)).toBeTruthy();
    expect(isNullOrWhiteSpace('  a ')).toBeFalsy();
  });

  it('should return empty string', () => expect(isNullOrWhiteSpace(emptyString)).toBeTruthy());

  it('should capitalize first character in string', () => expect(capitalize('abc')).toEqual('Abc'));
});

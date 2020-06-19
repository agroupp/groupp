import { first } from './collections';

describe('Getting array elements', () => {
  it('should return first element of the array', () => {
    expect(first([1, 2, 3, 4, 5])).toEqual(1);
  });
});

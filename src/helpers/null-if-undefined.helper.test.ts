import { nullIfUndefined } from './null-if-undefined.helper';

describe('The "nullIfUndefined" helper function', () => {
  it('Should convert an "undefined" resolving promise into an "null" resolved promise', () => {
    const result = nullIfUndefined(undefined);
    expect(result).toBe(null);
  });

  it('Should not touch a non-nullable resolving promise', () => {
    const result = nullIfUndefined('unchanged');
    expect(result).toBe('unchanged');
  });

  it('Should not touch a null resolving promise', () => {
    const result = nullIfUndefined(null);
    expect(result).toBe(null);
  });
});
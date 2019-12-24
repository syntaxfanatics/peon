import { nullIfUndefinedAsync } from './null-if-undefined-async.helper';

describe('The "nullIfUndefinedAsync" helper function', () => {
  it('Should convert an "undefined" resolving promise into an "null" resolved promise', async () => {
    const result = await nullIfUndefinedAsync(Promise.resolve(undefined));
    expect(result).toBe(null);
  });

  it('Should not touch a non-nullable resolving promise', async () => {
    const result = await nullIfUndefinedAsync(Promise.resolve('unchanged'));
    expect(result).toBe('unchanged');
  });

  it('Should not touch a null resolving promise', async () => {
    const result = await nullIfUndefinedAsync(Promise.resolve(null));
    expect(result).toBe(null);
  });
});
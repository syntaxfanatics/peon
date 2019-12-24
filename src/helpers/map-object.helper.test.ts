import { mapObject } from './map-object.helper';

describe('The "mapObject" helper function', () => {
  it('Should map object values', () => {
    const obj = { hello: 'world', abc: 'def' };
    const result = mapObject(obj)(() => 3);
    expect(result).toMatchObject({ hello: 3, abc: 3 });
  });

  it('Should map readonly object values', () => {
    const obj = { hello: 'world', abc: 'def', } as const;
    const result = mapObject(obj)((v) => {
      if (v === 'world') return true;
      return false;
    });
    expect(result).toMatchObject({ hello: true, abc: false });
  });
});

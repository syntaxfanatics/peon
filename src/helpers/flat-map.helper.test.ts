import { flatMap } from './flat-map.helper';

describe('The "flatMap" helper function', () => {
  it('Should flatten a 2d projection into a 1d projection', () => {
    const arr: number[] =[1, 2, 3, 4];
    function proj(i: number): [number, number] { return [i, i + 1] }
    const expected = [1, 2, 2, 3, 3, 4, 4, 5]
    expect(flatMap(arr)(proj)).toMatchObject(expected);
  });
});

import { flatten } from './flatten.helper';

describe('The "flatMap" helper function', () => {
  it('Should flatten a 2d array into a 1d array', () => {
    expect(flatten([[1, 2], [3, 4]])).toMatchObject([ 1, 2, 3, 4, ]);
  });

  it('Should flatten a 3d array into a 2d array', () => {
    expect(flatten([[[1, 2], [3, 4]]])).toMatchObject([[1, 2], [3, 4]]);
  });
});
import { memoise } from './memoise.helper';

describe('The "memoise" helper function', () => {
  it('Should create a function that memoises inputs', () => {
    const obj = {
      doFn(input: number) {
        switch (input) {
          case 1: return { value: 'first' };
          default: return { value: 'default' };
        }
      }
    }

    const spyDoFn = jest.spyOn(obj, 'doFn');

    const memoisedDoFn = memoise(obj.doFn);

    const firstResult = memoisedDoFn(1);
    const memodSecondResult = memoisedDoFn(1);
    const thirdResult = memoisedDoFn(2);

    expect(firstResult).toBe(memodSecondResult);
    expect(firstResult).not.toBe(thirdResult);

    expect(spyDoFn).toBeCalledTimes(2);
    expect(spyDoFn).not.toBeCalledTimes(3);
  });
});
import { onceify } from './onceify.helper';

describe('The "onceify" helper function', () => {
  it('Should only allow a function to be called once', () => {
    const obj = { fire() { return 5; } };
    const spyFire = jest.spyOn(obj, 'fire');
    const fireOnce = onceify(obj.fire);

    fireOnce();
    expect(fireOnce).toThrowError(ReferenceError);
    expect(spyFire).toBeCalledTimes(1);
  });
});

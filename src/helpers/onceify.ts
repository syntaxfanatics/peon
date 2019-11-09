import { AnyFunc } from './helper-types';

/**
 * Only allow the function to be called once
 *
 * @param fn
 */
export function onceify<F extends AnyFunc>(fn: F) {
  let hasBeenCalled = false;
  return function doOnceify(...args: Parameters<F>): ReturnType<F> {
    if (hasBeenCalled) throw new ReferenceError(`Onceified function "${fn.name}" has already been called`);
    hasBeenCalled = true;
    return fn(...args);
  }
}

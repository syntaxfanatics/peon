import { AnyFunc } from './helper-types';

/**
 * @description
 * Void the return of a function
 *
 * @param fn
 */
export function voidify<F extends AnyFunc>(fn: F) {
  return function doVoidify(...args: Parameters<F>): void {
    return void fn(...args);
  }
}

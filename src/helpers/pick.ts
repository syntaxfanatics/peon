import {$TS_FIX_ME, AnElementOf} from './helper-types';

/**
 * Clone an object and pick the desired properties
 *
 * Place put the properties to pick as the first argument
 *
 * Composes well with functions that take unary arguments
 *
 * @param include
 */
export function pick<T extends (string | number)[]>(...include: T) {
  return function doPick<R extends Record<string | number ,any>>(
    record: R
  ): Pick<R, AnElementOf<T>> {
    const result = include
      .reduce((acc, inc) => {
        acc[inc] = record[inc];
        return acc;
      }, {} as $TS_FIX_ME<any>);

    return result;
  }
}

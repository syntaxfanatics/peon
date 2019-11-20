import {$TS_FIX_ME, AnElementOf} from './helper-types';

/**
 * Clone an object and omit the desired properties
 *
 * Place put the properties to omit as the first argument
 *
 * Composes well with functions that take unary arguments
 *
 * @param leaveOut
 */
export function omit<T extends (string | number)[]>(...leaveOut: T) {
  return function doOmit<R extends Record<string | number ,any>>(
    record: R
  ): Omit<R, AnElementOf<T>> {
    const result = Object
      .entries(record)
      .reduce((acc, [k, v]) => {
        const toBeOmitted = leaveOut.indexOf(k) !== -1;
        if (!toBeOmitted) acc[k] = v;
        return acc;
      }, {} as $TS_FIX_ME<any>);

    return result;
  }
}

import {$TS_FIX_ME, AnElementOf} from './helper-types';

/**
 * Clone an object and pick the desired properties
 *
 * @param include
 */
export function pick<T extends (PropertyKey)[]>(...include: T) {
  return function doPick<R extends Record<PropertyKey ,any>>(
    record: R
  ): Pick<R, AnElementOf<T>> {
    const result = Object
      .entries(record)
      .reduce((acc, [k, v]) => {
        const toBePicked = include.indexOf(k) !== -1;
        if (toBePicked) acc[k] = v;
        return acc;
      }, {} as $TS_FIX_ME<any>);

    return result;
  }
}

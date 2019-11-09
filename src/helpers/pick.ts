import {$TS_FIX_ME, AnElementOf} from './helper-types';

type StrNum = string | number;

/**
 * Clone an object and pick the desired properties
 *
 * @param include
 */
export function pick<T extends (StrNum)[]>(...include: T) {
  return function doPick<R extends Record<StrNum ,any>>(
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

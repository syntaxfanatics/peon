import {$TS_FIX_ME, AnElementOf} from './helper-types';

/**
 * Clone an object and omit the desired properties
 *
 * @param leaveOut
 */
export function omit<T extends (PropertyKey)[]>(...leaveOut: T) {
  return function doOmit<R extends Record<PropertyKey ,any>>(
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

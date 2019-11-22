import { objectEntries } from './object-entries';
import { AValueOf, $TS_FIX_ME } from './helper-types';
import { objectFromEntries } from './object-from-entries';

/**
 * @description
 * Map an object
 *
 * TODO: fix typing
 *
 * @param obj
 */
export function mapObject<T extends Record<PropertyKey, any>>(obj: T) {
  return function doMapObject<F extends (entry: [keyof T, T[keyof T]]) => any>(projectionFn: F): {[K in keyof T]: F extends (entry: [K, T[K]]) => infer R ? R : never} {
    const entries = objectEntries(obj);
    const mappedEntries = entries.map(([k ,v]) => [k, projectionFn(v)]);
    const mappedObject = objectFromEntries(mappedEntries as $TS_FIX_ME<any>);
    return mappedObject as $TS_FIX_ME<any>;
  }
}

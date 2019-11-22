import { hasFunctionProperty } from './type-guards';
import { $TS_FIX_ME, AValueOf } from './helper-types';

/**
 * @description
 * Get an array of arrays of the objects keys and values
 * Record<key, value> => [key, value][]
 *
 * @param obj
 */
export function objectEntries<T extends Record<PropertyKey, any>>(obj: T): [keyof T, T[keyof T]][] {
  if (hasFunctionProperty(Object, 'entries')) return Object.entries(obj) as [keyof T, AValueOf<T>][];

  const result = Object.keys(obj).map(key => [key, obj[key]] as [keyof T, T[keyof T]]);

  return result;
}

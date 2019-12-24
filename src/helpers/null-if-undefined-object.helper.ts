import { $TS_FIX_ME } from '../types/$ts-fix-me.type';
import { mapObject } from './map-object.helper';

/**
 * @description
 * Return an object where any undefined values are converted to null
 *
 * @param input
 */
export function nullIfUndefinedObject<T>(
  input: T,
): Required<{[K in keyof T]: T[K] extends NonNullable<T[K]> ? T[K] : null }> {
  const result = mapObject(input)((v) => (v === undefined ? null : v));
  return result as $TS_FIX_ME<any>;
}

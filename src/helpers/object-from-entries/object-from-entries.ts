import { hasFunctionProperty } from '../type-guards/type-guards';

/**
 * @description
 * Create an object from the given entries (array of arrays of key-value pairs)
 *
 * @param entries
 */
export function objectFromEntries<K extends PropertyKey, T>(entries: [K, T][]): Record<K, T> {
  if (hasFunctionProperty(Object, 'fromEntries')) return Object.fromEntries(entries) as Record<K, T>;
  const obj = {} as Record<K, T>;
  entries.forEach(([k, v]) => { obj[k] = v });
  return obj;
}

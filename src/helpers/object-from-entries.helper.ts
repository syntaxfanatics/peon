type UnaryEntryRecord<K> = Record<Extract<K, PropertyKey>, K>

/**
 * @description
 * Create an object from the given entries (array of arrays of key-value pairs)
 * Better typed version of Object.entries
 *
 * @bug
 * does not work well under some conditions when entries types are not assignable to PropertyKey
 *
 * @hint
 * If mapping an object, use mapObject
 *
 * @warning
 * may not represent reality for non-enumerable properties
 *
 * @Aample
 * ```ts
 * const entries = [['abc', 'hia], ['def', 'hello :)']];
 * const obj = objectFromTupleEntries(entries)
 * ```
 *
 * @param entries
 */

// begin with the most specific overrides so they are used where possible

// has to handle lots of different edge cases that I can't figure out how to handle naturally with TS
// including:
//  1. Strongly typed 2-Tuples vs arrays
//  2. Mutable inner & outer array, Readonly inner array, Readonly outer array, Readonly inner & outer array
//  3. Array values that are assignable to PropertyKey and those that are not (and must be excluded - causes some bugs)
// @note: These do not all work as expected. The more polymorphic a type, the more edge cases there will be...
export function objectFromEntries<K extends PropertyKey, V>(entries: readonly (readonly [K, V])[]): Record<K, V>;
export function objectFromEntries<K extends PropertyKey>(entries: readonly (readonly K[])[]): Record<K, K>;
export function objectFromEntries<K>(entries: readonly (readonly K[])[]): K;// Record<Extract<K, PropertyKey>, K>;
export function objectFromEntries<K extends PropertyKey, V>(entries: readonly ([K, V])[]): Record<K, V>;
export function objectFromEntries<K extends PropertyKey, V>(entries: (readonly [K, V])[]): Record<K, V>;
export function objectFromEntries<K extends PropertyKey>(entries: readonly (K[])[]): Record<K, K>;
export function objectFromEntries<K extends PropertyKey>(entries: (readonly K[])[]): Record<K, K>;
export function objectFromEntries<K>(entries: readonly (K[])[]): Record<Extract<K, PropertyKey>, K>;
export function objectFromEntries<K>(entries: (readonly K[])[]): Record<Extract<K, PropertyKey>, K>;
export function objectFromEntries<K extends PropertyKey, V>(entries: [K, V][]): Record<K, V>;
export function objectFromEntries<K extends PropertyKey>(entries: K[][]): Record<K, K>;
export function objectFromEntries<K1>(entries: K1[][]): UnaryEntryRecord<K1>
// export function objectFromEntries<K1, K2>(entries: (K1[] | K2[])[]): UnaryEntryRecord<K1> & UnaryEntryRecord<K2>
// export function objectFromEntries<K1, K2, K3>(entries: (K1[] | K2[] | K3[])[]): UnaryEntryRecord<K1> & UnaryEntryRecord<K2> & UnaryEntryRecord<K3>
// export function objectFromEntries<K1, K2, K3, K4>(entries: (K1[] | K2[] | K3[] | K4[])[]): UnaryEntryRecord<K1> & UnaryEntryRecord<K2>& UnaryEntryRecord<K3> & UnaryEntryRecord<K4>
// export function objectFromEntries<K1, K2, K3, K4, K5>(entries: (K1[] | K2[] | K3[] | K5[])[]): UnaryEntryRecord<K1> & UnaryEntryRecord<K2> & UnaryEntryRecord<K3> & UnaryEntryRecord<K4> & UnaryEntryRecord<K5>
// catch all
export function objectFromEntries(entries: any): Record<any, any>
export function objectFromEntries<K extends PropertyKey>(
  entries:
  | K[][]
  | (readonly K[])[]
  | readonly (K[])[]
  | readonly (readonly K[])[]
): Record<PropertyKey, K> {
  // if (hasFunctionProperty(Object, 'fromEntries')) return Object.fromEntries(entries) as Record<K, T>;
  const obj = {} as Record<PropertyKey, K>;
  Array.from(entries).forEach(([k, v]) => { obj[k] = v });
  return obj;
}

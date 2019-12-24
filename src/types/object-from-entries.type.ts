import { Entry } from './entry.type';
import { AnElementOf } from './an-element-of.type';

/**
 * @description
 * Entries from an objects keys & values
 *
 * @note
 * Sadly, this is the best I can come up with to morph an array of tuples into an object.
 * Every path I take ends with the K/V's losing reference to each other, causing the objects
 * keys to be a union type of all keys, and values to be a union type of all values.
 *
 * When doing Object.fromEntries(Object.entries) this is circumventable by holding onto a reference
 * to the initial object and using it to project onto the output record
 * However, this isn't possible / desirable for a generic type that maps entries to an object
 *
 * @warning
 * may not represent reality for non-enumerable properties
 */
export type ObjectFromEntries<A extends Entry<keyof any, any>[]> = AnElementOf<A> extends Entry<infer K, infer V> ? Record<K, V> : never;

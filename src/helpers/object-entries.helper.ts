import { AnyRecord } from '../types/any-record.type';
import { Entry } from '../types/entry.type';
import { AnEntryOf } from '../types/an-entry-of.type';

/**
 * @description
 * Get an array of arrays of the objects keys and values
 * Record<key, value> => [key, value][]
 *
 * @param obj
 */
export function objectEntries<T extends AnyRecord>(obj: T): AnEntryOf<T>[] {
  // if (hasFunctionProperty(Object, 'entries')) return Object.entries(obj) as [keyof T, AValueOf<T>][];
  const result = Object.keys(obj).map(key => [key, obj[key]] as Entry<keyof T, T[keyof T]>);
  return result;
}

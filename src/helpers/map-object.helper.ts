import { objectEntries } from './object-entries.helper';
import { objectFromEntries } from './object-from-entries.helper';
import { UnaryFn } from '../types/unary-fn.type';
import { AnEntryOf } from '../types/an-entry-of.type';
import { UnaryRecordMap } from '../types/unary-record-map';
import { $TS_FIX_ME } from '../types/$ts-fix-me.type';

/**
 * @description
 * Map an object
 *
 * TODO: fix typing
 *
 * @param obj
 */
export function mapObject<T>(obj: T) {
  return function doMapObject<F extends UnaryFn<AnEntryOf<T>[1]>>(projectionFn: F): UnaryRecordMap<F, T> {
    const entries = objectEntries(obj);
    const mappedEntries: AnEntryOf<UnaryRecordMap<F, T>>[] = entries.map(([k, v]) => [k, projectionFn(v)]);
    const mappedObject = objectFromEntries(mappedEntries);
    return mappedObject as $TS_FIX_ME<any>;
  }
}

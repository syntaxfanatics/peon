import { WithoutNullable } from '../types/without-nullable.type';
import { objectEntries } from './object-entries.helper';
import { objectFromEntries } from './object-from-entries.helper';
import { $TS_FIX_ME } from '../types/$ts-fix-me.type';

/**
 * @description
 * Immutably remove nullable
 *
 * @param inp
 */
export function withoutNullable<T extends {}>(inp: T): WithoutNullable<T> {
  const entries = objectEntries(inp);
  const filteredEntries = entries.filter(([k, v]) => ((v !== null) && (v !== undefined)));
  const result = objectFromEntries(filteredEntries);
  return result as $TS_FIX_ME<any>;
}

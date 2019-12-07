import { $TS_FIX_ME, WithoutNullable } from '../../types/helper-types';
import { objectFromEntries } from '../object-from-entries/object-from-entries';
import { objectEntries } from '../object-entries/object-entries';

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

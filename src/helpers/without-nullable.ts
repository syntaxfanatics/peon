import { $TS_FIX_ME } from './helper-types';
import { objectFromEntries } from './object-from-entries';

/**
 * @description
 * Immutably remove nullable
 *
 * @param inp
 */
export function withoutNullable<T extends {}>(inp: T): NonNullable<T> {
  const result = objectFromEntries(Object.entries(inp).filter(([k, v]) => ((v !== null) && (v !== undefined))));
  return result as $TS_FIX_ME<NonNullable<T>>;
}

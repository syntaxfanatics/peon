import { $TS_FIX_ME } from './helper-types';

/**
 * @description
 * Immutably remove nullable
 *
 * @param inp
 */
export function withoutNullable<T extends {}>(inp: T): NonNullable<T> {
  const acc: $TS_FIX_ME<any> = {};
  Object.entries(inp).forEach(([k, v]) => ((v !== null) && (v !== undefined) && (acc[k] = v)));
  return acc as $TS_FIX_ME<NonNullable<T>>;
}

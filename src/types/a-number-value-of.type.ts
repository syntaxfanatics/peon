import { StringOrNumberConstRecord } from './string-or-number-const-record.type';

/**
 * Get number values from an const object
 *  - Provides a union of number values
 *  - Primary use case is for connecting constants (from readonly objects) to their usage as keys in maps
 *
 * @example
 * const SOCKET_MESSAGES = { NEW_MESSAGE: 1, TYPING: 2, LOG_OUT: 3 } as const;
 * export type ASocketMessageValue = AStringKeyOf<SOCKET_MESSAGES> // 1 | 2 | 3
 */
export type ANumberValueOf<
  T extends StringOrNumberConstRecord,
  Return = T[keyof T] extends string ? T[keyof T] : T[keyof T] extends number ? T[keyof T] : never
> = Return;
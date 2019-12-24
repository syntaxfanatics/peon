import { StringOrNumberConstRecord } from './string-or-number-const-record.type';

/**
 * Get string or number values from a const object
 *  - Provides a union of string and number values
 *  - Primary use case is for connecting constants (from readonly objects) to their usage as keys in maps
 *
 * @example
 * const SOCKET_MESSAGES = { NEW_MESSAGE: 'new_message', TYPING: 2, LOG_OUT: 3 } as const;
 * export type ASocketMessageValue = AStringKeyOf<SOCKET_MESSAGES> // 'new_message' | 2 | 3
 */
export type AStringOrNumberValueOf<
  T extends StringOrNumberConstRecord,
  Return = T[keyof T] extends string ? T[keyof T] : T[keyof T] extends number ? T[keyof T] : never
> = Return;

import { StringConstRecord } from './string-const-record.type';

/**
 * @description
 * Get string values from an const object
 *  - Provides a union of string values
 *  - Primary use case is for connecting constants (from readonly objects) to their usage as keys in maps
 *
 * @example
 * const SOCKET_MESSAGES = { NEW_MESSAGE: 'new_message', TYPING: 'typing', LOG_OUT: 'log_out' } as const;
 * export type ASocketMessageValue = AStringKeyOf<SOCKET_MESSAGES> // 'new_message' | 'typing' | 'log_out'
 */
export type AStringValueOf<T extends StringConstRecord, Return = T[keyof T] extends string ? T[keyof T] : never> = Return;

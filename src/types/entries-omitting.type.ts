import { EntriesFromRecord } from './entries-from-record.type';

/**
 * @description
 * Entries of an object,
 * Omitting the specified keys
 *
 * Takes an object and returns its entries without the specified keys
 */
export type EntriesOmitting<T, K extends keyof T | keyof any> = EntriesFromRecord<Omit<T, K>>;

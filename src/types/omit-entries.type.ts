import { EntriesFromRecord } from './entries-from-record.type';
import { EntriesOmitting } from './entries-omitting.type';

/**
 * @description
 * Entries without the specified keys
 *
 * Takes entries and returns those entries without the specified keys
 */
export type OmitEntries<
  E extends EntriesFromRecord<any>,
  K extends (E extends EntriesFromRecord<infer R> ? keyof R : never),
> = E extends EntriesFromRecord<infer R>
  ? EntriesOmitting<R, K>
  : E;
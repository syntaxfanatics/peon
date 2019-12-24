import { Entry } from './entry.type';
import { AnyReadonlyableRecord } from './any-readonlyable-record';
import { AnEntryOf } from './an-entry-of.type';

/**
 * @description
 * Extract an objects entries into a strongly typed tuple
 */
export type EntriesFromRecord<R extends AnyReadonlyableRecord> = AnEntryOf<R>[];

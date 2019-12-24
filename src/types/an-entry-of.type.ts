import { Entry } from './entry.type';

export type AnEntryOf<T> = {[K in keyof T]: Entry<K, T[K]> }[keyof T];

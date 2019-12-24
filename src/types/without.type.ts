import { RemoveNever } from './remove-never.type';

/**
 * @description
 * T without its properties that are assignable to V
 *
 * @default possible duplicate of omit-where?
 * @TODO clean up duplicates
 */
export type Without<T, V> = RemoveNever<{ [K in keyof T]: T[K] extends V ? never : T[K] }>;
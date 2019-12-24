import { RemoveNever } from './remove-never.type';

/**
 * @description
 * T without its properties that are assignable to undefined or null
 */
export type WithoutUndefined<T> = RemoveNever<{ [K in keyof T]: T[K] extends undefined ? never : T[K] }>;
import { RemoveNever } from './remove-never.type';


/**
 * @description
 * T without its properties that are assignable to null
 *
 * @duplicate of without-null?
 * @TODO cleanup duplicates
 */
export type WithoutNull<T> = RemoveNever<{ [K in keyof T]: T[K] extends null ? never : T[K] }>;

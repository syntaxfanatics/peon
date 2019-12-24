import { RemoveNever } from './remove-never.type';


/**
 * @description
 * T without its properties that are assignable to undefined or null
 */
export type WithoutNullable<T> = RemoveNever<{ [K in keyof T]: NonNullable<T[K]> }>;
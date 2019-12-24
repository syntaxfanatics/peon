/**
 * @description
 * Keys of the object, except those of type R
 *
 * Extrapolated from TS documentation
 *
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type KeysExceptWhere<T, R> = { [K in keyof T]: T[K] extends R ? never : K }[keyof T];
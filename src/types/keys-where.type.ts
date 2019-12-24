/**
 * @description
 * Keys of the object where the type is R
 *
 * Extrapolated from TS documentation
 *
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type KeysWhere<T, R> = { [K in keyof T]: T[K] extends R ? K : never }[keyof T];

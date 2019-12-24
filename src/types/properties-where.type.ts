import { KeysWhere } from './keys-where.type';

/**
 * @description
 * Properties of the object where the type is R
 *
 * Extrapolated from TS documentation
 *
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type PropertiesWhere<T, R> = Pick<T, KeysWhere<T, R>>;
import { KeysExceptWhere } from './keys-except-where.type';

/**
 * @description
 * Properties of the object, except those of type R
 *
 * Extrapolated from TS documentation
 *
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type PropertiesExceptWhere<T, R> = Pick<T, KeysExceptWhere<T, R>>;

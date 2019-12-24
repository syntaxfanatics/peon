/**
 * @description
 * Infer the inner type of a promise
 */
export type ThenArg<T> = T extends Promise<infer U> ? U : T;
import { RemoveNever } from './remove-never.type';

/**
 * @description
 * T without its keys K where T[K] is assignable to undefined
 */
export type OmitWhereUndefined<R, K extends keyof R> = Omit<R, K> & RemoveNever<{ [N in keyof Pick<R, K>]: R[N] extends undefined ? never : R[N] }>
import { RemoveNever } from './remove-never.type';

/**
 * @description
 * T without its keys K where T[K] is assignable to null
 *
 * @duplicate of without-null?
 * @TODO cleanup duplicates
 */
export type OmitWhereNull<R, K extends keyof R> = Omit<R, K> & RemoveNever<{ [N in keyof Pick<R, K>]: R[N] extends null ? never : R[N] }>

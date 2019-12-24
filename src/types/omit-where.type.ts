import { RemoveNever } from './remove-never.type';

/**
 * @description
 * T without its keys K where T[K] is assignable to V
 *
 * @note:
 *  For some reason V ? never : R[N] is not equivalent
 *  to NonNullable<R[N]> when V is null | undefined?
 *    ~ 2019-11-21
 *
 * @default possible duplicate of without?
 * @TODO clean up duplicates
 */
export type OmitWhere<R, K extends keyof R, V> = Omit<R, K> & RemoveNever<{ [N in keyof Pick<R, K>]: R[N] extends V ? never : R[N] }>
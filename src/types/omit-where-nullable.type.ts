import { RemoveNever } from './remove-never.type';

/**
 * @description
 * T without its keys K where T[K] is assignable to null or undefined
 */
export type OmitWhereNullable<R, K extends keyof R> = Omit<R, K> & RemoveNever<{ [N in keyof Pick<R, K>]: NonNullable<R[N]> }>
import { UnaryFn } from './unary-fn.type';

/**
 * @description
 * Return type of a unary function, given an argument
 */
export type UnaryFnReturn<F extends UnaryFn<A>, A = any> = F extends (inp: A) => infer R
  ? R
  : never;

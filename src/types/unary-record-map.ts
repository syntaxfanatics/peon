import { UnaryFnReturn } from './unary-fn-return.type';
import { UnaryFn } from './unary-fn.type';


/**
 * @description
 * Map an objects values via a unary projection function
 */
export type UnaryRecordMap<F extends UnaryFn, T> = {[K in keyof T]: UnaryFnReturn<F, T[K]>};
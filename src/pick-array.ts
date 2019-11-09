import { $TS_FIX_ME } from "./helper-types";

// TODO: find a better way to map the array T into the array R[T]
export interface PickArray {
  (): <R extends {}>(record: R) => [];
  <T1 extends string | number>(...extract: [T1]): <R extends Record<T1 , any>>(record: R) => [R[T1]];
  <T1 extends string | number, T2 extends string | number>(...extract: [T1, T2]): <R extends Record<T1 | T2 , any>>(record: R) => [R[T1], R[T2]];
  <T1 extends string | number, T2 extends string | number, T3 extends string | number>(...extract: [T1, T2, T3]): <R extends Record<T1 | T2 | T3 , any>>(record: R) => [R[T1], R[T2], R[T3]];
  <T1 extends string | number, T2 extends string | number, T3 extends string | number, T4 extends string | number>(...extract: [T1, T2, T3, T4]): <R extends Record<T1 | T2 | T3 | T4 , any>>(record: R) => [R[T1], R[T2], R[T3], R[T4]];
  <T1 extends string | number, T2 extends string | number, T3 extends string | number, T4 extends string | number, T5 extends string | number>(...extract: [T1, T2, T3, T4, T5]): <R extends Record<T1 | T2 | T3 | T4 | T5 , any>>(record: R) => [R[T1], R[T2], R[T3], R[T4], R[T5]];
  <T1 extends string | number, T2 extends string | number, T3 extends string | number, T4 extends string | number, T5 extends string | number, T6 extends string | number>(...extract: [T1, T2, T3, T4, T5, T6]): <R extends Record<T1 | T2 | T3 | T4 | T5 | T6 , any>>(record: R) => [R[T1], R[T2], R[T3], R[T4], R[T5], R[T6]];
  <T1 extends string | number, T2 extends string | number, T3 extends string | number, T4 extends string | number, T5 extends string | number, T6 extends string | number, T7 extends string | number>(...extract: [T1, T2, T3, T4, T5, T6, T7]): <R extends Record<T1 | T2 | T3 | T4 | T5 | T6 | T7 , any>>(record: R) => [R[T1], R[T2], R[T3], R[T4], R[T5], R[T6], R[T7]];
  <T1 extends string | number, T2 extends string | number, T3 extends string | number, T4 extends string | number, T5 extends string | number, T6 extends string | number, T7 extends string | number, T8 extends string | number>(...extract: [T1, T2, T3, T4, T5, T6, T7, T8]): <R extends Record<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, any>>(record: R) => [R[T1], R[T2], R[T3], R[T4], R[T5], R[T6], R[T7], R[T8]];
  <T1 extends string | number, T2 extends string | number, T3 extends string | number, T4 extends string | number, T5 extends string | number, T6 extends string | number, T7 extends string | number, T8 extends string | number, T9 extends string | number>(...extract: [T1, T2, T3, T4, T5, T6, T7, T8, T9]): <R extends Record<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9, any>>(record: R) => [R[T1], R[T2], R[T3], R[T4], R[T5], R[T6], R[T7], R[T8], R[T9]];
}


/**
 * Select keys to pick from an object
 * Return them in an array, in the order they were picked in
 * 
 * @param extract 
 */
export const pickArray: PickArray = (...extract: $TS_FIX_ME<any>) => {
  return function doPickArray(record: $TS_FIX_ME<any>) {
    const result = extract.map((ex: $TS_FIX_ME<any>) => record[ex]);
    return result;
  }
}
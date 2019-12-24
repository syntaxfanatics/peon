

/**
 * @description
 * A function that returns a Promise
 */
export interface LazyPromise<A> {
  (): Promise<A>;
}
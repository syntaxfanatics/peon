import { AnyFunc } from '../types/any-func.type';

type Cache<I, V> = { index: I; result: V  }[]
type FnCache<F extends AnyFunc> = Cache<Parameters<F>, ReturnType<F>>;

/**
 * @class
 * @name FnMemoMap
 */
class FnMemoMap<F extends AnyFunc> extends Function {
  fn: F;
  fnCache: FnCache<F> = [];

  constructor(fn: F) {
    super();
    this.fn = fn;
  }

  private find(args: Parameters<F>): undefined | FnCache<F>[0]  {
    return this
      .fnCache
      .find(instance =>
        args.length === instance.index.length
        && args.every((v, i) => v === instance.index[i])
      );
  }

  invokeFn = (...args: Parameters<F>): ReturnType<F> => {
    const match = this.find(args);
    if (match) return match.result;
    const newResult: ReturnType<F> = this.fn(...args);
    this.fnCache.push({ index: args, result: newResult });
    return newResult;
  }
}



/**
 * @description
 * Memoise the result of a function
 *
 * @param fn
 */
export function memoise<F extends AnyFunc>(fn: F): (...args: Parameters<F>) => ReturnType<F> {
  const memo = new FnMemoMap(fn);
  return memo.invokeFn;
}

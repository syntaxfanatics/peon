import { $TS_FIX_ME, AnyFunc } from './helper-types';


declare const setTimeout: (a: Function, time: number) => any;
declare const console: { error(...args: any[]): void }


/**
 * Retry an async function if it fails
 *
 * @param options
 */
export function retryEvery(options: { millisBetween: number; maxAttempts: number; log?: ('attempts' | 'errors')[] }) {
  const { millisBetween, maxAttempts, log } = options;

  return function takeAsyncFn<F extends AnyFunc>(tryMe: F) {
    let attempts = 0;

    return async function trigger<A extends Parameters<F>>(
      ...args: A
    ): Promise<F extends (...args: A) => infer R ? R : never> {
      // eslint-disable-next-line no-constant-condition
      while(true) {
        try { return await tryMe(...args)  }
        catch(error) {
          if (attempts >= maxAttempts) throw error
          if (log?.includes('errors')) console?.error?.(error);
        }
        attempts += 1;
        if (log?.includes('attempts')) console?.error?.(`Async Function "${tryMe.name || 'anonymous function'}" failed... Retrying (${attempts} of ${maxAttempts})`);
        await new Promise((res) => setTimeout(res, millisBetween));
      }
    }
  }
}

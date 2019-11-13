import { $TS_FIX_ME } from './helper-types';


declare const setTimeout: (a: Function, time: number) => any;
declare const console: { error(...args: any[]): void }


/**
 * Retry an async function if it fails
 *
 * @param options
 */
export function retryEvery(options: { millisBetween: number; maxAttempts: number }) {
  const { millisBetween, maxAttempts } = options;
  return function takeAsyncFn<F extends (...args: any[]) => Promise<any>>(tryMe: F) {
    let attempts = 0;
    return async function trigger(...args: Parameters<F>) {
      // eslint-disable-next-line no-constant-condition
      while(true) {
        try { return await tryMe(...args)  }
        catch(error) { if (attempts >= maxAttempts) throw error }
        attempts += 1;
        console?.error?.(`Async Function "${tryMe.name || 'anonymous function'}" failed... Retrying (${attempts} of ${maxAttempts})`);
        await new Promise((res) => setTimeout(res, millisBetween));
      }
    }
  }
}

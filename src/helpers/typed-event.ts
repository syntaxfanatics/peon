import { AnyFunc } from './helper-types';

// @see https://basarat.gitbooks.io/typescript/docs/tips/typed-event.html

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Listener<T> { (event: T): any }
interface Disposable { dispose: Function }

export type OnHandler<T> = { type: 0; func: Listener<T> }
export type OnceHandler<T> = { type: 1; func: Listener<T> };
export type Handler<T> = OnHandler<T> | OnceHandler<T>;



/**
 * @description
 * Is the handler to be fired every time?
 *
 * @param handler
 */
function isOn<T>(handler: Handler<T>): handler is OnHandler<T> {
  return handler.type === 0;
}



/**
 * @description
 * Is the handler to be fired only once?
 *
 * @param handler
 */
function isOnce<T>(handler: Handler<T>): handler is OnceHandler<T> {
  return !isOn(handler);
}


class TypedEventDestroyedAccessError extends Error {}



/**
 * @description
 * Typed, custom event emitter
 */
export class TypedEvent<T> {
  public handlers: Handler<T>[] = [];
  private _isDestroyed = false;

  public isDestroyed = () => this._isDestroyed;


  /**
   * Throw error if the wrapped function is invoked when this class is already destroyed
   *
   * @param fn
   */
  private onlyIfNotDestroyed = <F extends AnyFunc>(fn: F) => {
    const isDestroyedFn = this.isDestroyed;
    return function applyIfNotDestroyed(...args: Parameters<F>): ReturnType<F> {
      if (isDestroyedFn()) throw new TypedEventDestroyedAccessError();
      return fn(...args);
    }
    // return function applyIfNotDestroyed(this: TypedEvent<T>, ...args: Parameters<F>): ReturnType<F> {
    //   if (this.isDestroyed()) throw new TypedEventDestroyedAccessError();
    //   return fn(...args);
    // }
  }



  /**
   * @description
   * Return a function that unsubscribes the listener from the bound array
   */
  private getOff = (removeHandlers: Handler<T> | Handler<T>[]) => () => {
    this.handlers = this
      .handlers
      .filter(h => removeHandlers instanceof Array
        ? !removeHandlers.includes(h)
        : h !== removeHandlers);
  }



  /**
   * @description
   * Listen to event emissions
   */
  public on = this.onlyIfNotDestroyed((listener: Listener<T>): Disposable => {
    const onHandler: OnHandler<T>  = { type: 0, func: listener };
    this.handlers.push(onHandler);
    return { dispose: () => this.getOff(onHandler) };
  })



  /**
   * @description
   * Listen to only a single event emission
   */
  public once = this.onlyIfNotDestroyed((listener: Listener<T>): Disposable => {
    const onceHandler: OnceHandler<T>  = { type: 1, func: listener };
    this.handlers.push(onceHandler);
    return { dispose: () => this.getOff(onceHandler) };
  })



  /**
   * @description
   * Emit an event
   * Fire listeners
   */
  public emit = this.onlyIfNotDestroyed((event: T) => {
    const oldHandlers = this.handlers.slice();
    this.handlers = this.handlers.filter(h => h.type === 0);
    oldHandlers.forEach(({ func }) => func(event));
  })



  /**
   * @description
   * Pipe events through to another emitter
   */
  public pipe = this.onlyIfNotDestroyed((te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e));
  })


  /**
   * @description
   * Push an array of handlers onto the handler stack
   */
  public bindHandlers = this.onlyIfNotDestroyed((handlers: Handler<T>[]) => handlers
    .map(handler => isOnce(handler)
      ? this.once(handler.func)
      : this.on(handler.func))
  )



  /**
   * @description
   * Remove all event handlers
   */
  public destroy = this.onlyIfNotDestroyed(() => {
    this.handlers = [];
    this._isDestroyed = true;
  })
}


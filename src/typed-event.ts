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

/**
 * @description
 * Typed, custom event emitter
 */
export class TypedEvent<T> {
  public handlers: Handler<T>[] = [];

  /**
   * @description
   * Return a function that unubscribes the listener from the bound array
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
  on = (listener: Listener<T>): Disposable => {
    const onHandler: OnHandler<T>  = { type: 0, func: listener };
    this.handlers.push(onHandler);
    return { dispose: () => this.getOff(onHandler) };
  }

  /**
   * @description
   * Listen to only a single event emission
   */
  once = (listener: Listener<T>): Disposable => {
    const onceHandler: OnceHandler<T>  = { type: 1, func: listener };
    this.handlers.push(onceHandler);
    return { dispose: () => this.getOff(onceHandler) };
  }

  /**
   * @description
   * Emit an event
   * Fire listeners
   */
  emit = (event: T) => {
    const oldHandlers = this.handlers.slice();
    this.handlers = this.handlers.filter(h => h.type === 0);
    oldHandlers.forEach(({ func }) => func(event));
  }

  /**
   * @description
   * Pipe events through to another emitter
   */
  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e));
  }

  /**
   * @description
   * Push an array of handlers onto the handler stack
   */
  bindHandlers = (handlers: Handler<T>[]) => {
    return handlers
      .map(handler => isOnce(handler)
        ? this.once(handler.func)
        : this.on(handler.func));
  }

  /**
   * @description
   * Remove all event handlers
   */
  destroy = () => {
    this.handlers = [];
  }
}


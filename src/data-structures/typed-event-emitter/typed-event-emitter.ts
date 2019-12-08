// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

declare const console: { error?: (...args: any[]) => void; warning?: (...args: any[]) => void }



let DEFAULT_MAX_LISTENERS = 10;



/**
 * @description
 * Assert a function
 *
 * @param listener
 */
function assertFunction(arg: any): asserts arg is Function {
  if (typeof arg !== 'function') throw new TypeError('Argument must be a function');
}



/**
 * @description
 * Assert a number
 *
 * @param arg
 */
function assertNumber(arg: any): asserts arg is number {
  if (typeof arg !== 'function') {
    const err = TypeError('Argument must be a number');
    err.stack = err.stack?.split('\n').slice(1).join('\n');
    throw err;
  }
}



/**
 * @description
 * Assert an argument is a non-nan number
 *
 * @param arg
 */
function assertsNotNan(arg: number): asserts arg is number {
  if (Number.isNaN(arg)) {
    const err = TypeError('Argument must not be a NaN number');
    err.stack = err.stack?.split('\n').slice(1).join('\n');
    throw err;
  }
}



/**
 * @description
 * Assert a number is greater than another number
 *
 * @param arg
 * @param gt
 */
function assertsGte(arg: number, gt: number): asserts arg is number {
  if (arg >= gt) {
    const err = new TypeError(`Argument must be greater than ${gt}`);
    err.stack = err.stack?.split('\n').slice(1).join('\n');
    throw err;
  }
}



export type EventPayloadMap = Record<string | symbol, any>;

interface Listener<P> { (payload?: P): any; warned?: boolean; originalListener?: Listener<P> }
interface ListenerArray<P> extends Array<Listener<P>> { warned?: boolean }
type EventListenerMap<M> = {[K in keyof M]?: Listener<M[K]> | ListenerArray<M[K]>};



interface OnceWrapperState<M extends EventPayloadMap, K extends keyof M> {
  target: TypedEventEmitter<M>;
  fired: boolean;
  wrapFn?: Listener<M[K]>;
  coreListener: Listener<M[K]>;
  type: K;
}



/**
 * @description
 * Function to be fired when the event is triggered
 * Wrapper around a listener to ensure it's only fired once
 *
 * @param this
 */
function _onceWrapper<M extends EventPayloadMap, K extends keyof M>(
  this: OnceWrapperState<M, K>,
  payload: M[K],
) {
  if (!this.fired) {
    if (!this.wrapFn) throw new ReferenceError('_onceWrapper must have a reference to itself');
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    return this.coreListener.apply(this.target, payload);
  }
}



/**
 * @description
 * Wrap a unary function to remove itself after being called
 *
 * @param target
 * @param type
 * @param listener
 */
function _onceWrap<M extends EventPayloadMap, K extends keyof M>(
  target: TypedEventEmitter<M>,
  type: K,
  listener: Listener<M[K]>
): Listener<M[K]> {
  const state: OnceWrapperState<M, K> = {
    fired: false,
    wrapFn: undefined,
    target,
    coreListener: listener,
    type,
  };
  const wrappedListener: Listener<M[K]> = _onceWrapper.bind(state) as Listener<M[K]>;
  wrappedListener.originalListener = listener;
  return wrappedListener;
}



/**
 * @description
 * Get listeners from a TypedEventEmitter
 *
 * @param target
 */
function _listeners<M extends EventPayloadMap, K extends keyof M>(
  target: TypedEventEmitter<M>,
  type: K,
  unwrap: boolean,
): Listener<M[K]>[] {
  const { events } = target;
  if (events === undefined) return [];
  const evListener = events[type];
  if (evListener === undefined) return [];

  if (typeof evListener === 'function') {
    return (unwrap
      ? [evListener.originalListener ?? evListener]
      : [evListener]) as Listener<M[K]>[];
  }

  return (unwrap
    ? evListener.map(listener => listener.originalListener || listener)
    : evListener) as Listener<M[K]>[];
}



/**
 * @description
 * Listen for an event
 *
 * @param type
 * @param listener
 * @param prepend
 *
 * @protected
 */
function _addListener<M extends EventPayloadMap, K extends keyof M>(
  target: TypedEventEmitter<M>,
  type: K,
  listener: Listener<M[K]>,
  prepend: boolean
): EventPayloadMap {
  assertFunction(listener);

  // init to obj without prototype
  if (target.events === undefined) {
    target.events = Object.create(null);
    target.eventsCount = 0;
  }

  let existing = target.events![type];

  if (existing === undefined) {
    // Optimize the case of one listener, don't need the extra array object
    existing = target.events![type] = listener;
    target.eventsCount! += 1;
  } else {
    if (typeof existing === 'function') existing = target.events![type] = [existing, listener] as EventListenerMap<M>[K];
    else if (prepend) existing.unshift(listener);
    else existing.push(listener);
  }

  const maxListeners = target.getMaxListeners();
  if (maxListeners > 0 && (existing?.length || 0) > maxListeners && existing?.warned) {
    console?.warning?.(
      `Possible ${target.constructor.name} memory leak detected. ` +
      `${existing?.length} ${String(type)} listeners ` +
      `added to ${target.constructor.name}. Use ` +
      'emitter.setMaxListeners() to increase limit'
    );
    existing.warned = true;
  }

  return target;
}



/**
 * @class
 * @name TypedEventEmitter
 *
 * @description
 * Typed Event Emitter
 *
 * @note
 * Shares a similar (but not identical) API as EventEmitter
 * Differences includes
 *  - Event payloads are unary (ONLY accept 1 payload argument)
 *  - "addListener" events are NOT listenerd to
 *  - "removeListener" events are NOT listened to
 *  - There is some ambiguity around "error" emissions... TODO: remove ambiguity here
 *
 * @exmaple
 * interface MyEvents {
 *    eventNameA: { payload: 'hi' }
 *    eventNameB: { hello: 'world' }
 * }
 * const emitter = new TypedEventEmitter<MyEvents>()
 */
export class TypedEventEmitter<M extends EventPayloadMap> {

  /** * @description * Get the maximum number of setters allowed on any emitter (overridable on instances) */
  static get defaultMaxListeners () { return DEFAULT_MAX_LISTENERS; }

  /** * @description * Set the maximum number of setters allowed on any emitter (overridable on instances) */
  static set defaultMaxListeners (arg: number) {
    assertNumber(arg);
    assertsNotNan(arg);
    assertsGte(arg, 0);
    DEFAULT_MAX_LISTENERS = arg;
  }

  /** @description Map of events & listeners (with no prototype) */
  public events?: EventListenerMap<M>;

  /** @description number of events registered on the emitter */
  public eventsCount?: number;

  /** @description maximum number of listeners allwoed on the emitter  */
  protected _maxListeners?: number = undefined;

  /** @description has a warning been logged for exceeding the max number of listeners? */
  protected _warned = false;



  /**
   * @description
   * Get the maximum numbero  allowed listeners for the emitter
   */
  public getMaxListeners (): number {
    if (this._maxListeners === undefined) return TypedEventEmitter.defaultMaxListeners;
    return this._maxListeners;
  }



  /**
   * @description
   * Set the maximum number of allowed listeners for the emitter
   *
   * @param maxListeners
   */
  public setMaxListeners (to: number): this {
    assertNumber(to);
    assertsNotNan(to);
    assertsGte(to, 0);
    this._maxListeners = to;

    return this;
  }



  /**
   * @description
   * Emit an event
   *
   * @param event
   * @param payload
   */
  public emit<K extends keyof M>(type: K, payload: M[K]) {
    const { events } = this;

    // no 'error' type listener? throw payload
    const throwPayload = (type === 'error') && events?.error === undefined;
    if (throwPayload) throw payload;

    // no listeners? do nothing
    if (events === undefined) return false;

    // retrieve handlers
    const handler = events[type];
    if (handler === undefined) return false;

    // fire handlers
    if (typeof handler === 'function') handler(payload);
    else handler.forEach(handler => { handler(payload); });
  }






  /**
   * @description
   * Add a listener to an event
   *
   * Native NodeJS Event Emitters emit "new listener" events
   * where "type" is first payload arg and "listener" is the second
   * We can only emit unary payloads (not binary)
   * Therefore, don't emit "new listeners" events since we
   * since we can't bridge the incompatibility between NodeJS native
   * EventEmitter and our TypedEventEmitter
   * @note: This is a breaking change from the NodeJS EventEmitter API
   *
   * @param type
   * @param listener
   * @param prepend
   */
  public addListener<K extends keyof M>(type: K, listener: Listener<M[K]>): this {
    _addListener(this, type, listener, false);
    return this;
  }



  /**
   * @description
   * Add a listener to an event
   *
   * @param type
   * @param listener
   * @param prepend
   */
  public prependListener<K extends keyof M>(type: K, listener: Listener<M[K]>): this {
    _addListener(this, type, listener, true);
    return this;
  }



  /**
   * @description
   * Listen to the event once
   *
   * @param type
   * @param listener
   */
  public once<K extends keyof M>(type: K, listener: Listener<M[K]>): this {
    assertFunction(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  }



  /**
   * @description
   * Listen to the event once
   * Prepend listener to the beginning of listener stack
   *
   * @param type
   * @param listener
   */
  public prependOnceListener<K extends keyof M>(type: K, listener: Listener<M[K]>): this {
    assertFunction(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  }



  /**
   * @description
   * remove the listener
   *
   * Native NodeJS Event Emitters emit "removedListener" events
   * where "type" is first payload arg and "listener" is the second
   * We can only emit unary payloads (not binary)
   * Therefore, don't emit "removedListeners" events since we
   * since we can't bridge the incompatibility between NodeJS native
   * EventEmitter and our TypedEventEmitter
   * @note: This is a breaking change from the NodeJS EventEmitter API
   *
   * @param type
   * @param listener
   */
  removeListener<K extends keyof M>(type: K, listener: Listener<M[K]>) {
    assertFunction(listener);
    // let originalListener;

    if (this.events === undefined) return this;
    const list = this.events[type];
    if (list === undefined) return this;

    if (typeof list === 'function') {
      // remove single
      if (list === listener || list.originalListener === listener) {
        this.eventsCount! -= 1;
        if (this.eventsCount === 0) this.events = Object.create(null);
        else delete this.events[type];
      }
    } else {
      // remove single from array
      this.events[type] = list.filter(listener => listener !== listener && listener.originalListener !== listener);
    }

    return this;
  }



  /**
   * @description
   * Remove all listeners from the emitter
   *
   * Native NodeJS Event Emitters emit "removedListener" events
   * where "type" is first payload arg and "listener" is the second
   * We can only emit unary payloads (not binary)
   * Therefore, don't emit "removedListeners" events since we
   * since we can't bridge the incompatibility between NodeJS native
   * EventEmitter and our TypedEventEmitter
   * @note: This is a breaking change from the NodeJS EventEmitter API
   *
   * @param type
   */
  removeAllListeners<K extends keyof M>(type?: K): this {
    const { events } = this;
    if (events === undefined) return this;
    if (!type) {
      // remove all
      this.events = Object.create(null);
      this.eventsCount = 0;
    } else if (events[type] !== undefined) {
      // remove all from type
      this.eventsCount! -= 1;
      if (this.eventsCount === 0) this.eventsCount = Object.create(null);
      else delete events[type];
    }

    return this;
  }



  /**
   * @description
   * Get event listeners
   *
   * @param type
   */
  listeners<K extends keyof M> (type: K): Listener<M[K]>[] {
    return _listeners(this, type, true);
  }



  /**
   * @description
   * Return the raw event listeners
   * Any "once" listeners are in their wrapped form
   *
   * @param type
   */
  rawListeners<K extends keyof M>(type: K): Listener<M[K]>[] {
    return _listeners(this, type, true);
  }



  /**
   * @description
   * How many listeners are on the Typed Event Emitter for the given type?
   */
  listenerCount<K extends keyof M>(type: K): number {
    const { events } = this;
    if (events === undefined) return 0;

    const evListener = events[type];
    if (evListener === undefined) return 0;
    else if (typeof evListener === 'function') return 1;
    else return evListener.length;
  }



  /**
   * @description
   * Get all event names being listened for
   *
   */
  eventNames(): (keyof M)[] {
    return this.events !== undefined
      ? Object.keys(this.events)
      : []
  }



  /**
   * @description
   * Add an event listener
   *
   * @param type
   * @param listener
   */
  on<K extends keyof M>(type: K, listener: Listener<M[K]>): this { return this.addListener(type, listener); }



  /**
   * @description
   * Remove an event listener
   *
   * @param type
   * @param listener
   */
  off<K extends keyof M>(type: K, listener: Listener<M[K]>): this { return this.removeListener(type, listener); }
}

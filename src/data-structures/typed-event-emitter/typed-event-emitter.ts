import { EventEmitter } from 'events'

interface Listener<P> {
  (payload: P): any;
}

type SE = string | symbol;

/**
 * @description
 * Typed Event Emitter
 *
 * Shares the same API as EventEmitter
 *
 * Use it like this
 * interface MyEvents {
 *    eventNameA: { payload: 'hi' }
 *    eventNameB: { hello: 'world' }
 * }
 */
export class TypedEventEmitter<P extends Record<string | symbol, any>> extends EventEmitter {
  /** @inheritdoc */
  addListener<K extends keyof P>(event: K, listener: Listener<P[K]>) { return super.addListener(event as SE, listener); }

  /** @inheritdoc */
  on<K extends keyof P>(event: K, listener: Listener<P[K]>) { return super.on(event as SE, listener); }

  /** @inheritdoc */
  once<K extends keyof P>(event: K, listener: Listener<P[K]>) { return super.once(event as SE, listener); }

  /** @inheritdoc */
  prependListener<K extends keyof P>(event: K, listener: Listener<P[K]>) { return super.prependListener(event as SE, listener); }

  /** @inheritdoc */
  prependOnceListener<K extends keyof P>(event: K, listener: Listener<P[K]>) { return super.prependOnceListener(event as SE, listener); }

  /** @inheritdoc */
  off<K extends keyof P>(event: K, listener: Listener<P[K]>) { return super.off(event as SE, listener); }

  /** @inheritdoc */
  removeAllListeners<K extends keyof P>(event?: K) { return super.removeAllListeners(event as SE); }

  /** @inheritdoc */
  removeListener<K extends keyof P>(event: K, listener: Listener<P[K]>) { return super.removeListener(event as SE, listener); }

  /** @inheritdoc */
  emit<K extends keyof P>(event: K, payload: P[K]) { return super.emit(event as SE, payload); }

  /** @inheritdoc */
  eventNames(): (string | symbol)[] { return this.eventNames() }

  /** @inheritdoc */
  listeners<K extends keyof P> (event: K): Function[] { return super.listeners(event as SE); }

  /** @inheritdoc */
  listenerCount<K extends keyof P> (event: K): number { return super.listenerCount(event as SE);  }

  /** @inheritdoc */
  getMaxListeners (): number { return super.getMaxListeners() }

  /** @inheritdoc */
  setMaxListeners (maxListeners: number): this { return super.setMaxListeners(maxListeners); }
}


/**
 * @description
 * Immutable, augmented version of the es6 Set class
 * es6 Set's mutable methods new sets instead of mutating
 */
export class ImmutableSet<T> implements Iterable<T> {
  protected readonly inner: Set<T>;



  /**
   * @description
   * Get the inner set
   */
  public valueOf(): Set<T> {
    return this.inner;
  }



  /**
   * @constructor
   *
   * @param values
   */
  public constructor(...values: (Iterable<T> | null | undefined)[]) {
    this.inner = new Set();
    values
      // no null or undefined
      .filter(iterable => iterable != null)
      .forEach(iterable => {
        Array.from(iterable!).forEach(iterableItem => {
          this.inner.add(iterableItem);
        });
      });
  }



  /**
   * @description
   * Get the size of the set
   */
  public get size() {
    return this.inner.size;
  }



  /**
   * @description
   * Get an iterator of the underlying set elements
   */
  * [Symbol.iterator]() {
    // yield to the internal set iterator
    yield * this.inner;
  }



  /**
   * @description
   * Does the set have the value?
   *
   * @param value
   */
  public has(value: T) {
    return this.inner.has(value);
  }



  /**
   * @description
   * (immutable) Add items onto the set
   *
   * @param items
   */
  public add(...items: T[]): ImmutableSet<T> {
    const newImmutableSet = new ImmutableSet<T>(Array.from(this.inner).concat(items));
    return newImmutableSet;
  }



  /**
   * @description
   * Get the nth element of the set
   *
   * @note: will not always return T
   */
  public nth (n: number): T {
    return Array.from(this.inner)[n];
  }



  /**
   * @description
   * (immutable) Merge iterables onto the set
   *
   * @param iterables
   */
  public concat(...iterables: Iterable<T>[]): ImmutableSet<T> {
    const newValue = Array.from(this.inner);
    iterables.forEach(iterable => newValue.push(...Array.from(iterable)));
    const newImmutableSet = new ImmutableSet<T>(newValue);
    return newImmutableSet;
  }



  /**
   * @description
   * (immutable) Delete items from the set
   *
   * @param items
   */
  public delete(...items: T[]): ImmutableSet<T> {
    const newSet = new Set(this.inner);
    items.forEach(item => newSet.delete(item));
    const newImmutableSet = new ImmutableSet(newSet);
    return newImmutableSet;
  }



  /**
   * @description
   * Returns an iterable of [v,v] pairs for every value `v` in the set.
   */
  public entries(): IterableIterator<[T, T]> {
    return this.inner.entries();
  }



  /**
   * @description
   * Despite its name, returns an iterable of the values in the set,
   */
  public keys(): IterableIterator<T> {
    return this.inner.keys();
  }



  /**
   * @description
   * Returns an iterable of values in the set.
   */
  public values(): IterableIterator<T> {
    return this.inner.values();
  }



  /**
   * @description
   * Apply a function to each set element
   *
   * @param fn
   */
  public forEach(fn: (arg: T) => any): void {
    this.inner.forEach(fn);
  }



  /**
   * @description
   * Project the set into a new set
   *
   * @param projection
   */
  public map<R>(projection: (arg: T) => R): ImmutableSet<R> {
    const newSet = new Set<R>();
    this.forEach(item => { newSet.add(projection(item)); });
    return new ImmutableSet(newSet);
  }



  /**
   * @description
   * Filter the set into a new set
   *
   * @param predicate
   */
  public filter(predicate: (arg: T) => boolean): ImmutableSet<T> {
    const newSet = new Set<T>();
    this.forEach(item => { if (predicate(item)) newSet.add(item); });
    return new ImmutableSet(newSet);
  }
}

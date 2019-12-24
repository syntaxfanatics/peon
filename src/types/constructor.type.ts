
// stolen from protobufjs :)

/** Constructor type. */
export interface Constructor<T> extends Function {
  new(...params: any[]): T;
  prototype: T;
}
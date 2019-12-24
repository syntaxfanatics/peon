/**
 * @description
 * Use a provided tuple if possible, otherwise infer a tuple (sloppy)
 */
type ArrTo2Tuple<I> =
  I extends [infer A, infer B][]              // good - infer mutable tuple
    ? [A, B]
    : I extends readonly [infer A, infer B]   // good - infer immutable tuple
      ? [A, B]
      : I extends (infer A)[]                 // bad - infer mutable array
        ? [A, A]
        : I extends readonly (infer A)[]      // bad - infer immutable array
          ? [A, A]
          : never;                            // hopeless - nothing
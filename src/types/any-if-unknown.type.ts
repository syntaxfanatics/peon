
/**
 * @description
 * If the type is assignable to unknown, assign it to any instead
 */
export type AnyIfUnknown<T> = T extends unknown ? any : T;

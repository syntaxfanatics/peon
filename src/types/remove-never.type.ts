
/**
 * @description
 * Filter never types off an object
 */
export type RemoveNever<T> = Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>

/**
 * @description
 * Make optional the chosen keys of an object
 */
export type MakeOptional<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>
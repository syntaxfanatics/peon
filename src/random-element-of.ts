/**
 * @description
 * Get a random element from an array
 *
 * @param input
 */
export const randomElementOf = <T>(input: T[]): T => input[Math.floor(input.length * Math.random())];

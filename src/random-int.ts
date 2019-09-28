/**
 * @description
 * Get a random integer between a max and min
 *
 * @param min
 * @param max
 */
export const randomInt = (
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) => min + 1 + Math.floor((max - min) * Math.random());


/**
 * @description
 * Get an element of a tuple
 *
 * @note: ternary for const and non-cost tuples
 *
 * @example
 * const dinnerOptions = ['pizza', 'cereal', 'endangered species'] as const;
 * type DINNER_OPTIONS = AnElementOf<dinnerOptions>; // 'pizza' | 'cereal' | 'endangered species'
 */
export type AnElementOf<T> = T extends readonly (infer IE)[] ? IE : (T extends (infer ME)[] ? ME : T);

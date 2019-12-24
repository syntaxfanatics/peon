declare const console: { warn(...args: any[]): void }

/**
 * @description
 * A deprecation warning
 *
 * @param name
 */
export function deprecated(name: string) {
  console?.warn(`[@syntaxfanatics::peon] "${name}" is deprecated`);
}
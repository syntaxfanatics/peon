declare const console: { log(...args: any[]): void }

/**
 * @description
 * A deprecation warning
 *
 * @param name
 */
export function log(...say: any[]) {
  console?.log('[@syntaxfanatics::INTERNAL_LOG]', ...say);
}

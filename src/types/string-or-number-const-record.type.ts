
/**
 * @description
 * Object defining a static set of allowable values for some entity
 * Less restrictive than StringConstObject and NumberConstObject
 */
export type StringOrNumberConstRecord = Readonly<Record<string, string | number>>;
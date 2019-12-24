/**
 * @description
 * Record with of property keys but with any values
 */
export type AnyReadonlyableRecord = Record<PropertyKey, any> | { readonly [P in PropertyKey]: any; };
// export type AnyReadonlyableRecord = Record<PropertyKey, any> | Readonly<Record<PropertyKey, any>>

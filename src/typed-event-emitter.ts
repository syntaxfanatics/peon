// TODO: get this working

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { EventEmitter } from 'events';
// import { $TS_FIX_ME } from './helper-types';

// type TypedPayloadMap = Record<string | number, any>;
// type StringNumberKey<T> = Extract<keyof T, string | number>

// /**
//  * @class
//  * @name TypedEventEmitter
//  *
//  * @description
//  * Provides typing for an event emitters events and payloads
//  *
//  * @example
//  * const emitter = new TypedEventEmitter<{
//  *  eventOne: { payloadA: string, payloadB: number },
//  *  eventTwo: { payloadC: boolean, payloadC: Record<string, boolean> },
//  * }>();
//  *
//  */
// type TypedEventEmitterInterface<PayloadMap extends TypedPayloadMap> = {
//   once: <K extends StringNumberKey<PayloadMap>>(type: K, listener: (payload: PayloadMap[K]) => any) => EventEmitter['once']
//   on: <K extends StringNumberKey<PayloadMap>>(type: K, listener: (payload: PayloadMap[K]) => any) => EventEmitter['on']
//   addListener: <K extends StringNumberKey<PayloadMap>>(type: K, listener: (payload: PayloadMap[K]) => any) => EventEmitter['addListener']
//   emit: <K extends StringNumberKey<PayloadMap>>(type: K, payload: PayloadMap[K]) => EventEmitter['emit']
// }

// // TODO: fix this so it doesn't have to be ts-ignored
// export class TypedEventEmitter<T extends TypedPayloadMap> extends EventEmitter implements $TS_FIX_ME<TypedEventEmitterInterface<T>> {};

// const emitter = new TypedEventEmitter<{ hello: 'world' }>();

// emitter.emit('hello');


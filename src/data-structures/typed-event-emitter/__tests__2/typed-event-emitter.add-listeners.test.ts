// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';
// const common = require('../common');
// const assert = require('assert');
// const EventEmitter = require('events');

import { TypedEventEmitter } from '../typed-event-emitter';

const TEST_EVENT = {
  FIRST: 'first',
  SECOND: 'second',
  THIRD: 'third',
} as const;
type TEST_EVENT = typeof TEST_EVENT;
type A_TEST_EVENT = TEST_EVENT[keyof TEST_EVENT];

interface TestPayloadMap {
  [TEST_EVENT.FIRST]: { thisIs: 'the first event' };
  [TEST_EVENT.SECOND]: { andThisOneIs: 2 };
  [TEST_EVENT.THIRD]: true;
}

const firstPayload: TestPayloadMap[TEST_EVENT['FIRST']] = { thisIs: 'the first event' };
const secondPayload: TestPayloadMap[TEST_EVENT['SECOND']] = { andThisOneIs: 2 };

function setUp() {
  const tee = new TypedEventEmitter<TestPayloadMap>();
  return { tee };
}


/**
 * Tests
 */
describe('Typed Event Emitter', () => {

  it('Should add new listeners', () => {
    const { tee } = setUp();

    const emittedPayloads: any[] = [];

    function firstHandler(payload: TestPayloadMap[TEST_EVENT['FIRST']]) { emittedPayloads.push(payload); }
    function secondHandler(payload: TestPayloadMap[TEST_EVENT['SECOND']]) { emittedPayloads.push(payload); }
    function thirdHandler(payload: TestPayloadMap[TEST_EVENT['THIRD']]) { emittedPayloads.push(payload); }

    expect(firstHandler).toBeCalled();
    expect(secondHandler).toBeCalled();
    expect(thirdHandler).not.toBeCalled();

    tee.addListener(TEST_EVENT.FIRST, firstHandler);
    tee.addListener(TEST_EVENT.SECOND, secondHandler);

    tee.emit(TEST_EVENT.FIRST, firstPayload);
    tee.emit(TEST_EVENT.SECOND, secondPayload);

    expect(emittedPayloads).toStrictEqual([firstPayload, secondPayload]);
  });

  it('To require functions as listeners', () => {
    const { tee } = setUp();

    expect(() => tee.emit(TEST_EVENT.FIRST, 'any' as any)).toThrowError();
    expect(() => tee.emit(TEST_EVENT.FIRST, { thisIs: firstPayload + '_' as any })).toThrowError();
    expect(() => tee.emit(TEST_EVENT.SECOND, { andThisOneIs: 2 })).toThrowError();
  });
});

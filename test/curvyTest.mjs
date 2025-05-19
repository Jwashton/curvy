import test from 'node:test';
import assert from 'node:assert';

import { A, B, C, D } from '../src/curvy.mjs';

const assertWithin = function assertWithin(
  testValue,
  goalValue,
  tolerance = 0.000000001) {
  const difference = Math.abs(goalValue - testValue);

  assert(difference < tolerance,
    `${testValue} was not within ${tolerance} of ${goalValue}`);
};

test('A for 0', (t) => {
  assert.strictEqual(A(0), 1);
});

test('A for 1', (t) => {
  assert.strictEqual(A(1), 0);
});

test('A for 0.25', (t) => {
  assertWithin(A(0.25), 0.421875);
});

test('B for 0', (t) => {
  assert.strictEqual(B(0), 0);
});

test('B for 1', (t) => {
  assert.strictEqual(B(1), 0);
});

test('B for 1/3rd', (t) => {
  assertWithin(B(1.0 / 3.0), 4.0 / 9.0);
});

test('C for 0', (t) => {
  assert.strictEqual(C(0), 0);
});

test('C for 1', (t) => {
  assert.strictEqual(C(1), 0);
});

test('C for 1/3rd', (t) => {
  assertWithin(C(1.0 / 3.0), 2.0 / 9.0);
});

test('D for 0', (t) => {
  assert.strictEqual(D(0), 0);
});

test('D for 1', (t) => {
  assert.strictEqual(D(1.0), 1);
});

test('D for 1', (t) => {
  assertWithin(D(1.0 / 3.0), 1.0 / 27.0);
});
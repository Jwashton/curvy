import test from 'node:test';
import assert from 'node:assert';

import { A, B, C, D, g, findC1, findC2 } from '../src/curvy.mjs';

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

test('D for 1/3rd', (t) => {
  assertWithin(D(1.0 / 3.0), 1.0 / 27.0);
});

test('g for a simple curve, at t=0', (t) => {
  assertWithin(g(0.0, 1.0, 2.0, 3.0, 0.0), 0.0);
});

test('g for a simple curve, at t=1', (t) => {
  assertWithin(g(0.0, 1.0, 2.0, 3.0, 1.0), 3.0);
});

test('g for a simple curve, at t=1/3', (t) => {
  assertWithin(g(0.0, 1.0, 2.0, 3.0, 1.0 / 3.0), 1.0);
});

test('g for a simple curve, at t=2/3', (t) => {
  assertWithin(g(0.0, 1.0, 2.0, 3.0, 2.0 / 3.0), 2.0);
});

test('finding c_1 for two points on a curve', (t) => {
  const s = 3.5;
  // We'll calculate two g values, and then use those
  // calculated g values to show we can get this c_1
  // value back.
  const c_1 = 2.6;
  const c_2 = 6.2;
  const e = 10.0;
  
  const t_1 = 0.2;
  const g_1 = g(s, c_1, c_2, e, t_1);
  const t_2 = 0.7;
  const g_2 = g(s, c_1, c_2, e, t_2);

  assertWithin(findC1(s, e, g_1, g_2, t_1, t_2), c_1);
});

test('finding c_2 for two points on a curve', (t) => {
  const s = 3.5;
  // We'll calculate two g values, and then use those
  // calculated g values to show we can get this c_1
  // value back.
  const c_1 = 2.6;
  const c_2 = 6.2;
  const e = 10.0;
  
  const t_1 = 0.2;
  const g_1 = g(s, c_1, c_2, e, t_1);
  const t_2 = 0.7;
  const g_2 = g(s, c_1, c_2, e, t_2);

  assertWithin(findC2(s, e, g_2, t_2, c_1), c_2);
});
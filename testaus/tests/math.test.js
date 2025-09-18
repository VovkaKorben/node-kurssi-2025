import { expect, test } from 'vitest'
import { sum } from '../src/math.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('0 + 5 = 5', () => {
  expect(sum(0, 5)).toBe(5)
})

test('222 + 111 = 333', () => {
  expect(sum(222, 111)).toBe(333)
})
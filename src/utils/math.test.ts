import { describe, it, expect } from 'vitest';
import { add } from '../utils/math';

describe('Math utilities', () => {
  it('should add two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
});
import { describe, expect, it } from 'vitest';

import {
  createCommentSchema,
  updateCommentSchema,
} from '../../../src/schemas/commentSchemas';

describe('createCommentSchema', () => {
  it('should accept valid comment content', () => {
    const result = createCommentSchema.safeParse({
      content: 'This creature appears to hunt at night.',
    });

    expect(result.success).toBe(true);
  });

  it('should trim comment content', () => {
    const result = createCommentSchema.safeParse({
      content: '  Useful observation  ',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.content).toBe('Useful observation');
    }
  });

  it('should reject empty content', () => {
    const result = createCommentSchema.safeParse({
      content: '',
    });

    expect(result.success).toBe(false);
  });

  it('should reject whitespace-only content', () => {
    const result = createCommentSchema.safeParse({
      content: '     ',
    });

    expect(result.success).toBe(false);
  });

  it('should reject content longer than 1000 characters', () => {
    const result = createCommentSchema.safeParse({
      content: 'a'.repeat(1001),
    });

    expect(result.success).toBe(false);
  });

  it('should accept content with exactly 1000 characters', () => {
    const result = createCommentSchema.safeParse({
      content: 'a'.repeat(1000),
    });

    expect(result.success).toBe(true);
  });
});

describe('updateCommentSchema', () => {
  it('should accept valid updated content', () => {
    const result = updateCommentSchema.safeParse({
      content: 'Updated field observation.',
    });

    expect(result.success).toBe(true);
  });

  it('should reject empty updated content', () => {
    const result = updateCommentSchema.safeParse({
      content: '',
    });

    expect(result.success).toBe(false);
  });

  it('should reject updated content longer than 1000 characters', () => {
    const result = updateCommentSchema.safeParse({
      content: 'a'.repeat(1001),
    });

    expect(result.success).toBe(false);
  });
});

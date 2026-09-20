import { describe, expect, it } from 'vitest';

import { listCreaturesQuerySchema } from '../../../src/schemas/creatureSchemas';

describe('listCreaturesQuerySchema', () => {
  it('should accept an empty query', () => {
    const result = listCreaturesQuerySchema.safeParse({});

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual({
        page: 1,
        limit: 12,
      });
    }
  });

  it('should accept valid search and threat level', () => {
    const result = listCreaturesQuerySchema.safeParse({
      search: 'wyrm',
      threatLevel: 'HIGH',
      page: '2',
      limit: '6',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual({
        search: 'wyrm',
        threatLevel: 'HIGH',
        page: 2,
        limit: 6,
      });
    }
  });

  it('should coerce page and limit to numbers', () => {
    const result = listCreaturesQuerySchema.safeParse({
      page: '3',
      limit: '20',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.page).toBe(3);
      expect(result.data.limit).toBe(20);
    }
  });

  it('should reject an invalid threat level', () => {
    const result = listCreaturesQuerySchema.safeParse({
      threatLevel: 'CATASTROPHIC',
    });

    expect(result.success).toBe(false);
  });

  it('should reject page lower than 1', () => {
    const result = listCreaturesQuerySchema.safeParse({
      page: '0',
    });

    expect(result.success).toBe(false);
  });

  it('should reject limit greater than 50', () => {
    const result = listCreaturesQuerySchema.safeParse({
      limit: '100',
    });

    expect(result.success).toBe(false);
  });
});

import { z } from 'zod';

export const createCreatureSchema = z.object({
  name: z.string().trim().min(1).max(100),

  scientificName: z.string().trim().max(150).nullable().optional(),

  description: z.string().trim().min(1),

  threatLevel: z.enum(['LOW', 'MODERATE', 'HIGH', 'EXTREME']),

  behavior: z.string().trim().nullable().optional(),

  lifeCycle: z.string().trim().nullable().optional(),

  attackStyle: z.string().trim().nullable().optional(),
});

export const updateCreatureSchema = createCreatureSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export const updateCreatureStatusSchema = z.object({
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export type CreateCreatureInput = z.infer<typeof createCreatureSchema>;
export type UpdateCreatureInput = z.infer<typeof updateCreatureSchema>;
export type UpdateCreatureStatusInput = z.infer<
  typeof updateCreatureStatusSchema
>;

import { z } from 'zod';

export const createCreatureSchema = z.object({
  name: z.string().trim().min(1).max(100),

  scientificName: z.string().trim().max(150).nullable().optional(),

  description: z.string().trim().min(1),

  threatLevel: z.enum(['LOW', 'MODERATE', 'HIGH', 'EXTREME']),

  behavior: z.string().trim().nullable().optional(),

  lifeCycle: z.string().trim().nullable().optional(),

  attackStyle: z.string().trim().nullable().optional(),

  habitatIds: z.array(z.string()).default([]),

  dietIds: z.array(z.string()).default([]),

  coverImageUrl: z.string().trim().url().nullable().optional(),

  galleryImages: z
    .array(
      z.object({
        url: z.string().trim().url(),

        alt: z.string().trim().max(200).nullable().optional(),

        caption: z.string().trim().max(500).nullable().optional(),
      }),
    )
    .default([]),

  affinities: z
    .array(
      z.object({
        type: z.enum(['WEAKNESS', 'RESISTANCE']),

        targetType: z.enum(['ELEMENT', 'DAMAGE_TYPE', 'BODY_PART']),

        targetId: z.string(),

        description: z.string().trim().nullable().optional(),
      }),
    )
    .default([]),
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

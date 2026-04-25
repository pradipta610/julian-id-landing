import { defineCollection, z } from 'astro:content';

/**
 * Content collections — schema only for Wave 1.
 * Real entries land in Wave 2–5.
 */

const paket = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    type: z.enum(['luar', 'dalam']),
    price: z.string().default('By Request'),
    duration: z.string().optional(),
    includes: z.array(z.string()).default([]),
    gallery: z.array(z.string()).default([]),
    description: z.string(),
    cover: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    excerpt: z.string(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Julian'),
    draft: z.boolean().default(false),
  }),
});

const karya = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    project_date: z.coerce.date(),
    location: z.string(),
    couple_or_subject: z.string(),
    category: z.enum(['wedding', 'prewedding', 'maternity', 'newborn', 'baby', 'family']).optional(),
    cover: z.string(),
    gallery: z.array(z.string()).default([]),
    story: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { paket, journal, karya };

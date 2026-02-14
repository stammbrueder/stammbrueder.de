import { defineCollection, z } from 'astro:content';

const referenzen = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    material: z.string(),
    year: z.number().optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number().optional(),
      height: z.number().optional()
    })),
    videos: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      poster: z.string().optional()
    })).optional(),
    specs: z.object({
      material: z.string(),
      dimensions: z.string().optional(),
      weight: z.string().optional(),
      finish: z.string().optional()
    }).passthrough().optional(),
    customer: z.object({
      name: z.string(),
      url: z.string().url().optional()
    }).optional(),
    featured: z.boolean().default(false),
    publishedAt: z.date().optional()
  })
});

const leistungen = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cardDescription: z.string().optional(),
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number().optional(),
      height: z.number().optional()
    })),
    videos: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      poster: z.string().optional()
    })).optional(),
    sections: z.array(z.object({
      image: z.object({
        src: z.string(),
        alt: z.string()
      }).optional(),
      isVideo: z.boolean().optional()
    })).optional(),
    specs: z.object({
      material: z.string().optional(),
      dimensions: z.string().optional(),
      weight: z.string().optional(),
      finish: z.string().optional()
    }).optional(),
    customer: z.object({
      name: z.string(),
      url: z.string().url().optional()
    }).optional(),
    relatedCategory: z.string(),
    featured: z.boolean().default(false),
    publishedAt: z.date().optional()
  })
});

export const collections = {
  referenzen,
  leistungen
};

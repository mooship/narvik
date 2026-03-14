import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const chapters = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/chapters" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    description: z.string().optional(),
    epigraph: z.string().optional(),
    epigraphAuthor: z.string().optional(),
  }),
});

export const collections = { chapters };

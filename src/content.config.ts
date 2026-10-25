import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const bios = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/bios" }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
            slug: z.string(),
			photo: z
				.object({
					alt: z.string().optional(),
					src: image(),
				})
				.optional(),
			bioText: z.string().optional(),
			links: z
				.array(z.object({ name: z.string(), href: z.string() }))
				.optional(),
		}),
});

export const collections = { bios };
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const bios = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/bios" }),
	schema: () =>
		z.object({
			name: z.string(),
			photo: z
				.object({
					alt: z.string().optional(),
					src: z.string(),
				})
				.optional(),
			bioText: z.string().optional(),
			links: z
				.array(z.object({ name: z.string(), href: z.string() }))
				.optional(),
		}),
});

const news = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
	schema: () =>
		z.object({
			title: z.string(),
			date: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			images: z
				.array(z.object({
					alt: z.string().optional(),
					src: z.string(),
				}))
				.optional(),
		}),
});

const archive = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/archive" }),
	schema: () =>
		z.object({
			images: z
				.array(z.object({
					alt: z.string().optional(),
					src: z.string(),
					date: z
						.string()
						.or(z.date())
						.transform((val) => new Date(val))
						.optional(),
				})),
		}),
});

export const collections = { bios, news, archive };
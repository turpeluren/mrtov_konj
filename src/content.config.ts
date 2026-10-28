import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const bios = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/bios" }),
	schema: () =>
		z.object({
			name: z.string(),
			genre: z.string().optional(),
			font: z.string().optional(),
			color: z.string().optional(),
			photo: z
				.object({
					alt: z.string().optional(),
					src: z.string(),
				})
				.optional(),
			links: z
				.array(z.object({ name: z.string(), href: z.string() }))
				.optional(),
			albums: z
				.array(
					z.object({
						name: z.string().optional(),
						href: z.string().optional(),
						src: z.string(),
					})
				)
				.optional(),
			video: z
				.object({
					src: z.string(),
					alt: z.string().optional(),
				})
				.optional(),
			background: z
				.object({
					src: z.string(),
					offsetX: z.number().optional(),
					offsetY: z.number().optional(),
					rotation: z.number().optional(),
					scale: z.number().optional(),
				})
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
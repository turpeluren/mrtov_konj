import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const artists = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/artists" }),
	schema: () =>
		z.object({
			name: z.string(),
			genre: z.string().optional(),
			font: z.string().optional(),
			color: z.string().optional(),
			topText: z.boolean().optional(),
			home_photo: z
				.object({
					alt: z.string().optional(),
					src: z.string(),
				})
				.optional(),
			photo: z
				.object({
					alt: z.string().optional(),
					src: z.string().optional(),
					photographer: z.string().optional(),
				})
				.optional(),
			links: z
				.object({
					website: z.string().optional(),
					spotify: z.string().optional(),
					youtube: z.string().optional(),
					bandcamp: z.string().optional(),
					instagram: z.string().optional(),
					additionalLinks: z
						.array(z.object({
							name: z.string(),
							href: z.string(),
						}))
						.optional(),
				})
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
					src: z.string().optional(),
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
			description: z.string().optional(),
			location: z.string().optional(),
			date: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val))
				.optional(),
			images: z
				.array(z.object({
					description: z.string().optional(),
					src: z.string(),
					photographer: z.string().optional(),
				})),
		}),
});

const archive = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/archive" }),
	schema: () =>
		z.object({
			images: z
				.array(z.object({
					description: z.string().optional(),
					src: z.string(),
					photographer: z.string().optional(),
					date: z
						.string()
						.or(z.date())
						.transform((val) => new Date(val))
						.optional(),
				})),
		}),
});

export const collections = { artists, news, archive };
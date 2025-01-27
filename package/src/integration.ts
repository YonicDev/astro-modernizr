import { defineIntegration } from "astro-integration-kit";
import { z } from "astro/zod";

import modernizr from "modernizr";
import { featureDetects, options } from "./config-types.ts";

import { fileURLToPath } from "node:url";

export type Modernizr = ModernizrStatic;

export const integration = defineIntegration({
	name: "astro-modernizr",
	optionsSchema: z
		.object({
			classPrefix: z.string().default(""),
			enableClasses: z.boolean().default(true),
			enableJSClass: z.boolean().default(true),
			scriptGlobalName: z.string().default("window"),
			usePrefixes: z.boolean().default(true),
			minify: z.boolean().default(true),
			options: z.array(z.enum(options)).default([]),
			featureDetects: z.array(z.enum(featureDetects)).default([]),
		})
		.default({}),
	setup(context) {
		type ModernizrBuilder = {
			build: (
				options: typeof context.options,
				callback: (result: string) => void,
			) => typeof modernizr;
		};

		return {
			hooks: {
				"astro:config:setup": (params) => {
					const { addClientDirective, injectScript } = params;
					addClientDirective({
						name: "features",
						entrypoint: fileURLToPath(
							new URL("./directives/features.js", import.meta.url),
						),
					});
					addClientDirective({
						name: "unsupported",
						entrypoint: fileURLToPath(
							new URL("./directives/unsupported.js", import.meta.url),
						),
					});
					(context.options as unknown as Record<string, string[]>)[
						"feature-detects"
					] = context.options.featureDetects;
					context.options.minify ??= true;
					(modernizr as unknown as ModernizrBuilder).build(
						context.options,
						(result: string) => {
							injectScript("head-inline", result);
						},
					);
				},
				"astro:config:done": (params) => {
					const featureDetects = context.options.featureDetects ?? [];
					const parsedFeatureType = (featureDetects ?? []).length > 0
					?  `Array<${featureDetects.map((x) => `"${x}"`).join(" | ")}>` //`${JSON.stringify(context.options.featureDetects)}[number]`
					: "string";

					params.injectTypes({
						filename: "types.d.ts",
						content: `import "astro"; declare module "astro" { interface AstroClientDirectives { "client:features"?: ${parsedFeatureType}; "client:unsupported"?: ${parsedFeatureType} } }`,
					})
				}
			},
		};
	},
});

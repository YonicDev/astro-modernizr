import { defineIntegration } from "astro-integration-kit";
import { z } from "astro/zod";

import modernizr from "modernizr";
import { featureDetects, options } from "./config-types.ts";

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
				"astro:config:setup": ({ injectScript }) => {
					(context.options as any)["feature-detects"] =
						context.options.featureDetects;
					context.options.minify ??= true;
					(modernizr as unknown as ModernizrBuilder).build(
						context.options,
						(result: string) => {
							injectScript("head-inline", result);
						},
					);
				},
			},
		};
	},
});

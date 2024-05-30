import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import modernizr from "astro-modernizr";
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	scopedStyleStrategy: "class",
	integrations: [
		modernizr({
			featureDetects: [
				"ambientlight",
				"audio",
				"css/opacity",
				"css/cssgrid",
				"elem/ruby",
				"img/webp",
				"es6/promises",
				"es5/strictmode",
				"emoji",
			],
			options: ["setClasses"],
		}),
		svelte(),
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve("../package/dist"),
		}),
	],
});

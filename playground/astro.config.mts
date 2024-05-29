import tailwind from "@astrojs/tailwind";
import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";

import modernizr from "astro-modernizr";

// https://astro.build/config
export default defineConfig({
	scopedStyleStrategy: "class",
	integrations: [
		tailwind(),
		modernizr({
			featureDetects: [
				"ambientlight",
				"audio",
				"css/opacity",
				"css/cssgrid",
				"elem/ruby",
				"img/avif",
				"img/webp",
			],
			options: [ "setClasses" ]
		}),
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve("../package/dist"),
		}),
	],
});

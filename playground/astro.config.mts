import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";

import modernizr from "astro-modernizr";

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
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve("../package/dist"),
		}),
	],
});

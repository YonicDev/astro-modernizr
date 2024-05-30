import "astro";
import type { FeatureDetects } from "../index.ts";
declare module "astro" {
	interface AstroClientDirectives {
		"client:features"?: Array<keyof FeatureDetects>;
	}
}

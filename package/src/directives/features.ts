import type { ClientDirective } from "astro";

export default ((load, options) => {
	window.addEventListener("load", () => {
		async function render() {
			const hydrate = await load();
			return hydrate();
		}

		let testCase = true;
		const directives = options.value as unknown as Array<keyof FeatureDetects>;

		if (!options.value) return;

		for (const feature of directives) {
			testCase &&=
				Object.prototype.hasOwnProperty.call(Modernizr, feature) &&
				// biome-ignore lint/suspicious/noDoubleEquals: We need the value conversion from Boolean{subset} features to regular boolean.
				Modernizr[feature] == true;
			if (!testCase) return;
		}

		render();
	});
}) satisfies ClientDirective;

import type { ClientDirective } from "astro";

export default ((load, options) => {
	const directives = options.value as unknown as Array<keyof FeatureDetects>;
	if (!options.value || (options.value.length ?? 0) <= 0)
		throw new TypeError(
			"client:features must be an array of enabled feature detect strings.",
		);

	for (const feature of directives) {
		if (!Object.prototype.hasOwnProperty.call(Modernizr, feature))
			throw new TypeError(
				`"${feature}" is not a valid feature detect. Check that all the feature detects in the client:features directive of this component have been enabled in the \`astro.config\` file.`,
			);
	}
	window.addEventListener("load", () => {
		async function render() {
			const hydrate = await load();
			return hydrate();
		}

		let testCase = true;

		if (!options.value || (options.value.length ?? 0) <= 0) {
			throw new TypeError(
				"client:features must be an array of enabled feature detect strings.",
			);
		}

		for (const feature of directives) {
			if (!Object.prototype.hasOwnProperty.call(Modernizr, feature)) {
				throw new TypeError(
					`"${feature}" is not a valid feature detect. Check that all the feature detects in the client:features directive of this component have been enabled in the \`astro.config\` file.`,
				);
			}
			// biome-ignore lint/suspicious/noDoubleEquals: We need the value conversion from Boolean{subset} features to regular boolean.
			testCase &&= Modernizr[feature] == true;
			if (!testCase) return;
		}

		render();
	});
}) satisfies ClientDirective;

const oklab = require("@csstools/postcss-oklab-function");

module.exports = {
	plugins: [
		require("postcss-pseudo-is"),
		oklab({
			subFeatures: {
				displayP3: false,
			},
		}),
		require("level4"),
		require("postcss-color-rgb"),
		require("postcss-color-rgba-fallback"),
		require("postcss-filter-gradient"),
		require("postcss-pixrem"),
		require("autoprefixer"),
	],
};

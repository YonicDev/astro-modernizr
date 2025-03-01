<div align="center">

### Astro + Modernizr

**Build sites for the future and the past.**

[Modernizr documentation][1]

<hr/>

</div>

This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that adds Modernizr to your Astro site, a fast tool that detects which HTML, CSS and JS features do browsers support, allowing you to progressively enhance and future-proof your components and site with fine control and guaranteed accuracy.

## Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add astro-modernizr
```

```bash
npx astro add astro-modernizr
```

```bash
yarn astro add astro-modernizr
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add astro-modernizr
```

```bash
npm install astro-modernizr
```

```bash
yarn add astro-modernizr
```

2. Add the integration to your astro config

```diff
+import modernizr from "astro-modernizr";

export default defineConfig({
  integrations: [
+    modernizr({
+      options: [],
+      featureDetects: [
+        /* your feature detection tests */
+      ],
+    }),
  ],
});
```

## Configuration

This integration generates a custom optimized build of Modernizr from the NPM module, as per the recommendations of the most recent versions.
The integration settings in the `astro.config` file control how this custom build is made.

### options

An array of the name of the different [Modernizr API](https://modernizr.com/docs/#modernizr-api) functions to include. By default, it doesn't include anything.

For a more sensible default, `["setClasses"]` is good for adding CSS classes in accord to the support or not of certain features, instead of adding classes *only* if it does support them.

### featureDetects

An array of all the features that you wish to test for. The complete supported list can be found [here](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json).

By default, it doesn't test for anything.

### classPrefix

A string that you wish to use to prefix your classes. For example, `"supported-"`.

By default, there is no prefix.

### enableCSSClasses

A boolean to enable adding CSS classes to the root of the document (the `<html>` node). If false, regardless of adding `setClasses` to the options array, Modernizr will not add any classes (except for `.no-js`).

Enabled by default.

### enableJSClass

A boolean to enable updating the `.no-js` class that Modernizr adds automatically to the root of the document to `.js` if JavaScript is enabled *and working*. The class won't be able to update if the browser halts scripts on error.

Enabled by default.

### minify

A boolean that determines whether to minify the generated client JavaScript that'll be placed on the Astro page.

Enabled by default.

> This differs from the default in the npm module, as the generated code will *not* be optimized by Vite. This is done by design for backwards compatibility with browsers that do not support ES6 modules.

### scriptGlobalName

The name of the global object to be used by Modernizr.

By default, it is set to `"window"`, and there shouldn't be any need to change it.

### usePrefixes

A boolean that determines whether to check for vendor prefixes when testing a feature.

Enabled by default.

## Usage

You can use Modernizr just like you would normally. [Check the documentation][1] for more details.

The integration exposes the `Modernizr` object globally on client scripts and offers typings to be used in optimized scripts. However, for older browser compatibility purposes it's recommended to **use Modernizr in inline scripts**.

```html
<script is:inline>
  if (Modernizr.awesomeNewFeature) {
    // Use the new awesome feature!
  } else {
    // Get the old lame experience.
  }
</script>
```

### Client directive

This integration adds two directives which allow the browser to render components conditionally according to its feature set:

*  `client:features`: Makes the browser render a component if the browser supports all of the features listed.
*  `client:unsupported`: Makes the browser render a component if the browser does not support any of the features listed.

Both have the highest priority, rendering at the same time as those with `client:load`.

```jsx
---
import MyAwesomeComponent from "@components/Awesome.svelte"
import SimpleAndLameComponent from "@components/SimpleLame.jsx"
---
<Awesome client:features={["awesomeNewFeature"]} />
<SimpleAndLameComponent client:unsupported={["awesomeNewFeature"]} />
```

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground and package watcher:

```bash
pnpm dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](https://github.com/YonicDev/astro-modernizr/blob/main/LICENSE). Made with ❤️ by [YonicDev](https://github.com/YonicDev).

[1]: https://modernizr.com/docs/
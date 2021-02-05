# esbuild-plugin-globals

Provides Webpack's [externals](https://webpack.js.org/configuration/externals/) functionality for [esbuild](https://webpack.js.org/configuration/externals/).

## Install

npm:

```bash
npm install --save-dev esbuild-plugin-globals
```

yarn:

```bash
yarn add --dev esbuild-plugin-globals
```

## Usage

```js
import esbuild from "esbuild";
import GlobalsPlugin from "esbuild-plugin-globals";

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  plugins: [
    GlobalsPlugin({
      /**
       * Simple string pattern
       * Any module matching "react" will be replaced with
       * `module.exports = React`
       */
      react: "React",
      /**
       * Regular expression + resolver function
       * Invoked with matched module name and returns the module exports (or undefined).
       */
      "@some-scope/.*": (moduleName) => {
        /** strip the scope */
        const name = name.substring(12);
        /** generates module.exports = CamelCasedName */
        return camelCase(name);
      },
    }),
  ],
});
```

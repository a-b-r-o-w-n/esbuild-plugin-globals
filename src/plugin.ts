import type { Plugin } from "esbuild";

type GlobalResolveFunc = (moduleName: string) => string | undefined;

type PluginGlobalsOptions = {
  [key: string]: string | GlobalResolveFunc;
};

const generateResolveFilter = (globals: PluginGlobalsOptions): RegExp => {
  const moduleNames = Object.keys(globals);
  return new RegExp(`^(${moduleNames.join("|")})$`);
};

const generateExport = (globals: PluginGlobalsOptions, name: string) => {
  const match = Object.entries(globals).find(([pattern]) => {
    return new RegExp(`^${pattern}$`).test(name);
  });

  if (match) {
    const output = typeof match[1] === "function" ? match[1](name) : match[1];

    return output ? `module.exports = ${output}` : undefined;
  }
};

const pluginGlobals = (globals: PluginGlobalsOptions = {}): Plugin => {
  const filter = generateResolveFilter(globals);

  return {
    name: "globals",
    setup(build) {
      build.onResolve({ filter }, (args) => {
        return { path: args.path, namespace: "globals" };
      });

      build.onLoad({ filter: /.*/, namespace: "globals" }, (args) => {
        const name = args.path;
        const contents = generateExport(globals, name);

        if (contents) {
          return { contents };
        }

        return null;
      });
    },
  };
};

export = pluginGlobals;

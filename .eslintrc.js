module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["import"],
  settings: {
    "import/resolver": "typescript",
  },
  env: {
    es6: true,
    node: true,
  },
};

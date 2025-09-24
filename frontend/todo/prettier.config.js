/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "always",
  printWidth: 80,
  endOfLine: "lf",
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
      },
    },
    {
      files: ["*.ts", "*.js"],
      options: {
        parser: "typescript",
      },
    },
    {
      files: ["*.json"],
      options: {
        parser: "json",
        tabWidth: 2,
      },
    },
  ],
};

export default config;

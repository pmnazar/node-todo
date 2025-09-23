/** @type {import("prettier").Config} */
const config = {
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
        tabWidth: 2,
      },
    },
  ],
};

export default config;

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79",
        },
      },
    ],
    ["@babel/preset-typescript"],
    ["@babel/preset-react"],
  ],
};

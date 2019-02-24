module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  "plugins": [
    // "macros",
    // "tailwind-components",
    "babel-plugin-tailwind",
    "macros",
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}

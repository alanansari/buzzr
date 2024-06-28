import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      ...colors,
      "light-bg": "#f5f3ff",
      "dark-bg": "#1e1e1e",
      "white": "#ffffff",
      "dark": "#2c2c2c",
      "gray":"#c4c6c9",
      "lprimary":"#7d49f8",
      "dprimary":"#a589fc",
      "red-dark":"#E84B4B",
      "red-light":"#C92929"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

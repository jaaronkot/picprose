import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";
const { scrollbarGutter, scrollbarWidth, scrollbarColor } = require('tailwind-scrollbar-utilities');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      aspectRatio: {
        '1/1': '1 / 1',
        '2/1': '2 / 1',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), scrollbarWidth()],
};
export default config;

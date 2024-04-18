import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";
 
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        // 👇 Add CSS variables
        sans: ["var(--font-opensans)"],
        mono: ["var(--font-roboto-mono)"],
        anke: ["var(--font-anke)"],
        dingtalk: ["var(--font-dingtalk)"],
        kingsoft: ["var(--font-kingsoft)"],
        xinyiguanhei: ["var(--font-xinyiguanhei)"],
        alibaba: ["var(--font-alibaba)"],
      },
      aspectRatio: {
        '2/1': '2 / 1',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '9/16': '9 / 16',
        '1/2': '1 / 2',
        '2/3': '2 / 3',
        '3/4': '3 / 4',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

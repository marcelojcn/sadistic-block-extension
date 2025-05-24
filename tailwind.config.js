/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./static/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
    "./css/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin, scrollbar],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "mobile-dark": "url(/pattern-background-mobile-dark.svg)",
        "mobile-light": "url(/pattern-background-mobile-light.svg)",
        "moon-dark": "url(/icon-moon-light.svg)",
        "sun-dark": "url(/icon-sun-light.svg)",
        "moon-light": "url(/icon-moon-dark.svg)",
        "sun-light": "url(/icon-sun-dark.svg)",
      },
      colors: {
        navy: {
          100: "hsl(219deg, 13%, 44%)",
          200: "hsl(215deg, 27%, 32%)",
          300: "hsl(216deg, 25%, 25%)",
        },
        purple: {
          100: "	hsl(278, 100%, 95%)",
          200: "hsl(277deg, 91%, 80%)",
          300: "hsl(277deg 91%, 56% )",
        },
        "light-blue": "hsl(216deg, 47%, 78%)",
        "light-gray": "hsl(220deg, 38%, 97%)",
        green: "hsl(151deg, 70%, 50%)",
        red: "hsl(0deg, 82%, 63%)",
      },
      dropShadow: {
        light: "0 16px 40px hsl(220deg 29% 66% / 0.14)",
        dark: "0 16px 40px hsl(216deg 25% 25% / 0.14)",
      },
    },
  },
  plugins: [],
};

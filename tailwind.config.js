/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light",
      {
        custom: {
          primary: "#92ff84",

          secondary: "#0cafb5",

          accent: "#f449a7",

          neutral: "#242b38",

          "base-100": "#2a323c",

          info: "#6ad4f1",

          success: "#0c6a3b",

          warning: "#f7c569",

          error: "#ec4b63",
        },
      },
    ],
  },
};

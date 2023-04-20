const { colors } = require(`tailwindcss/defaultTheme`)

// console.log(colors)

module.exports = {
  mode: "jit", // see https://tailwindcss.com/docs/just-in-time-mode
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      colors: {
        primary: {
          base: "var(--primary-color)",
          light: "var(--primary-color-light)",
          dark: "var(--primary-color-dark)",
        },
        secondary: {
          100: "#E2EDFF",
          300: "#6C87AE",
        },
        blue: {
          1000: "#0A0E31",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Poppins", "sans-serif"],
      },
      // fontWeight: {
      //   thin: 100,
      //   extralight: 200,
      //   light: 300,
      //   normal: 400,
      //   medium: 500,
      //   semibold: 600,
      //   bold: 700,
      //   extrabold: 800,
      //   black: 900
      // }
      lineHeight: {
        12: "3rem",
        16: "4rem",
        20: "5rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}

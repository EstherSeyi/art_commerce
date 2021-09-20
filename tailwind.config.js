module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "720px",
      lg: "1024px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      black: "#000000",
      white: "#ffffff",
      grey: {
        50: "#E4E4E4",
        100: "#656565",
      },
    },

    extend: {
      flex: {
        55: "0 0 55%",
        40: "0 0 40%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      black: "#000000",
      white: "#ffffff",
      grey: {
        50: "#E4E4E4",
      },
    },

    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

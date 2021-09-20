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
        150: "#9B9B9B",
      },
    },

    extend: {
      flex: {
        20: "0 0 20%",
        55: "0 0 55%",
        40: "0 0 40%",
        75: "0 0 75%",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(250px, 1fr))",
        automax: "repeat(auto-fit, minmax(250px, 275px))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

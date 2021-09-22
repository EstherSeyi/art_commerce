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
        200: "#B4B4B4",
      },
    },

    extend: {
      flex: {
        20: "0 0 20%",
        45: "0 0 45%",
        40: "0 0 40%",
        75: "0 0 75%",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
        automax: "repeat(auto-fit, minmax(250px, 275px))",
      },
      height: {
        main: "calc(100vh - 1rem - 24px)",
      },
      minHeight: {
        main: "calc(100vh - 1rem - 24px)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

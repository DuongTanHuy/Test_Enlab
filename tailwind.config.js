/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
      },
      backgroundImage: {
        "3xl-gradient": "linear-gradient(to bottom, #00c6ff, #0072ff)",
        "4xl-gradient": "linear-gradient(to bottom, #00b3cc, #2c7744)",
        "5xl-gradient": "linear-gradient(to bottom, #f06966, #fad6a6)",
      },
    },
  },
  plugins: [],
};

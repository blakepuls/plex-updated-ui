module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },

      colors: {
        primary: "#8423d9",
        secondary: "#f6d860",
        neutral: "#3d4451",

        "base-100": "#0F0F13",
        "base-200": "#1d1d24",
        "base-300": "#282834",
      },
    },
  },
  prefix: "",

  // plugins: [require("daisyui")],
};

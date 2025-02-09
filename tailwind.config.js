import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ec407a",
        secondary: "#f06292",
        "dark-gray": "#333333",
      },
    },
  },
  plugins: [],
});

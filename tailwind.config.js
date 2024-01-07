/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Dark-nude": "#ccb3a3",
        // "Pale-orange": "hsl(25, 100%, 94%)",
        // "Very-dark-blue": "hsl(220, 13%, 13%)",
        // "Dark-grayish-blue": "hsl(219, 9%, 45%)",
        // "Grayish-blue": "hsl(220, 14%, 75%)",
        // "Light-grayish-blue": "hsl(223, 64%, 98%)",
        // White: "hsl(0, 0%, 100%)",
        // Black: "hsl(0, 0%, 0%)", //(with 75% opacity for lightbox background)
      },
    },
  },
  plugins: [],
};

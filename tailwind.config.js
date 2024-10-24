/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      // fontFamily: {
      //   playfair: ['"Playfair Display"', "serif"],
      // },
      colors: {
        gold: {
          400: "#dbb556", // Gold color matching the navbar
          500: "#b89c55", // Gold color matching the navbar
          600: "#a87c45",
          700: "#806135",
        },
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      animation: {
        'float-up': 'floatUp 5s ease-in-out infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '0.8' },
          '100%': { transform: 'translateY(-40px) translateX(-10px)', opacity: '1' },
        },
      },
      
    },
  },
  plugins: [],
};

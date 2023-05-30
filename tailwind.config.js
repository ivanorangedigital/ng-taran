module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'shadow': '0px 0px 10px 0px rgb(0 0 0 / 20%)',
      },
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        }
      },
      animation: {
        'gradient': 'gradient 3s linear infinite'
      },
      backgroundSize: {
        '400%': '400%'
      }
    },
  },
  plugins: [],
}
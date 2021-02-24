module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    typography: {
      default: {
        css: {
          pre: {
            color: 'inherit',
            backgroundColor: 'whitesmoke',
            border: '1px solid #eaeaea',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

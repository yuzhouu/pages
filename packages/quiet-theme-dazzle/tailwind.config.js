module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
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
  },
  plugins: [require('@tailwindcss/typography')],
}

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EBD9B4',
      },
      backgroundImage: {
        main: 'linear-gradient(to bottom,#fff6df, rgba(255,246,223,0))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config

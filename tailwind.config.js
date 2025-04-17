/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'minecraft-green': '#7CB342',
        'minecraft-blue': '#3B78FF',
        'minecraft-brown': '#8B4513',
        'minecraft-gray': '#8D8D8D',
        'minecraft-dark': '#1E1E1E',
        'minecraft-light': '#F0F0F0',
      },
      boxShadow: {
        'minecraft': '4px 4px 0px 0px rgba(0,0,0,0.2)',
        'minecraft-lg': '8px 8px 0px 0px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
}

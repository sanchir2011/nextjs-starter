/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: { },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('flowbite/plugin')
    ],
};

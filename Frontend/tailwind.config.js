/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Inter"', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    red: '#e11d48',
                    dark: '#0f172a',
                },
            },
            boxShadow: {
                soft: '0 10px 30px rgba(0,0,0,0.08)',
            },
        },
    },
    plugins: [],
};

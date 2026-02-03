/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                blueprint: {
                    dark: '#0d0d0d',
                    grid: '#222222',
                    blue: '#2a9d8f',
                    gold: '#e9c46a',
                    text: '#e0e0e0'
                }
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
                hand: ['"Gloria Hallelujah"', 'cursive'],
                sans: ['"Inter"', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0px',
                sm: '0px',
                md: '0px',
                lg: '0px',
                xl: '0px',
                '2xl': '0px',
                full: '0px', // Force sharp corners even for 'rounded-full' utility if used inadvertently
            }
        },
    },
    plugins: [],
}

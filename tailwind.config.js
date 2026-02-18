/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                aether: {
                    darker: '#05050a',
                    dark: '#0a0a0f',
                    surface: '#12121a',
                    elevated: '#1a1a27',
                    primary: '#6366f1',
                    secondary: '#8b5cf6',
                    accent: '#06b6d4',
                },
                text: {
                    primary: '#f8fafc',
                    secondary: '#94a3b8',
                    muted: '#64748b',
                }
            },
            fontFamily: {
                sans: ['Inter Variable', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'shimmer': 'shimmer 2s infinite',
                'shimmer-text': 'shimmer-text 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'aurora': 'aurora 20s ease infinite alternate',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'shimmer-text': {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                aurora: {
                    '0%': { backgroundPosition: '50% 50%, 50% 50%' },
                    '50%': { backgroundPosition: '100% 0%, 0% 100%' },
                    '100%': { backgroundPosition: '50% 50%, 50% 50%' },
                }
            },
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        surface: '#18181B',
        'surface-hover': '#27272A',
        border: '#27272A',
        'text-primary': '#FAFAFA',
        'text-secondary': '#A1A1AA',
        'text-muted': '#71717A',
        accent: '#3B82F6',
        'accent-hover': '#2563EB',
        success: '#22C55E',
        error: '#EF4444',
      },
      fontFamily: {
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h1: ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h2: ['2rem', { lineHeight: '1.3' }],
        h3: ['1.5rem', { lineHeight: '1.4' }],
        body: ['1.125rem', { lineHeight: '1.7' }],
        'body-small': ['1rem', { lineHeight: '1.6' }],
        caption: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'space-1': '0.5rem',
        'space-2': '1rem',
        'space-3': '1.5rem',
        'space-4': '2rem',
        'space-5': '2.5rem',
        'space-6': '3rem',
        'space-8': '4rem',
        'space-10': '5rem',
        'space-12': '6rem',
        'space-16': '8rem',
      },
      maxWidth: {
        content: '1200px',
      },
      screens: {
        tablet: '640px',
        desktop: '1024px',
        wide: '1280px',
      },
    },
  },
  plugins: [],
};

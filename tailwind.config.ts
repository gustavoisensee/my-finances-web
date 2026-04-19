import type { Config } from 'tailwindcss';
import themes from 'daisyui/src/theming/themes'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...themes['light'],
          'primary': '#6366f1',          // Indigo-500 - main actions
          'primary-content': '#ffffff',
          'secondary': '#10b981',         // Emerald-500 - secondary elements
          'secondary-content': '#ffffff',
          'accent': '#f59e0b',            // Amber-500 - highlights/tertiary
          'accent-content': '#ffffff',
          'neutral': '#1e293b',           // Slate-800
          'base-100': '#ffffff',
          'base-200': '#f1f5f9',          // Slate-100
          'base-300': '#e2e8f0',          // Slate-200
          'info': '#0ea5e9',              // Sky-500
          'success': '#10b981',           // Emerald-500
          'warning': '#f59e0b',           // Amber-500
          'error': '#ef4444',             // Red-500
          '.collapse-title, :where(.collapse > input[type="checkbox"])': {
            'min-height': '0px'
          },
        }
      },
      {
        dark: {
          ...themes['dark'],
          'primary': '#818cf8',          // Indigo-400 - main actions
          'primary-content': '#ffffff',
          'secondary': '#34d399',         // Emerald-400 - secondary elements
          'secondary-content': '#000000',
          'accent': '#fbbf24',            // Amber-400 - highlights/tertiary
          'accent-content': '#000000',
          'neutral': '#1e293b',           // Slate-800
          'base-100': '#0f172a',          // Slate-900
          'base-200': '#1e293b',          // Slate-800
          'base-300': '#334155',          // Slate-700
          'info': '#38bdf8',              // Sky-400
          'success': '#34d399',           // Emerald-400
          'warning': '#fbbf24',           // Amber-400
          'error': '#f87171',             // Red-400
          '.collapse-title, :where(.collapse > input[type="checkbox"])': {
            'min-height': '0px'
          },
        }
      }
    ]
  },
  theme: {
    extend: {
      minWidth: {
        '24': '12rem',
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-down': 'slide-down 250ms ease-out',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
export default config

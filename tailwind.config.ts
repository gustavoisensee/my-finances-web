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
          // 'primary': '#ff00ff',
          // 'secondary': '#ffffff',
          // 'accent': '#ffffff',
          // 'neutral': '#ffffff',
          // 'info': '#ffffff',
          // 'success': '#00ffff',
          // 'warning': '#ffffff',
          // 'error': '#ffffff',
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
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
export default config

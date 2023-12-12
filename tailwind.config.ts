import type { Config } from 'tailwindcss';
import themes from 'daisyui/src/theming/themes'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
          }
        }
      }
    ]
  },
  plugins: [
    require('daisyui'),
  ],
}
export default config

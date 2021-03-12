const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: true,
    content: [
      '**/*.{html,ts,scss}'
    ]
  },
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.06);'
      },
      colors: {
        'warm-gray': colors.warmGray,
        amber: colors.amber,
        'true-gray': colors.trueGray,
        rose: colors.rose,
        pink: colors.pink,
        orange: {
          100: '#fffaf0',
          200: '#feebc8',
          300: '#fbd38d',
          400: '#f6ad55',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7b341e'
        },
        yellow: {
          100: '#fffff0',
          200: '#fefcbf',
          300: '#faf089',
          400: '#f6e05e',
          500: '#ecc94b',
          600: '#d69e2e',
          700: '#b7791f',
          800: '#975a16',
          900: '#744210'
        },
        green: {
          100: '#f0fff4',
          200: '#c6f6d5',
          300: '#9ae6b4',
          400: '#68d391',
          500: '#48bb78',
          600: '#38a169',
          700: '#2f855a',
          800: '#276749',
          900: '#22543d'
        },
        teal: {
          100: '#e6fffa',
          200: '#b2f5ea',
          300: '#81e6d9',
          400: '#4fd1c5',
          500: '#38b2ac',
          600: '#319795',
          700: '#2c7a7b',
          800: '#285e61',
          900: '#234e52'
        }

      },
      fontFamily: {
        title: ['Comic Neue', 'cursive'],
        mono: ['iaWriterQuattroS', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace']
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        size: ['width', 'height'],
        spacing: ['margin, padding'],
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'disabled', 'checked'],
      backgroundImage: ['dark', 'disabled'],
      backgroundOpacity: ['dark', 'disabled'],
      borderWidth: ['focus-within'],
      boxShadow: ['dark', 'disabled'],
      cursor: ['disabled'],
      fontSize: ['hover'],
      ringWidth: ['focus-visible', 'disabled'],
      ringColor: ['dark', 'focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      scale: ['disabled'],
      textColor: ['dark', 'disabled', 'checked'],
      transform: ['hover', 'disabled'],
      zIndex: ['hover']
    }
  },
  corePlugins: {
    borderCollapse: false,
    tableLayout: false,
    resize: false,
    accessibility: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-elevation')(['dark', 'hover', 'disabled'])
  ]
};

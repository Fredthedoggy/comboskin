const colors = require('tailwindcss/colors');

module.exports = {
    theme: {
        colors: {
            gray: colors.coolGray,
            blue: colors.sky,
            red: colors.rose,
            pink: colors.fuchsia,
            black: colors.black,
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            width: {
                80: '20rem',
                72: '18rem',
                max: 'max-content',
            },
            height: {
                max: 'max-content',
            }
        },
    },
};

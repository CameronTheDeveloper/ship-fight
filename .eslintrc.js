module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },

    extends: [
        'eslint:recommended',
    ],

    rules: {
        'quotes': ['warn', 'single'],
        'indent': ['error', 4],
        'no-use-before-define': 'error',
        'comma-dangle': ['warn', 'always-multiline'],
        'semi': ['error', 'always'],
        'no-unused-vars': 'warn',
    },
};
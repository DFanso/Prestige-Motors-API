module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: false, // Set to true if you are using JSX
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      // Add specific rules or overrides here
    },
  };
  
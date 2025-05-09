module.exports = {
  root: true,
  
  // Base configuration for the entire monorepo
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  
  plugins: ['@typescript-eslint'],
  
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }],
  },
  
  // Specific overrides for different workspace types
  overrides: [
    // Next.js apps specific rules
    {
      files: ['apps/**/*.{ts,tsx}'],
      extends: [
        'next',
        'next/core-web-vitals',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        next: {
          rootDir: ['apps/*/'],
        },
      },
      plugins: ['react', 'react-hooks'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      }
    },
    
    // Packages specific rules
    {
      files: ['packages/**/*.{ts,tsx}'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      plugins: ['react', 'react-hooks'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
      }
    }
  ],
  
  ignorePatterns: ['node_modules/', 'dist/', '.next/', 'out/']
};

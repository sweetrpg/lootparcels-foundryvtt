// eslint.config.js

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

const foundryGlobals = {
  game: 'readonly',
  ui: 'readonly',
  canvas: 'readonly',
  Hooks: 'readonly',
  CONFIG: 'readonly',
  CONST: 'readonly',

  // Common Foundry classes
  Application: 'readonly',
  FormApplication: 'readonly',
  Dialog: 'readonly',
  Actor: 'readonly',
  Item: 'readonly',
  Token: 'readonly',
  Scene: 'readonly',
  Roll: 'readonly',

  // Utility globals often used
  mergeObject: 'readonly',
  duplicate: 'readonly'
};

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],

  // TS / JS files
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: foundryGlobals
    },
    rules: {
      // 🔧 Foundry-friendly tweaks
      'no-undef': 'off', // handled by globals

      // TS rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],

      '@typescript-eslint/no-explicit-any': 'off', // Foundry APIs often require this
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Common Foundry patterns
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',

      // Allow dynamic access (common in Foundry data models)
      '@typescript-eslint/no-unsafe-member-access': 'off',

      // General JS sanity
      'no-console': 'warn'
    }
  },

  // Svelte files
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser
      },
      globals: foundryGlobals
    },
    rules: {
      'no-unused-vars': 'off'
    }
  },

  // Foundry-specific file patterns (optional stricter rules)
  {
    files: ['**/hooks/**/*.ts', '**/hooks/**/*.js'],
    rules: {
      // Hooks often rely on side effects
      '@typescript-eslint/no-floating-promises': 'off'
    }
  },

  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.svelte-kit',
      'coverage'
    ]
  }
];

import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 🚫 Global ignores
  {
    ignores: ['**/node_modules/**', 'frontend/build/**', 'frontend/dist/**', 'backend/dist/**', '**/dist/**', '**/.cache/**', 'vite.config.js'],
  },

  // ✅ Base JavaScript Recommended
  js.configs.recommended,

  // 🛠️ Plugins and Global Settings
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      'unused-imports': unusedImports,
      react: pluginReact, // Define react here so rules can find it
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // 1. Disable the base rules to avoid double-reporting or conflicts
      'no-unused-vars': 'off',
      'react/no-unused-vars': 'off',

      // 2. Enable unused-imports rules
      'unused-imports/no-unused-imports': 'error', // Use error to see them clearly
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': 'warn',
    },
  },

  // ⚛️ React Configuration (Frontend specific)
  {
    files: ['frontend/**/*.{js,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-max-props-per-line': 'off',
    },
  },

  // 🔧 Prettier (Always last)
  prettier,
];

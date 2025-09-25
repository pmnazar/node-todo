import js from '@eslint/js';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      // ❌ remove unused imports
      'unused-imports/no-unused-imports': 'error',

      // ⚠️ It controls unused variables, but ignores those whose names start with _
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  // 🎨 Prettier compatibility
  eslintConfigPrettier,
]);

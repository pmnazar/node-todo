// eslint.config.mjs

import { fileURLToPath } from 'node:url';

import ng from '@angular-eslint/eslint-plugin';
import ngTemplate from '@angular-eslint/eslint-plugin-template';
import ngTemplateParser from '@angular-eslint/template-parser';
import js from '@eslint/js';
import parserTs from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        google: 'readonly',
        LeaderLine: 'readonly',
        LeaderLineInstance: 'readonly',
        nodeJs: true,
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },

  // Base TypeScript + plugins (with correct parser for TS)
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: parserTs, // <=== this is required for TS files
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      ecmaVersion: 2022,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'dot-notation': 'off',
      'no-unused-vars': 'off', // disable core rule, enable plugin rule below

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'warn',

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      'no-console': 'warn',
      'no-debugger': 'error',

      'default-case': 'warn',

      // TypeScript ESLint recommended rules
      ...tseslint.configs.recommendedTypeChecked.rules,
      '@typescript-eslint/no-explicit-any': ['warn'],
    },
  },

  // Angular ESLint rules for TS files
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': ng,
    },
    rules: {
      ...ng.configs.recommended.recommended,
    },
  },

  // Angular HTML templates
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: ngTemplateParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        requireConfigFile: true,
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@angular-eslint/template': ngTemplate,
    },
    rules: {
      ...ngTemplate.configs.recommended.rules,

      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/alt-text': 'warn',
      '@angular-eslint/template/button-has-type': 'warn',
      '@angular-eslint/template/eqeqeq': 'warn',
      '@angular-eslint/template/label-has-associated-control': 'warn',
      '@angular-eslint/template/no-any': 'warn',

      '@angular-eslint/template/no-call-expression': [
        'warn',
        {
          allowList: ['someComplete'],
        },
      ],

      '@angular-eslint/template/no-inline-styles': [
        'warn',
        {
          allowNgStyle: true,
          allowBindToStyle: true,
        },
      ],

      '@angular-eslint/template/no-distracting-elements': 'warn',
      '@angular-eslint/template/no-interpolation-in-attributes': 'warn',
      '@angular-eslint/template/no-negated-async': 'warn',
      '@angular-eslint/template/prefer-control-flow': 'warn',
      '@angular-eslint/template/prefer-ngsrc': 'warn',
      '@angular-eslint/template/role-has-required-aria': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
    },
  },

  eslintConfigPrettier,
);

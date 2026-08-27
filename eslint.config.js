import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.playwright-cli/**', 'output/**', 'tmp/**'],
  },
  eslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  eslintConfigPrettier,
]

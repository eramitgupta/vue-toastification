import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['dist', 'node_modules', 'coverage', 'public', '.github', '*.d.ts']
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],

    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                parser: tseslint.parser
            }
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
            '@typescript-eslint/no-explicit-any': 'off'
        }
    },

    {
        files: ['vite.config.js', 'eslint.config.js'],
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    }
];

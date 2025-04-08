import config from '@antfu/eslint-config'

export default config({
  stylistic: {
    indent: 2,
    semi: false,
  },
  typescript: true,
  gitignore: false,
  ignores: ['dist', '.idea', '.vscode'],
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/max-attributes-per-line': [2, {
        singleline: 3, // 一行不能超过 3 个属性，超过换行
        multiline: {
          max: 1, // 多行时，每行多少个属性
          allowFirstLine: false,
        },
      }],
    },
  },
})

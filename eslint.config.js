import config from '@antfu/eslint-config'

export default config({
  stylistic: {
    indent: 2,
    semi: false,
  },
  typescript: true,
  gitignore: true,
  ignores: ['!airpower/**', '!src/**'],
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
    },
  },
})

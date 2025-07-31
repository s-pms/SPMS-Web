import config from '@antfu/eslint-config'

export default config({
    stylistic: {
        indent: 2,
        semi: false,
    },
    gitignore: false,
    ignores: ['dist', '.idea', '.vscode'],
    vue: {
        overrides: {
            'vue/block-order': ['error', {
                order: ['script', 'template', 'style'],
            }],
            'vue/max-attributes-per-line': ['error', {
                singleline: 1, // 单行最多 1 个属性
                multiline: 1,
            }],
        },
    },
    typescript: {
        overrides: {
            'unicorn/error-message': 'off',
        },
    },
})

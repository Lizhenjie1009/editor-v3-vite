module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',

    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 0, // 驼峰报错-横线
    '@typescript-eslint/no-var-requires': 0, // require导入
    'vue/require-default-prop': 0 // props默认值
  }
}

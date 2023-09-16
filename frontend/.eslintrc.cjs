module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import',  "unused-imports"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",  // 組み込みモジュール
          "external", // npmでインストールした外部ライブラリ
          "internal", // 自作モジュール
          [
            "parent",
            "sibling"
          ],
          "object",
          "type",
          "index"
        ],
        "newlines-between": "always", // グループ毎にで改行を入れる
        "pathGroupsExcludedImportTypes": [
          "builtin"
        ],
        "alphabetize": {
          "order": "asc", // 昇順にソート
          "caseInsensitive": true // 小文字大文字を区別する 
        },
        "pathGroups": [ // 指定した順番にソートされる
          {
            "pattern": "@/components/common",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/components/hooks",
            "group": "internal",
            "position": "before"
          },
        ]
      }
    ],
    "unused-imports/no-unused-imports": "error"
  },
}

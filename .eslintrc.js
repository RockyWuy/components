module.exports = {
    extends: [
        'eslint-config-alloy/react',
        'eslint-config-alloy/typescript',
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        // jQuery: false,
    },
    rules: {
        // 这里填入你的项目需要的个性化配置，比如：
        // 一个缩进必须用两个空格替代
        '@typescript-eslint/indent': [
            'error',
            4
        ],
        // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq': [
            'error',
            'always',
            { null: 'ignore' }
        ],
        // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
        // 'typescript/class-name-casing': ['error']

        'no-confusing-arrow': ['off'], // 箭头函数
    }
}
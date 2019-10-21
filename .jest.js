module.exports = {
    setupFiles: [ // 配置文件，在运行测试案例代码之前，Jest会先运行这里的配置文件来初始化指定的测试环境
        './test/setup.js'
    ],
    moduleFileExtensions: [ // 代表支持加载的文件名
        "ts",
        "tsx",
        "js",
        "jsx",
    ],
    testPathIgnorePatterns: [ // 用正则来匹配不用测试的文件
        "/node_modules/"
    ],
    transform: { // 用来匹配各种文件后缀，然后进行对应的预处理
        "\\.tsx?$": "ts-jest",
        "\\.js$": "ts-jest",
    },
    testRegex: ".*\\.test\\.js$", // 正则表示的测试文件，测试文件的格式为xxx.test.js
}
const webpackConfig = require('./webpack.config')

webpackConfig.entry = undefined
webpackConfig.mode = 'development'
module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            { pattern: 'test/**/*.ts' }
        ],
        preprocessors: {
            'test/**/*.ts': ['webpack']
        },
        reporters: ['mocha'],
        browsers: ['ChromeHeadless'],
        singleRun: true,
        webpack: webpackConfig,
    })
}
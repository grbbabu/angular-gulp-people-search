
module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['mocha-debug', 'mocha', 'sinon', 'chai'],
        files: [
            'bower_components/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/sinon/pkg/sinon.js',
            'client/**/*.module.js',
            'client/**/*.config.js',
            'client/**/*.js',
            'client/**/*.spec.js'
        ],

        plugins: [
            'karma-mocha',
            'karma-sinon',
            'karma-chai',
            'karma-mocha-debug',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],
        
        reporters: ['mocha'],
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};

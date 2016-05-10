/*
 * grunt-se-runner
 * https://github.com/Hyddan/grunt-se-runner
 *
 * Copyright (c) 2016 Daniel Hedenius
 * Licensed under the WTFPL-2.0 license.
 */

'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        seRunner: {
            example: {
                options: {
                    capabilities: [
                        {
                            browserName: 'firefox'
                        },
                        {
                            browserName: 'chrome'
                        }
                    ],
                    context: {},
                    dependencies: [],
                    driverFactory: {
                        create: function (capabilities) {
                            return new (require('selenium-webdriver')).Builder()
                                        .usingServer(this.selenium.hub)
                                        .withCapabilities(capabilities)
                                        .build();
                        }
                    },
                    framework: 'jasmine',
                    logLevel: 'INFO',
                    tests: [
                        'test/*.js'
                    ],
                    timeout: 60000,
                    selenium: {
                        hub: 'http://hub.browserstack.com/wd/hub'
                    },
                    jasmine: {
                        dependencies: [],
                        timeout: 60000
                    }
				}
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
/*
 * grunt-se-runner
 * https://github.com/Hyddan/grunt-se-runner
 *
 * Copyright (c) 2016 Daniel Hedenius
 * Licensed under the WTFPL-2.0 license.
 */

'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('seRunner', 'Grunt task for se-runner', function () {
        require('se-runner').create(this.options({
            capabilities: [],
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
            tests: [],
            timeout: 60000,
            selenium: {
                hub: 'http://hub.browserstack.com/wd/hub'
            },
            jasmine: {
                dependencies: [],
                timeout: 60000
            }
        })).run(this.async());
    });
};
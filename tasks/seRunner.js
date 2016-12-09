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
        var done = this.async();
        require('se-runner').create(this.options({
            capabilities: [],
            concurrency: 1,
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
                consoleReporter: true,
                dependencies: [],
                timeout: 60000
            }
        })).run(function (data) {
            var summaryReports = data.reports.map(function (r) {
                var errors = [];
                if (!r.report.success) {
                    Object.keys(r.report.result).forEach(function (suite) {
                        Object.keys(r.report.result[suite].specs).forEach(function (spec) {
                            0 < r.report.result[suite].specs[spec].log.length && errors.push(r.report.result[suite].specs[spec].log);
                        });
                    });
                }

                return {
                    description: r.description,
                    duration: (r.report || {}).duration,
                    errors: errors,
                    succeeded: (((r.report || {}).metrics || {}).specs || {}).succeeded || 0,
                    total: (((r.report || {}).metrics || {}).specs || {}).total || 0
                };
            });

            if (!data.success) {
                if (data.error) {
                    grunt.log.error('\n');
                    grunt.log.error(data.error.message + '\n');
                    grunt.log.error(data.error.stack);
                    grunt.log.error('\n');
                }
                else {
                    var errorReports = summaryReports.filter(function (r) {
                        return 0 < r.errors.length;
                    });
                    
                    grunt.log.error('\n');
                    errorReports.forEach(function (r) {
                        grunt.log.error(r.description + '\n');
                        r.errors.forEach(function (e) {
                            e.forEach(function (line) {
                                grunt.log.error('* ' + line + '\n');
                            });
                            grunt.log.error('\n');
                        });
                    });
                }
            }
            else {
                var metrics = summaryReports.reduce(function (aggregate, value) {
                    return {
                        duration: value.duration + aggregate.duration,
                        succeeded: value.succeeded + aggregate.succeeded,
                        total: value.total + aggregate.total
                    };
                }, {
                    duration: 0,
                    succeeded: 0,
                    total: 0
                });

                grunt.log.write('\nRan {succeeded} of {total} specs '.replace('{succeeded}', metrics.succeeded).replace('{total}', metrics.total));
                grunt.log.write('successfully'['green']);
                grunt.log.writeln(' in {duration} seconds.'.replace('{duration}', metrics.duration));
            }

            done(data.success);
        });
    });
};
# grunt-se-runner

> Grunt task for [se-runner](https://github.com/Hyddan/se-runner#readme)

## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-se-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-se-runner');
```

## NPM package
* https://npmjs.com/package/grunt-se-runner

## SeRunner task
_Run this task with the `grunt seRunner` command._

### Overview
In your project's Gruntfile, add a section named `seRunner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  seRunner: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### capabilities
Type: `Array`
Default value: `[]`

A list of WebDriver capabilities to start on the Selenium hub.

#### concurrency
Type: `Number`
Default value: `1`

Number of concurrent processes that will be run.

#### context
Type: `Object`
Default value: `{}`

Any values specified here will be added to the context that is passed into each test suite.

#### dependencies
Type: `Array`
Default value: `[]`

A list of dependencies to load before running the tests.

#### driverFactory.create
Type: `Function`
Default value: `See example below`

Provides a way to change how the WebDriver is instantiated or switch to a different WebDriver implementation. This function will be passed into a separate process and as such can contain no references to a different scope than its own.
You can however use the Node.Js require() function inside of the driverFactory.create function. It will also be bound to the configuration object so you will have access to any values in there through the `this` property.

#### framework
Type: `String`
Default value: `jasmine`

Which test framework to use. The test runner will load the framework adaptor: se-runner-framework-[Framework]. All framework adaptors need to be installed separately.

#### logLevel
Type: `String`
Default value: `INFO`

Possible values are: NONE, ERROR, WARNING, INFO & DEBUG.

#### tests
Type: `Array`
Default value: `[]`

A list of files or globbing patterns to find tests to be run.

#### timeout
Type: `Number`
Default value: `60000`

Default timeout in milliseconds. This value will also be passed to the framework adaptor (if not overridden in the framework specific configuration).

#### selenium.hub
Type: `String`
Default value: `http://hub.browserstack.com/wd/hub`

Url to the Selenium Hub to connect to.

#### [framework]
Type: `Object`
Default value: `{}`

Any values given here will be passed into the framework adaptor.

#### [framework].consoleReporter
Type: `Boolean`
Default value: `true`

Whether the framework adaptor should report to the console as things are happening or not.

#### [framework].dependencies
Type: `Array`
Default value: `[]`

A list of dependencies for the framework adaptor to load before running the tests.

#### [framework].timeout
Type: `Number`
Default value: `60000`

Overrides the default timeout for the framework adaptor only.

### Usage Examples

#### Options

```js
grunt.initConfig({
  seRunner: {
    options: {
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
            consoleReporter: true,
            dependencies: [],
            timeout: 60000
        }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2016-12-09   v1.1.0   Indicate grunt success/failure based on result from SeRunner.
 * 2016-06-13   v1.0.1   Fixed peerDependencies.
 * 2016-05-10   v1.0.0   Initial version.

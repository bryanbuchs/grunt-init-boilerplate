/*
 * grunt-init-project
 */

'use strict';

// Basic template description.
exports.description = 'project boilerplate';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description'),
    // init.prompt('author_name'),
    // init.prompt('author_email'),
    // init.prompt('author_url'),
    init.prompt('version'),
    // init.prompt('repository'),
    // init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('jquery_version', '1.10.2'),

    {
      name: 'fancybox',
      message: 'include jquery.fancybox?',
      default: 'Y/n'
    },
    {
      name: 'cycle',
      message: 'include jquery.cycle?',
      default: 'Y/n'
    },
    {
      name: 'easing',
      message: 'include jquery.easing?',
      default: 'Y/n'
    },
    {
      name: 'mmenu',
      message: 'include jquery.mmenu?',
      default: 'Y/n'
    }

  ], function(err, props) {

    props.mmenu = /y/i.test(props.mmenu);
    props.fancybox = /y/i.test(props.fancybox);
    props.cycle = /y/i.test(props.cycle);
    props.easing = /y/i.test(props.easing);

    props.keywords = [];
    props.devDependencies = {
      "grunt": "~0.4.2",
      "grunt-contrib-watch": "~0.3.1",
      "grunt-contrib-concat": "~0.3.0",
      "grunt-contrib-jshint": "~0.7.2",
      "grunt-contrib-uglify": "~0.2.7",
      // "jpegtran-bin": "~0.2.0",
      // "grunt-contrib-imagemin": "~0.3.0",
      "grunt-recess": "~0.4.0",
      "grunt-glue": "~0.1.1",
      "grunt-contrib-copy": "~0.4.1",
      "load-grunt-tasks": "~0.2.0",
      "jshint-stylish": "~0.1.4"
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    // init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};

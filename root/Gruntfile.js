/*global module:false*/
module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  // Only load from devDependencies
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
              ' * <%= pkg.title %> \n' +
              ' * @kapow \n' +
              ' * v<%= pkg.version %> <%= grunt.template.today("mm-dd-yyyy") %> \n' +
              ' *\n' +
              ' */\n\n',


    // IMAGES

    glue: {
      master: {
        src: 'images/icons/',
        options: '--css=less --img=images/css --less --optipng --margin=10 --sprite-namespace= --namespace=icon'
      }
    },


    // STYLES

    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      },
      master: {
        options: {
          compress: true
        },
        src: [
          {% if (fancybox) { %}
          'components/fancybox/source/jquery.fancybox.css',
          {% } %}
          {% if (mmenu) { %}
          'components/jQuery.mmenu/src/css/jquery.mmenu.css',
          'components/jQuery.mmenu/src/css/extensions/jquery.mmenu.positioning.css',
          'components/jQuery.mmenu/src/css/extensions/jquery.mmenu.themes.css',
          {% } %}
          'less/<%= pkg.name %>.less'
        ],
        dest: 'css/<%= pkg.name %>.css'
      }
    },


    // JAVASCRIPT

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        '-W032': true, // supress "Unnecessary semicolon." errors
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: [
        'Gruntfile.js'
      ],
      master: [
        'src/*.js'
      ]
    },

    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '<%= banner %>'
      },
      master: {
        files: {
          'js/<%= pkg.name %>.js': [
            // any script plugins:
            {% if (mmenu) { %}
            'components/jQuery.mmenu/src/js/jquery.mmenu.js',
            {% } %}
            {% if (fancybox) { %}
            'components/fancybox/source/jquery.fancybox.js',
            {% } %}
            {% if (cycle) { %}
            'components/jquery-cycle/jquery.cycle.all.js',
            {% } %}
            {% if (easing) { %}
            'components/jquery.easing/js/jquery.easing.js',
            {% } %}
            // ... and all of our app scripts
            'src/*.js'
          ]
        }
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      master: {
        files: {
          'js/<%= pkg.name %>.min.js': [
            // don't re-compile, just minify
            'js/<%= pkg.name %>.js'
          ]
        }
      }
    },


    // FILE MANAGEMENT

    copy: {
      {% if (fancybox) { %}
      fancybox: {
        cwd: 'components/fancybox/source',
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          '*.gif',
          '*.png'
        ],
        dest: 'images/fancybox/'
      },
      {% } %}
      jquery: {
        src: 'components/jquery/jquery.min.js',
        dest: 'js/jquery.min.js'
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: ['src/*.js'],
        tasks: [
          'jshint:master',
          'concat:master',
          'uglify:master'
        ]
      },
      sprites: {
        files: ['images/icons/*'],
        tasks: ['glue']
      },
      styles: {
        files: ['less/*.less'],
        tasks: ['recess']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'concat',
    'uglify',
    'recess'
  ]);

};

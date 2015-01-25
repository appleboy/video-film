/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

  grunt.config.set('copy', {
    dev: {
      files: [{
        expand: true,
        cwd: './assets',
        src: ['**/*.!(coffee|less)'],
        dest: '.tmp/public'
      }, {
        expand: true,
        cwd: './assets/vendor/bootstrap',
        src: ['fonts/**/*'],
        dest: '.tmp/public'
      }, {
        expand: true,
        cwd: './assets/vendor/font-awesome',
        src: ['fonts/**/*'],
        dest: '.tmp/public'
      }, {
        expand: true,
        cwd: './assets/vendor/video.js/dist/video-js',
        src: ['font/**/*'],
        dest: '.tmp/public/min'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'www'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};

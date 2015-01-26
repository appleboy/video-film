/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */

var uuid = require('./uuid');

module.exports = function(grunt) {

	grunt.config.set('cssmin', {
		dist: {
			src: ['.tmp/public/concat/production.css'],
			dest: '.tmp/public/min/production.' + uuid() + '.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};

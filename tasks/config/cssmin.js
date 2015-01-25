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
module.exports = function(grunt) {

  var filename = grunt.file.readJSON('package.json').version + '.' + grunt.template.today('yyyymmdd');
	grunt.config.set('cssmin', {
		dist: {
			src: ['.tmp/public/concat/production.css'],
			dest: '.tmp/public/min/production.' + filename + '.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};

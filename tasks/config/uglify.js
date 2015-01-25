/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

  var filename = grunt.file.readJSON('package.json').version + '.' + grunt.template.today('yyyymmdd');
	grunt.config.set('uglify', {
		dist: {
			src: ['.tmp/public/concat/production.js'],
			dest: '.tmp/public/min/production.' + filename + '.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};

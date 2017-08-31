module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat:{
			all:{
				options: {
					banner: '/**\n' +
					'*** <%= pkg.name %> - <%= pkg.version %>\n' +
					'*** <%= pkg.homepage %>\n' +
					'*** Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
					'*** License: <%= pkg.license %>\n' +
					'**/\n'
				},
				src:[
					"src/*.js"
				],
				dest: 'dist/pagebreak.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				sourceMap: true
			},
			all:{
				src:'dist/pagebreak.js',
				dest:'dist/pagebreak.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);

};

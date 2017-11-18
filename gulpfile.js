//References to dependencies
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	runSequence = require('run-sequence'),
	del = require('del');
var bower = require('./bower.json'),
	pack = require('./package.json');
var path = pack['path'];

//Task Code
var js_path = {
	js: [
		'bower_components/angular/angular.js',
		path.dist+'/angular-console.min.js'
	]
};
var taskObj = {
	uglify:function(){
		return gulp.src(path.src + '/*.js')
			.pipe(gulp.dest(path.dist))
			.pipe(plugins.uglify())
			.pipe(plugins.rename('angular-console.min.js'))
			.pipe(gulp.dest(path.dist));
	},
	clear:function(done){
		return del([
	        path.dist,
	        'example/angular-console.js',
	        'example/angular-console.min.js'
	    ], done);
	},
	copyJs:  function () {
		return gulp.src(js_path.js)
			.pipe(gulp.dest('example'));
	},
	watch: function () {
		gulp.watch('example/*.*', function() {
			runSequence('reload');
		});
	},
	reload:function () {
		gulp.src('example/*.html')
			.pipe(plugins.connect.reload());
	},
	connect: function() {
		plugins.connect.server({
			root: 'example',
			port: 8081,
			livereload: true
		});		
	},
	build: function(done){
		runSequence(['clear'],'uglify','copy:js',done);
	},
	serve: function (done) {
		runSequence('build','connect','watch',done);
	}
};

gulp.task('copy:js',taskObj.copyJs);
gulp.task('watch', taskObj.watch);
gulp.task('reload', taskObj.reload);
gulp.task('connect', taskObj.connect);
gulp.task('build',taskObj.build);
gulp.task('serve',taskObj.serve);

gulp.task('uglify',taskObj.uglify);
gulp.task('clear', taskObj.clear);
//Run the test cases
gulp.task('default', ['serve']);

//Release new versions of the software
gulp.task('release',
	['clear',
	'uglify']
);
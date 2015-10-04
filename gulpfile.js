// Dependencies

var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var size = require('gulp-size');
var less = require('gulp-less');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var bower = require('main-bower-files');
var browserSync = require('browser-sync').create();
var browserSyncTest = require('browser-sync').create();
var watch = require('gulp-watch');
var sort = require('gulp-sort');

// Overrides

var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

// Tasks

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
      .pipe(jshint({
          multistr: true,
          laxbreak: true
      }))
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function () {
  return gulp.src('./build', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('css', ['clean'],  function() {
  return gulp.src(['./src/**/*.less', '!./src/**/includes/**/*.less'])
    .pipe(less())
    //.pipe(concat('techcon-demo.css'))
    .pipe(gulp.dest('./build'))
    .pipe(size({ showFiles: true }));
});

gulp.task('cache-templates', ['clean'], function() {
  return gulp.src('./src/**/*.tpl.html')
    .pipe(templateCache({
      standalone: true,
      moduleSystem: 'IIFE',
      module: 'techcon-demo.templates'
    }))
    .pipe(rename('techcon-demo.tpl.js'))
    .pipe(gulp.dest('./build'))
    .pipe(size({ showFiles: true }));
});

gulp.task('inject-app', ['cache-templates', 'lint', 'css'], function () {
  return gulp.src('./src/index.html', { base: './' })
    .pipe(inject(gulp.src(bower({
      includeSelf: true,
    })), {
      name: 'bower',
      relative: true,
      addRootSlash: false
    }))
    .pipe(inject(gulp.src(['./src/**/*.js', '!./src/**/*.spec.js', './build/techcon-demo.tpl.js'])
      .pipe(angularFilesort()), {
        name: 'src',
        relative: true,
        addRootSlash: false
      }))
    .pipe(inject(gulp.src(['./build/**/*.css'])
      .pipe(sort()), {
        name: 'src',
        relative: true,
        addRootSlash: false
      }))
    .pipe(gulp.dest('./'));
});

gulp.task('inject-tests', ['cache-templates', 'lint'], function () {
  return gulp.src('./SpecRunner.html', { base: './' })
    .pipe(inject(gulp.src(bower({
      includeDev: true,
      includeSelf: true
    })), {
      name: 'bower',
      relative: false,
      addRootSlash: false
    }))
    .pipe(inject(gulp.src(['./src/**/*.js', '!./src/**/*.spec.js', './build/techcon-demo.tpl.js'])
      .pipe(angularFilesort()), {
        name: 'src',
        relative: false,
        addRootSlash: false
      }))
    .pipe(inject(gulp.src('./src/**/*.spec.js'), {
      name: 'specs',
      relative: false,
      addRootSlash: false
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: './'
    },
    startPath: './src/index.html',
    port: 3100,
    ui: {
      port: 3101
    },
    ghostMode: false
  });
  browserSyncTest.init({
    server: {
      baseDir: './'
    },
    startPath: './SpecRunner.html',
    port: 3102,
    ui: {
      port: 3103
    },
    ghostMode: false
  });

  watch(['./src/**/*.{less,html,js}', '!./src/index.html'], function (vinyl) {
    gutil.log(gutil.colors.yellow('File ' + vinyl.path + ' was ' + vinyl.event + ', running tasks...'));
    gulp.start('build').on('end', function () { });
  });

  watch('./src/**/*.spec.js', function (vinyl) {
    gutil.log(gutil.colors.yellow('File ' + vinyl.path + ' was ' + vinyl.event + ', running tasks...'));
    gulp.start('inject-tests');
  });

  gulp.watch('./src/index.html').on('change', browserSync.reload);
  gulp.watch('./SpecRunner.html').on('change', browserSyncTest.reload);
});

gulp.task('build', ['inject-app', 'inject-tests']);
gulp.task('default', ['build']);

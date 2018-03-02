

/* http://putaindecode.io/fr/articles/js/gulp/
 * https://la-cascade.io/gulp-pour-les-debutants/
 * https://www.alsacreations.com/tuto/lire/1686-introduction-a-gulp.html
 * https://code.tutsplus.com/tutorials/managing-your-build-tasks-with-gulpjs--net-36910
 * https://www.npmjs.com/package/gulp-replace
 * README.md in node_modules/......
 *
 */

var gulp = require('gulp');

gulp.task('hello', () => {
	console.log('hello world of gulp');
});


gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src('source/*.html').pipe(gulp.dest('public'));
});

gulp.task('copyJs', function() {
  // copy any html files in source/ to public/
	console.log('copyJs task at', new Date());
  gulp.src('js/*.js')
//		.pipe(() => console.log('here'))
		.pipe(gulp.dest('public'));
});

var through2 = require('through2')
const fs = require('fs')

gulp.task('custom', () => {
	fs.createReadStream('ex.txt')
  .pipe(through2(function (chunk, enc, callback) {

		console.log('enc=', enc);
		console.log('chunk.length=', chunk.length);
		console.log('chunk=', chunk);
    for (var i = 0; i < chunk.length; i++)
      if (chunk[i] == 97)
        chunk[i] = 122 // swap 'a' for 'z'
      else if (chunk[i] == 122)
        chunk[i] = 97 // swap 'z' for 'a'

    this.push(chunk)

    callback()

   }))
  .pipe(fs.createWriteStream('out.txt'))
});


/*
 * https://www.npmjs.com/package/gulp-replace
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
 *
 * npm install gulp-replace
 */

var replace = require('gulp-replace');
 
gulp.task('templates', function(){
  gulp.src(['file.txt'])
    // See http://mdn.io/string.replace#Specifying_a_string_as_a_parameter 
//    .pipe(replace(/foo(.{3})/g, '$1foo'))
    .pipe(replace(/^foo/mg, 'bgn')) // Replace line beginning with foo by bgn
    .pipe(replace(/foo$/mg, 'end')) // Replace line ending with foo by end
    .pipe(gulp.dest('build/'));
});

gulp.watch('source/*.html', ['copyHtml'])
gulp.watch('js/*.js', ['copyJs'])
gulp.watch('ex.txt', ['custom'])
gulp.watch('file.txt', ['templates'])


gulp.task('default', ['hello','copyHtml', 'copyJs', 'custom', 'templates']);

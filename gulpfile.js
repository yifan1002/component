var gulp = require('gulp');
var browserSync = require('browser-sync');


//任务1：清理目录
gulp.task('clean', function(){
	return gulp.src(['./dist/html','./dist/js','./dist/css','./dist/img'])
		.pipe($.clean());
});

//任务2：合并+压缩js
gulp.task('min-js', function(){
	return gulp.src('./src/js/*.js')
		.pipe($.concat('all.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('./dist/js'));
});

//任务3：制作雪碧图、生成css
gulp.task('sprite',function(){
    return gulp.src('./src/img/icon/*')
        .pipe($.spritesmith({
            imgName:'img/sprite.png',   //保存合并后图片的地址
            cssName:'css/_____sprite.temp.css',   //保存合并后对于css样式的地址
            padding:2,					//每个图片之间的间距，默认为0
            algorithm:'top-down',	//如何排布合并图片，默认“binary-tree” 可选参数有：top-down、left-right、diagonal、alt-diagonal、binary-tree
            cssTemplate:"./src/template/cssTemplate.css"
        }))
        .pipe(gulp.dest('./src'));
});

//任务4：编译scss
gulp.task('compile-scss', function(){
	return gulp.src('./src/scss/*.scss')
		.pipe($.sass())
		.pipe($.concat('_____compile.temp.css'))
		.pipe(gulp.dest('./src/css'));
});

//任务5：合并+压缩css，并删除零时生成的scss
gulp.task('min-css', function(){
	return gulp.src('./src/css/*.css')
		.pipe($.concat('all.min.css'))
		.pipe($.csso())
		.pipe(gulp.dest('./dist/css'));
});

//任务6：压缩html
gulp.task('min-html', function(){
	return gulp.src('./src/html/*.html')
		//.pipe($.minifyHtml())
		.pipe(gulp.dest('./dist/html'));
});

//任务7：复制图片
gulp.task('images', function() { 
  return gulp.src(['./src/img/**/*.{jpg,png,gif,ico,svg}', '!./src/img/icon/*'])
    .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist/img'))
});

//任务8：监控文件，若有变化自动执行任务
gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['min-js']);
	gulp.watch('src/scss/*.scss', ['compile-scss','min-css']);
	gulp.watch('src/img/icon/*.png', ['sprite','min-css']);
	gulp.watch('src/css/*.css', ['min-css']);
	gulp.watch('src/html/*.html', ['min-html']);
	gulp.watch('src/img/**/*', ['images']);
});

//任务9：文件变化，自动刷新浏览器
gulp.task('auto', function(){
    browserSync.init({
    	files:['**'],
        server:{
            baseDir: './'  // 设置服务器的根目录
            //index:'./html/index.html' // 指定默认打开的文件
        },
        port:8080  // 指定访问服务器的端口号
    });
});


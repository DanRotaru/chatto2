require('dotenv').config()
const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');

var uglifyJs = uglify;

function scss() {
    // sass --no-source-map --watch index.scss:index.css
    if(process.env.minifyCSS == '1'){
        return src('./public/css/modules/index.scss')
        .pipe(sass())
        .pipe(concat('index.css'))
        .pipe(uglifycss())
        .pipe(dest('./public/css'))
    }
    else{
        return src('./public/css/modules/index.scss')
        .pipe(sass())
        .pipe(concat('index.css'))
        .pipe(dest('./public/css'))
    }
}


function js() {
    const files = [
        './public/js/modules/main.js',
        './public/js/modules/header.js',
        './public/js/modules/account.js',
        './public/js/modules/garage.js',
        './public/js/modules/shop.js',
        './public/js/modules/chat.js',
        './public/js/modules/lottery.js',
        './public/js/modules/clans.js',
        './public/js/modules/tasks.js',
        './public/js/modules/settings.js',
    ];

    if(process.env.production == 1){
        // files.splice( 2, 0, './public/assets/garage/viewer.js');
        return src(files)
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(dest('./public/js/'));
    }
    else{
        if(process.env.minifyJS == '1'){
            return src(files)
            .pipe(concat('index.js'))
            .pipe(uglify())
            .pipe(dest('./public/js/'));
        }
        else {
            return src(files)
            .pipe(concat('index.js'))
            .pipe(dest('./public/js/'));
        }
    }
}

function vendorjs() {
    const files = [
        './public/js/vendor/jquery.min.js',
        './public/js/vendor/socket.io.js',
        './public/js/vendor/jquery.kinetic.min.js'
    ];
    return src(files)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(dest('./public/js/'));
}

exports.default = function(){
    watch('public/css/modules/*.scss', scss);
    watch('public/js/modules/*.js', js);

    watch('public/js/vendor/*.js', vendorjs);
}
'use strict'

const fs               = require('fs')
const path             = require('path')

const config           = require('./gulp.config')
const banner           = require('./css.banner')

const env              = require('minimist')(process.argv.slice(2))
const gulp             = require('gulp')
const gulpFn           = require('gulp-fn')
const babel            = require('gulp-babel')
const eslint           = require('gulp-eslint')
const plumber          = require('gulp-plumber')
const connect          = require('gulp-connect')
const postCSS          = require('gulp-postcss')
const preCSS           = require('precss')
const rucksack         = require('rucksack-css')
const cssnano          = require('cssnano')
const cssPresetEnv     = require('postcss-preset-env')
const customProperties = require('postcss-custom-properties')
const customSelector   = require('postcss-custom-selectors')
const webpack          = require('webpack-stream')
const UglifyJsPlugin   = require('uglifyjs-webpack-plugin')
const nunjucks         = require('gulp-nunjucks-render')
const autoprefixer     = require('autoprefixer')
const cssfor           = require('postcss-for')
const minifyHtml       = require('gulp-minify-html')
const gulpif           = require('gulp-if')
const processors       = [preCSS(), cssPresetEnv(), rucksack(), customSelector(), customProperties(), cssnano(), autoprefixer()]

function handleError(err) {
  console.log(err.toString())
  this.emit('end')
}

function cssBanner(file) {
  console.info('appending banner')

  let minifiedCss = fs.readFileSync(file, 'utf8').toString(),
  stream = fs.createWriteStream(file)

  stream.once('open', fd => {
    stream.write(`${banner}\n\n${minifiedCss}`)
    stream.end()
  })

  console.info('::banner appended successfully::')
}

// Task nunjucks
gulp.task('nunjucks', function(){
    return gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(nunjucks({
            searchPaths: ['src']
        }))
        .pipe(gulpif(env.p, minifyHtml()))
        .pipe(gulp.dest(`${config.dist.template}`));
});

// Task styles
gulp.task('styles', () => {
  return gulp
  .src(`${config.dev.css}/*.css`)
  .pipe(plumber())
  .pipe(postCSS(processors))
  .on('error', handleError)
  .pipe(gulp.dest(config.dist.css))
  .pipe(gulpFn((file, enc) => {
    cssBanner(file.path)
  }))
  .pipe(connect.reload())
})

// Task scripts
gulp.task('scripts', () => {
  let webpackEntries = {}
  fs
  .readdirSync(config.dev.js.templates)
  .forEach(
    file =>
    (webpackEntries[`${file.substr(0, file.lastIndexOf('.'))}`] = `${config.dev.js.templates}/${file}`)
    )
  return gulp
  .src(`${config.dev.js.templates}/**/*.js`)
  .pipe(eslint())
  .pipe(eslint.format()) 
  .pipe(
    webpack({
      mode: 'production',
      module: {
        rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env']
          }
        }
        ]
      },
      entry: webpackEntries,
      output: {
        filename: '[name].js'
      },
      plugins: [new UglifyJsPlugin()]
    })
    )
  .on('error', handleError)
  .pipe(gulp.dest(config.dist.js))
  .pipe(connect.reload())
})


// Gulp task default
gulp.task('default', () => {
  connect.server({
    livereload: true,
    root: ['.'],
    port: config.connect.port,
    host: config.connect.host
  })
  gulp.watch(`${config.dev.template}/**/*.html`, ['nunjucks'])
  gulp.watch(`${config.dev.css}/**/*.css`, ['styles'])
  gulp.watch(`${config.dev.js.main}/**/*.js`, ['scripts'])
})
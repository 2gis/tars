'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;

const staticFolderName = tars.config.fs.staticFolderName;
const imagesFolderName = tars.config.fs.imagesFolderName;
const preprocExtension = tars.cssPreproc.mainExt;
const preprocName = tars.cssPreproc.name;

/**
 * Make sprite for svg and styles for this sprite
 * Return pipe with styles for sprite
 */
module.exports = function () {

    return gulp.task('css:make-sprite-for-svg', function (cb) {

        if (tars.config.useSVG) {
            return gulp.src('./dev/' + staticFolderName + '/' + imagesFolderName + '/minified-svg/*.svg')
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while making sprite for svg.', error);
                    }
                }))
                .pipe(skipTaskWithEmptyPipe('css:make-sprite-for-svg', cb))
                .pipe(tars.require('gulp-svg-spritesheet')({
                    cssPathSvg: '',
                    templateSrc: './markup/' + staticFolderName
                                    + '/' + preprocName + '/sprite-generator-templates/'
                                    + preprocName + '.svg-sprite.mustache',
                    templateDest: './markup/' + staticFolderName
                                    + '/' + preprocName + '/sprites-' + preprocName
                                    + '/svg-sprite.' + preprocExtension
                }))
                .pipe(gulp.dest('./dev/' + staticFolderName + '/' + imagesFolderName + '/svg-sprite/sprite.svg'))
                .pipe(
                    notifier.success(
                        preprocName.charAt(0).toUpperCase() + preprocName.slice(1) + ' for svg-sprite is ready.'
                    )
                );
        } else {
            tars.skipTaskLog('css:make-sprite-for-svg', 'SVG is not used');
            cb(null);
        }
    });
};

'use strict';

var watcherLog = tars.helpers.watcherLog;
var globsToWatch = [
    'markup/' + tars.config.fs.staticFolderName + '/' + tars.cssPreproc.name + '/**/*.' + tars.cssPreproc.ext,
    'markup/' + tars.config.fs.staticFolderName + '/' + tars.cssPreproc.name + '/**/*.css'
];

/**
 * Watcher for common scss(less or stylus)-files and scss(less or stylus)-files of plugins
 */
module.exports = function () {
    return tars.packages.chokidar.watch(globsToWatch, {
        ignored: '',
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        watcherLog(event, path);
        tars.packages.gulp.start('css:compile-css');

        if (tars.flags.ie8 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie8');
        }

        if (tars.flags.ie9 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie9');
        }
    });
};

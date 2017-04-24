var fs = require('fs');
var path = require('path');
var dir = 'fff\\aaa';

// fs.existsSync(pathtmp)

mkdirsSync(dir,1)

function mkdirsSync(dirpath, mode) { 
    console.log('1')
    if (!fs.existsSync(dirpath)) {
        console.log('2')
        var pathtmp;
        console.log( dirpath.split(path.sep))
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            console.log(pathtmp)
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true; 
}
module.exports = function (fileName){
    var ignoreGlob = /.css.d.ts$/;
    var returnValue = true;
    if(fileName.match(ignoreGlob)){
        returnValue = false;
    }

    return returnValue;
};
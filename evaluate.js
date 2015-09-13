var schemas = require('./Schema2').build();
//console.log(JSON.stringify(schemas));
/**
 * 静态评估
 * @param {Matrix} matrix
 * @returns {number}
 */
exports.evaluate = function (matrix) {
    //console.log(matrix.toString());
    var value = 0;
    for (var i = 0, length = schemas.length; i < length; i++) {
        var schema = schemas[i];
        var matches = matrix.findSchema(schema.schema);
        value += matches.length * schema.score;
        //console.log(matches.length, 'm len');
    }
    return value;
};
/**
 * 静态评估
 *
 * @param {Matrix} matrix
 * @param {Array} schema
 * @returns {number}
 */
exports.evaluate = function (matrix, schema) {
    var last = matrix.getLastMove();
    var x = last[0];
    var y = last[1];
    var player = last[2];
    var _4d = matrix.getFour(x, y);
    var key = (player === 1 ? 'max' : 'min');

    var total = 0;
    for (var i = 0; i < _4d.length; i++) {
        var d = _4d[i];

        for (var j = 0; j < schema.length; j++) {
            if (schema[j][key].exec(d)) {
                total += schema[j].score;
                break;
            }
        }
    }
    return (player === 1 ? total : -total);
};
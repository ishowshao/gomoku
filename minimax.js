var step = 0;
var miniMax = function (depth, m) {
    if (step % 2 === 0) {
        return max(depth, m);
    } else {
        return min(depth, m);
    }
};

var Matrix = require('./Matrix');
var Chessboard = require('./Chessboard');
var matrix = new Matrix(15);
matrix.setValueByCoordinate(8, 8, Chessboard.BLACK);

var evaluate = function () {
    return 0;
};

var count = 0;

var max = function (depth, m) {
    var best = Number.NEGATIVE_INFINITY;
    if (depth <= 0) {
        return evaluate();
    }
    var moves = m.getCoordinatesByValue(0);
    var length = moves.length;
    for (var i = 0; i < length; i++) {
        // make next move
        var co = moves[i];
        m.setValueByCoordinate(co[0], co[1], 1);
        count++;
        var value = min(depth - 1, m);
        // unmake move
        m.setValueByCoordinate(co[0], co[1], 0);
        if (value > best) {
            best = value;
        }
    }
    return best;
};

var min = function (depth, m) {
    var best = Number.POSITIVE_INFINITY;
    if (depth <= 0) {
        return evaluate();
    }
    var moves = m.getCoordinatesByValue(0);
    var length = moves.length;
    for (var i = 0; i < length; i++) {
        // make next move
        var co = moves[i];
        m.setValueByCoordinate(co[0], co[1], 2);
        count++;
        var value = max(depth - 1, m);
        // unmake move
        m.setValueByCoordinate(co[0], co[1], 0);
        if (value < best) {
            best = value;
        }
    }
    return best;
};

console.time('speed');
var result = miniMax(3, matrix);
console.timeEnd('speed');
console.log(result, count);

var player = 1;
var miniMax = function (depth, m, path) {
    if (player === 1) {
        return max(depth, m, path);
    } else {
        return min(depth, m, path);
    }
};

var Matrix = require('./Matrix');
var Chessboard = require('./Chessboard');
var matrix = new Matrix(7);
matrix.setValueByCoordinate(2, 2, Chessboard.BLACK);
matrix.setValueByCoordinate(2, 3, Chessboard.BLACK);
matrix.setValueByCoordinate(4, 2, Chessboard.BLACK);
matrix.setValueByCoordinate(3, 3, Chessboard.BLACK);

//var evaluate = require('./evaluate').evaluate;
var evaluate = require('./evaluate.2').evaluate;
//var evaluate = function () {
//    return 0;
//};

var schema = require('./reg').regs;
var count = 0;
var paths = {};
var bs = [];

var max = function (depth, m, path) {
    var best = Number.NEGATIVE_INFINITY;
    if (depth <= 0) {
        var v = evaluate(m, schema);
        var p = path.slice(0);
        paths[v] = p;
        //if (v === 10206) {
        //    bs.push(p);
        //}
        //console.log(path, v);
        return v;
    }
    var moves = m.getCoordinatesByValue(0);
    var length = moves.length;
    for (var i = 0; i < length; i++) {
        // make next move
        var co = moves[i];
        m.setValueByCoordinate(co[0], co[1], 1);
        path[depth] = [co[0], co[1], 1];
        count++;
        var value = min(depth - 1, m, path);
        // unmake move
        m.setValueByCoordinate(co[0], co[1], 0);
        if (value > best) {
            best = value;
        }
    }
    return best;
};

var min = function (depth, m, path) {
    var best = Number.POSITIVE_INFINITY;
    if (depth <= 0) {
        //return -evaluate();
        //return evaluate(m, schema);
        var v = evaluate(m, schema);
        var p = path.slice(0);
        paths[v] = p;
        //if (v === 10206) {
        //    bs.push(p);
        //}
        //console.log(path, v);
        return v;
    }
    var moves = m.getCoordinatesByValue(0);
    var length = moves.length;
    for (var i = 0; i < length; i++) {
        // make next move
        var co = moves[i];
        m.setValueByCoordinate(co[0], co[1], 2);
        path[depth] = [co[0], co[1], 2];
        count++;
        var value = max(depth - 1, m, path);
        // unmake move
        m.setValueByCoordinate(co[0], co[1], 0);
        if (value < best) {
            best = value;
        }
    }
    return best;
};

console.log('aaa');
console.time('speed');
var path = [];
var result = miniMax(3, matrix, path);
console.timeEnd('speed');
console.log(result, count, paths[result], paths);
var bestPathValue = 0;
var bestPathPath = [];
bs.forEach(function (best) {
    var co = best[best.length - 1];
    matrix.setValueByCoordinate(co[0], co[1], co[2]);
    if (evaluate(matrix, schema) > bestPathValue) {
        bestPathPath = best;
    }
    matrix.setValueByCoordinate(co[0], co[1], 0);
});
console.log(bestPathPath);

bestPathPath.forEach(function (p) {
    if (p) {
        matrix.setValueByCoordinate(p[0], p[1], p[2]);
    }
});
console.log(matrix.toString());

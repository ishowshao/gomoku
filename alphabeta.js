var evaluate = require('./evaluate.2').evaluate;
//var evaluate = require('./evaluate').evaluate;
var MAX_PLAYER = 1;
var MIN_PLAYER = 2;

var Chessboard = require('./Chessboard');
var Matrix = require('./Matrix');
var matrix = new Matrix(15);
matrix.setValueByCoordinate(8, 8, Chessboard.BLACK);
matrix.setValueByCoordinate(8, 9, Chessboard.BLACK);
matrix.setValueByCoordinate(8, 10, Chessboard.BLACK);

var count = 0;

var schema = require('./reg').regs;

function alphabeta(matrix, depth, alpha, beta, player, path) {
    if (depth === 0) {
        //return (player === MAX_PLAYER ? evaluate(matrix) : -evaluate(matrix.copy(true)));
        return evaluate(matrix, schema);
    }
    var moves = matrix.getCoordinatesByValue(0);
    var i;
    var co;
    if (player === MAX_PLAYER) {
        for (i = 0; i < moves.length; i++) {
            co = moves[i];
            matrix.setValueByCoordinate(co[0], co[1], 1);
            count++;
            alpha = Math.max(alpha, alphabeta(matrix, depth - 1, alpha, beta, MIN_PLAYER, path));
            matrix.setValueByCoordinate(co[0], co[1], 0);
            if (beta <= alpha) {
                break;
            }
        }
        path[depth] = [co[0], co[1], 1];
        return alpha;
    } else {
        for (i = 0; i < moves.length; i++) {
            co = moves[i];
            matrix.setValueByCoordinate(co[0], co[1], 2);
            count++;
            beta = Math.min(beta, alphabeta(matrix, depth - 1, alpha, beta, MAX_PLAYER, path));
            matrix.setValueByCoordinate(co[0], co[1], 0);
            if (beta <= alpha) {
                break;
            }
        }
        path[depth] = [co[0], co[1], 2];
        return beta;
    }
}
console.time('speed');
var path = [];
var value = alphabeta(matrix, 3, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, MAX_PLAYER, path);
console.timeEnd('speed');
console.log(value, count, path);
path.forEach(function (p) {
    if (p) {
        matrix.setValueByCoordinate(p[0], p[1], p[2]);
    }
});
console.log(matrix.toString());

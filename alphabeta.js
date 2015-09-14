var evaluate = require('./evaluate').evaluate;
var MAX_PLAYER = 1;
var MIN_PLAYER = 2;

var Chessboard = require('./Chessboard');
var Matrix = require('./Matrix');
var matrix = new Matrix(15);
matrix.setValueByCoordinate(8, 8, Chessboard.BLACK);
matrix.setValueByCoordinate(8, 9, Chessboard.BLACK);
matrix.setValueByCoordinate(8, 10, Chessboard.BLACK);

var count = 0;

function alphabeta(matrix, depth, alpha, beta, player) {
    if (depth === 0) {
        return (player === MAX_PLAYER ? evaluate(matrix) : -evaluate(matrix.copy(true)));
    }
    var moves = matrix.getCoordinatesByValue(0);
    var i;
    var co;
    if (player === MAX_PLAYER) {
        for (i = 0; i < moves.length; i++) {
            co = moves[i];
            matrix.setValueByCoordinate(co[0], co[1], 1);
            count++;
            alpha = Math.max(alpha, alphabeta(matrix, depth - 1, alpha, beta, MIN_PLAYER));
            matrix.setValueByCoordinate(co[0], co[1], 0);
            if (beta <= alpha) {
                break;
            }
        }
        return alpha;
    } else {
        for (i = 0; i < moves.length; i++) {
            co = moves[i];
            matrix.setValueByCoordinate(co[0], co[1], 2);
            count++;
            beta = Math.min(beta, alphabeta(matrix, depth - 1, alpha, beta, MAX_PLAYER));
            matrix.setValueByCoordinate(co[0], co[1], 0);
            if (beta <= alpha) {
                break;
            }
        }
        return beta;
    }
}
console.time('speed');
var value = alphabeta(matrix, 4, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, MAX_PLAYER);
console.timeEnd('speed');
console.log(value, count);

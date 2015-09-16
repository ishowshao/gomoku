var Matrix = require('./Matrix');

/**
 * @class Chessboard
 * @constructor
 */
var Chessboard = function () {
    this.matrix = new Matrix(15);
};

Chessboard.prototype.putPiece = function (x, y) {

};

Chessboard.EMPTY = 0;
Chessboard.BLACK = 1;
Chessboard.WHITE = 2;
Chessboard.notColor = function (color) {
    if (color === Chessboard.BLACK) {
        return Chessboard.WHITE;
    } else {
        return Chessboard.BLACK;
    }
};

module.exports = Chessboard;

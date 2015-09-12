var Matrix = require('./Matrix');
var Chessboard = function () {
    this.matrix = new Matrix(15);
};

Chessboard.prototype.putPiece = function (x, y) {

};

Chessboard.EMPTY = 0;
Chessboard.BLACK = 1;
Chessboard.WHITE = 2;

module.exports = Chessboard;

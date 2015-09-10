define(function () {
    var Chessboard = require('Chessboard');

    /**
     * @class Ai
     * @constructor
     */
    var Ai = function () {
    };

    /**
     * 计算给定状态的黑方或者白方的最好走棋
     *
     * @param {Matrix} matrix
     * @param {number} color
     * @returns {number[]}
     */
    Ai.prototype.best = function (matrix, color) {
        if (color === Chessboard.WHITE) {
            matrix = matrix.copy(true);
        }

        return [0, 0];
    };

    return Ai;
});
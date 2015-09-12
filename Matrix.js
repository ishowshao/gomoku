console.log('class Matrix');

var Chessboard = require('./Chessboard');

/**
 * 用来描述当前状态数据的二维矩阵
 *
 * @class Matrix
 * @param {number} size
 * @constructor
 */
var Matrix = function (size) {
    /**
     * @type {number}
     */
    this.size = size;

    var data = [];
    data.length = size;
    for (var i = 0; i < size; i++) {
        var tmp = [];
        tmp.length = size;
        for (var j = 0; j < size; j++) {
            tmp[j] = 0;
        }
        data[i] = tmp;
    }
    this.data = data;
};

Matrix.prototype.getValueByCoordinate = function (x, y) {
    return this.data[y][x];
};

Matrix.prototype.setValueByCoordinate = function (x, y, value) {
    this.data[y][x] = value;
    return this;
};

/**
 * 获得此矩阵内所有为value的坐标
 *
 * @param value
 * @return {Array}
 */
Matrix.prototype.getCoordinatesByValue = function (value) {
    var result = [];
    var data = this.data;
    var length = this.size;
    for (var y = 0; y < length; y++) {
        var row = data[y];
        for (var x = 0; x < length; x++) {
            if (row[x] === value) {
                result.push([x, y]);
            }
        }
    }
    return result;
};

/**
 * @param {boolean} interchange
 * @returns {Matrix}
 */
Matrix.prototype.copy = function (interchange) {
    var matrix = new Matrix(this.size);
    var size = this.size;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (interchange) {
                var temp = this.data[i][j];
                if (temp === Chessboard.BLACK) {
                    matrix.data[i][j] = Chessboard.WHITE;
                } else if (temp === Chessboard.WHITE) {
                    matrix.data[i][j] = Chessboard.BLACK;
                } else {
                    matrix.data[i][j] = Chessboard.EMPTY;
                }
            } else {
                matrix.data[i][j] = this.data[i][j];
            }
        }
    }
    return matrix;
};

module.exports = Matrix;

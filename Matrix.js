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
    this.lastMove = [x, y, value];
    return this;
};

Matrix.prototype.getLastMove = function () {
    return this.lastMove;
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
    //var s = this.shrink();
    for (var y = 0; y < length; y++) {
        var row = data[y];
        for (var x = 0; x < length; x++) {
            if (row[x] === value) {
                result.push([x, y]);
            }
        }
    }
    //function shuffleArray(array) {
    //    for (var i = array.length - 1; i > 0; i--) {
    //        var j = Math.floor(Math.random() * (i + 1));
    //        var temp = array[i];
    //        array[i] = array[j];
    //        array[j] = temp;
    //    }
    //    return array;
    //}
    //return shuffleArray(result);
    return result;
};

/**
 * @param {Array} schema
 * @return {Array}
 */
Matrix.prototype.findSchema = function (schema) {
    var coordinates = this.getCoordinatesByValue(1);
    var has = [];
    var data = this.data;
    var length = coordinates.length;
    var len = schema.length;
    var coordinate;
    var offset;
    var match = true;
    var temp = [];
    var point;
    for (var y = 0; y < length; y++) {
        coordinate = coordinates[y];
        match = true;
        temp = [];
        for (var x = 0; x < len; x++) {
            offset = schema[x];
            point = [coordinate[0] + offset[0], coordinate[1] + offset[1]];
            temp.push(point);
            if (data[point[1]] === undefined || (data[point[1]] && data[point[1]][point[0]] !== offset[2])) {
                match = false;
                break;
            }
        }
        if (match) {
            has.push(temp);
        }
    }
    return has;
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

/**
 * 缩减
 *
 * @returns {Array}
 */
Matrix.prototype.shrink = function () {
    var minI = this.size - 1;
    var minJ = this.size - 1;
    var maxI = 0;
    var maxJ = 0;
    var size = this.size;
    var data = this.data;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (data[i][j] !== 0) {
                minI = (i < minI ? i : minI);
                minJ = (j < minJ ? j : minJ);
                maxI = (i > maxI ? i : maxI);
                maxJ = (j > maxJ ? j : maxJ);
            }
        }
    }
    return [[minI - 2 > 0 ? minI - 2 : 0, maxI + 2 > size - 1 ? size - 1 : maxI + 2], [minJ - 2 > 0 ? minJ - 2 : 0, maxJ + 2 > size - 1 ? size - 1 : maxJ + 2]];
};

Matrix.prototype.toString = function () {
    var size = this.size;
    var data = this.data;
    var str = '';

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            str += data[i][j];
        }
        str += '\n';
    }
    return str;
};

Matrix.prototype.getFour = function (x, y) {
    var a = '';
    var b = '';
    var c = '';
    var d = '';
    var x0 = 0;
    var y0 = 0;
    var data = this.data;
    var size = this.size - 1;
    for (var i = 0; i < 9; i++) {
        // top to bottom
        x0 = x;
        y0 = y + (-4 + i);
        if (x0 >= 0 && x0 <= size && y0 >= 0 && y0 <= size) {
            a += data[y0][x0];
            //a += '0';
        }
        // top.left to bottom.right
        x0 = x + (-4 + i);
        y0 = y + (-4 + i);
        if (x0 >= 0 && x0 <= size && y0 >= 0 && y0 <= size) {
            b += data[y0][x0];
            //b += '0';
        }
        // left to right
        x0 = x + (-4 + i);
        y0 = y;
        if (x0 >= 0 && x0 <= size && y0 >= 0 && y0 <= size) {
            c += data[y0][x0];
            //c += '0';
        }
        // top.right to bottom.left
        x0 = x + (4 - i);
        y0 = y + (-4 + i);
        if (x0 >= 0 && x0 <= size && y0 >= 0 && y0 <= size) {
            d += data[y0][x0];
            //d += '0';
        }
    }
    return [a, b, c, d];
};

module.exports = Matrix;

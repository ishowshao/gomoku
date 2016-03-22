/**
 * 写一下随机走棋
 */
var matrix = [];
var size = 15 * 15;
for (var i = 0; i < size; i++) {
    matrix[i] = 0;
}
console.log(matrix, matrix.length);

var loop = 1000000;
var DEEP = 9; // 这里应该总是奇数为好
console.time('a');
for (i = 0; i < loop; i++) {
    var path = [];
    for (var j = 0; j < DEEP; ) {
        var index = Math.floor(Math.random() * size);
        if (!matrix[index]) {
            path.push(index);
            matrix[index] = 1;
            j++;
        }
    }
    //console.log(path);
    for (j = 0; j < path.length; j++) {
        matrix[path[j]] = 0;
    }
}
console.timeEnd('a');

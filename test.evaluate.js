var Matrix = require('./Matrix');
var matrix = new Matrix(15);
var schema = require('./reg').regs;

matrix.setValueByCoordinate(4, 4, 1);
matrix.setValueByCoordinate(3, 3, 1);
matrix.setValueByCoordinate(6, 5, 1);
matrix.setValueByCoordinate(7, 5, 1);
matrix.setValueByCoordinate(5, 5, 1);

console.time('test');
for (var i = 0; i < 1000; i++) {
    var value = require('./evaluate.2').evaluate(matrix, schema);
}
console.timeEnd('test');
console.log(value);

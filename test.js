var Matrix = require('./Matrix');
var matrix = new Matrix(15);
matrix.setValueByCoordinate(8, 8, 1);
matrix.setValueByCoordinate(8, 9, 1);
matrix.setValueByCoordinate(8, 10, 1);


var schemas = require('./Schema2').build();

var value = 0;
for (var i = 0, length = schemas.length; i < length; i++) {
    var schema = schemas[i];
    console.log(schema);
    var matches = matrix.findSchema(schema.schema);
    value += matches.length * schema.score;
    console.log(matches);
}
console.log(value);

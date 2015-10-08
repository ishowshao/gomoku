var Matrix = require('./Matrix');
var matrix = new Matrix(15);
//matrix.setValueByCoordinate(8, 8, 1);
//matrix.setValueByCoordinate(8, 9, 1);
//matrix.setValueByCoordinate(8, 10, 1);
//
//
//var schemas = require('./Schema2').build();
//
//var value = 0;
//for (var i = 0, length = schemas.length; i < length; i++) {
//    var schema = schemas[i];
//    console.log(schema);
//    var matches = matrix.findSchema(schema.schema);
//    value += matches.length * schema.score;
//    console.log(matches);
//}
//console.log(value);

//console.log(/001/.test('1001'));
//console.log('1001001001'.indexOf('001'));
//console.time('reg');
//var reg = new RegExp('001', 'g');
//for (var i = 0; i < 10000000; i++) {
    //while (reg.exec('1000010001')) {
    //}
    //'1000010001'.indexOf('001');
    //'abcedfghij'.indexOf('edf');
//}
//console.timeEnd('reg');
//console.log(reg.exec('1000010001'), reg.exec('2000010000'), reg.exec('1000010001'));
//console.log(reg.exec('1000010001'), reg.exec('1000010001'), reg.exec('1000010001'));

console.time('test');
for (var i = 0; i < 100000; i++) {
    var four = matrix.getFour(0, 3);
}
console.timeEnd('test');
console.log(four);

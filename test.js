console.time('test');
var array = [];
array.length = 1000000;
for (var i = 0; i < 1000000; i++) {
    array[i] = 0;
}
console.timeEnd('test');
console.log(array);

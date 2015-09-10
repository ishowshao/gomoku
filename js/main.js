console.log('main');
require.config({
    baseUrl: 'js/class'
});

require(['Matrix', 'Schema'], function (Matrix, Schema) {
    var m = new Matrix(15);
    console.time('build');
    var schemas = Schema.build();
    console.timeEnd('build');
});

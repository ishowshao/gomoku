var source = [
    {
        data: [1, 1, 1, 1, 1],
        score: 1000000,
        direction: 4
    },
    {
        data: [0, 1, 1, 1, 1, 0], // 活四
        score: 100000,
        direction: 4
    },
    {
        data: [0, 1, 1, 1, 0],
        score: 11000,
        direction: 4
    },
    {
        data: [0, 1, 1, 0, 1, 0],
        score: 10000,
        direction: 8
    },
    {
        data: [2, 1, 1, 1, 1, 0], // 冲四
        score: 1001,
        direction: 8
    },
    {
        data: [2, 1, 1, 1, 0, 1],
        score: 1000,
        direction: 8
    },
    {
        data: [2, 1, 1, 0, 1, 1],
        score: 1000,
        direction: 8
    },
    {
        data: [0, 1, 1, 0],
        score: 100,
        direction: 4
    },
    {
        data: [0, 1, 0, 1, 0],
        score: 100,
        direction: 4
    }
];
var left = function (data) {
    var result = [];
    var origin = data.indexOf(1);
    for (var i = 0; i < data.length; i++) {
        result.push([0, i - origin, data[i]]);
    }
    return result;
};
var leftBottom = function (data) {
    var result = [];
    var origin = data.indexOf(1);
    for (var i = 0; i < data.length; i++) {
        result.push([i - origin, i - origin, data[i]]);
    }
    return result;
};
var bottom = function (data) {
    var result = [];
    var origin = data.indexOf(1);
    for (var i = 0; i < data.length; i++) {
        result.push([i - origin, 0, data[i]]);
    }
    return result;
};
var rightBottom = function (data) {
    var result = [];
    var origin = data.indexOf(1);
    for (var i = 0; i < data.length; i++) {
        result.push([i - origin, origin - i, data[i]]);
    }
    return result;
};
var right = function (data) {
    var result = [];
    var origin = data.indexOf(1);
    for (var i = 0; i < data.length; i++) {
        result.push([0, origin - i, data[i]]);
    }
    return result;
};
var rightTop = function (data) {
    var result = [];
    var origin = data.indexOf(1);
    for (var i = 0; i < data.length; i++) {
        result.push([origin - i, origin - i, data[i]]);
    }
    return result;
};
var top = function (data) {
    var result = [];
    var origin = data.indexOf(1);
    for (var i = 0; i < data.length; i++) {
        result.push([origin - i, 0, data[i]]);
    }
    return result;
};
var leftTop = function (data) {
    var result = [];
    var origin = data.indexOf(1);
    for (var i = 0; i < data.length; i++) {
        result.push([origin - i, i - origin, data[i]]);
    }
    return result;
};

exports.build = function () {
    var schemas = [];
    source.forEach(function (schema) {
        schemas.push({schema: left(schema['data']), score: schema['score']});
        schemas.push({schema: leftBottom(schema['data']), score: schema['score']});
        schemas.push({schema: bottom(schema['data']), score: schema['score']});
        schemas.push({schema: rightBottom(schema['data']), score: schema['score']});
        if (schema['direction'] === 8) {
            schemas.push({schema: right(schema['data']), score: schema['score']});
            schemas.push({schema: rightTop(schema['data']), score: schema['score']});
            schemas.push({schema: top(schema['data']), score: schema['score']});
            schemas.push({schema: leftTop(schema['data']), score: schema['score']});
        }
    });
    return schemas;
};
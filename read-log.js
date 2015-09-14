var fs = require('fs');
var Matrix = require('./Matrix');
var matrix = new Matrix(15);

fs.readdir('./data', function (error, files) {
    if (error) {
        console.log(error);
        return;
    }

    console.log(files);

    var blackFirstCount = 0;
    var whiteEndCount = 0;
    files.forEach(function (file) {
        var filePath = './data/' + file;

        var data = fs.readFileSync(filePath);
        data = JSON.parse(data);
        if (data[0].color === 'black') {
            blackFirstCount++;
        }
        if (data.pop().color === 'white') {
            whiteEndCount++;
        } else {
            console.log(filePath);
        }
        /*fs.readFile(filePath, function (error, data) {
            if (error) {
                console.log(error);
                return;
            }

            data = JSON.parse(data);
            if (data[0].color === 'black') {
                blackFirstCount++;
            }
            //data.forEach(function (step) {
            //    matrix.setValueByCoordinate(step.coordinate[0], step.coordinate[1], step.color == 'black' ? 1 : 2);
            //});
            //console.log(matrix.toString());
        });*/
    });
    console.log(blackFirstCount);
    console.log(whiteEndCount);
});
var Chessboard = require('./Chessboard');
var Matrix = require('./MatrixOld');
var SchemaOld = require('./SchemaOld');

/**
 * @class Ai
 * @constructor
 */
var Ai = function () {
    /**
     * @type {Matrix}
     */
    this.matrix = new Matrix(15);

    /**
     * @type {Array}
     */
    this.schemas = new SchemaOld().compile(SchemaOld.source);

    /**
     * @type {boolean}
     */
    this.failed = false;

    /**
     * @type {number}
     */
    this.step = 0;
};

/**
 * 计算给定状态的黑方或者白方的最好走棋
 *
 * @param {Matrix} matrix
 * @param {number} color
 * @returns {number[]}
 */
Ai.prototype.best = function (matrix, color) {
    if (color === Chessboard.WHITE) {
        matrix = matrix.copy(true);
    }

    return [0, 0];
};

/**
 * 设定AI是黑棋还是白棋
 *
 * @param {number} color
 */
Ai.prototype.setColor = function (color) {
    if (color === Chessboard.BLACK || color === Chessboard.WHITE) {
        this.color = color;
    } else {
        this.color = Chessboard.BLACK;
    }
};

/**
 * 获取白棋第一步走棋位置
 *
 * @param {Array} adversaryMove
 * @returns {Array}
 */
Ai.prototype.getWhiteFirstMove = function (adversaryMove) {
    var x = adversaryMove[0];
    var y = adversaryMove[1];
    var choice = [];
    y > 0 && choice.push([x, y - 1]);
    y < 14 && choice.push([x, y + 1]);
    x > 0 && choice.push([x - 1, y]);
    x < 14 && choice.push([x + 1, y]);
    return choice[Math.floor(Math.random() * choice.length)];
};

Ai.prototype.getMyMove = function (adversaryMove) {
    if (this.step === 0) {
        this.step++;
        if (adversaryMove === 'start') {
            // 我是先手：我是黑棋且必须走天元
            this.setColor(Chessboard.BLACK);
            this.matrix.setValueByCoordinate([7, 7], this.color);
            return [7, 7];
        } else {
            // 不是start我就是后手，白棋
            this.setColor(Chessboard.WHITE);
            var firstMove = this.getWhiteFirstMove(adversaryMove); // 直开局
            this.matrix.setValueByCoordinate(adversaryMove, Chessboard.notColor(this.color));
            this.matrix.setValueByCoordinate(firstMove, this.color);
            return firstMove;
        }
    } else {
        // 纪录对方走哪里
        this.matrix.setValueByCoordinate(adversaryMove, Chessboard.notColor(this.color));
        this.step++;
        //当我下棋，检查每一个可摆放的位置
        //1.我有没有胜利的棋
        //2.对方有没有差1步胜利(对方当前有>2000的模式)
        //3.我有没有差1步胜利
        //4.对方有没有必须处置的棋(对方当前有>1000的模式)
        //5.我的最高分

        var schemas = this.schemas;
        //计算我方最高分的第一步
        var matrix = this.matrix;
        var shrink = matrix.shrink();
        var i, j;
        var me = matrix.copy(this.color == Chessboard.BLACK);
        console.log(me.toString());
        var temp;
        var myScore = 0;
        var myFinalScore = 0;
        var myBestScore = 0;
        var myFinalCoordinate;
        var myBestCoordinate = [-1, -1];
        var you = matrix.copy(this.color !== Chessboard.BLACK);
        console.log(you.toString());
        var yourScore = 0;
        //放哪一点
        //1.我的分数最高
        var myHighestScore = 0;
        var myHighestCoordinate = [-1, -1];
        //2.你的分数最低
        var yourLowestScore = 1000000;
        var yourLowestCoordinate = [0, 0];
        //3.(我的分数 - 你的分数) 最高
        var myMinusHighestScore = 0;
        var myMinusHighestCoordinate = [-1, -1];
        //4.你的分数 - 我的分数 最高
        //5.我的最高分的坐标
        var myWinCoordinate = [];
        //6.你的最高分坐标
        var yourWinCoordinate = [];
        //7.我差一步胜利的点
        var myMustWinCoordinate = [];
        var myAlmostWinCoordinate = [];
        //8.对方差一步胜利的点
        var yourAlmostWinCoordinate = [];
        //9.对方必须应对的点
        var yourMustCareCoordinate = [];

        for (i = shrink[0][0]; i < shrink[0][1]; i++) {
            for (j = shrink[1][0]; j < shrink[1][1]; j++) {
                temp = me.getValueByCoordinate([i, j]);
                myScore = 0;
                yourScore = 0;
                if (temp === 0) {
                    me.setValueByCoordinate([i, j], 1);
                    you.setValueByCoordinate([i, j], 2);
                    schemas.forEach(function (schema) {
                        var mySchema = me.findSchema(schema['schema']);
                        var yourSchema = you.findSchema(schema['schema']);
                        myScore += mySchema.length * schema['score'];
                        yourScore += yourSchema.length * schema['score'];
                        if (schema['score'] > 100000) {
                            //检查我的胜利点
                            if (mySchema.length > 0) {
                                myWinCoordinate.push([i, j]);
                            }
                        } else if (schema['score'] > 10000) {
                            //检查我的必胜点
                            if (mySchema.length > 0) {
                                myMustWinCoordinate.push([i, j]);
                            }
                        } else if (schema['score'] > 2000) {
                            //检查我的差一步胜利
                            if (mySchema.length > 0) {
                                myAlmostWinCoordinate.push([i, j]);
                            }
                        }
                    });
                    me.setValueByCoordinate([i, j], 0);
                    you.setValueByCoordinate([i, j], 0);
                    //我的得分已经计算
                    //计算对方得分
                    console.log('myScore', myScore, 'yourScore', yourScore);
                    if (myScore - yourScore > myFinalScore) {
                        myFinalScore = myScore - yourScore;
                        myFinalCoordinate = [i, j];
                    }
                    if (myScore > myBestScore) {
                        myBestScore = myScore;
                        myBestCoordinate = [i, j];
                    }
                    //计算我的最高分
                    if (myScore > myHighestScore) {
                        myHighestScore = myScore;
                        myHighestCoordinate = [i, j];
                    }
                    //计算你的最低分
                    if (yourScore < yourLowestScore) {
                        yourLowestScore = yourScore;
                        yourLowestCoordinate = [i, j];
                    }
                    //计算我的分数 - 你的分数 最高分
                    if (myScore - yourScore > myMinusHighestScore) {
                        myMinusHighestScore = myScore - yourScore;
                        myMinusHighestCoordinate = [i, j];
                    }
                }
            }
        }
        //分析一下
        myScore = 0;
        yourScore = 0;
        schemas.forEach(function (schema) {
            myScore += me.findSchema(schema['schema']).length * schema['score'];
            yourScore += you.findSchema(schema['schema']).length * schema['score'];
        });
        //分析结束

        yourScore = 0;
        schemas.forEach(function (schema) {
            var find = you.findSchema(schema['schema']);
            yourScore += find.length * schema['score'];
            if (schema['score'] > 100000) {
                //检查我的胜利点
                if (find.length > 0) {
                    yourWinCoordinate.push(find);
                }
            } else if (schema['score'] > 2000) {
                //检查我的差一步胜利
                if (find.length > 0) {
                    yourAlmostWinCoordinate.push(find);
                }
            } else if (schema['score'] > 1000) {
                if (find.length > 0) {
                    yourMustCareCoordinate.push(find);
                }
            }
        });

        console.log('choose');
        if (myWinCoordinate.length > 0) {
            console.log('choose my win');
            myFinalCoordinate = myWinCoordinate[0];
        } else if (yourAlmostWinCoordinate.length > 0) {
            console.log('choose your almost');
            myFinalCoordinate = yourLowestCoordinate;
        } else if (myMustWinCoordinate.length > 0) {
            console.log('choose my must win');
            myFinalCoordinate = myMustWinCoordinate[0];
        } else if (myAlmostWinCoordinate.length > 0) {
            console.log('choose my almost');
            myFinalCoordinate = myHighestCoordinate;
        } else if (yourMustCareCoordinate.length > 0) {
            console.log('choose your muse care');
            myFinalCoordinate = yourLowestCoordinate;
        } else if (myMinusHighestScore == 0) {
            console.log('choose my best');
            myFinalCoordinate = myBestCoordinate;
        } else {
            console.log('choose my minus');
            myFinalCoordinate = myMinusHighestCoordinate;
        }

        console.log(myFinalCoordinate);
        if (myFinalCoordinate[0] !== -1 && myFinalCoordinate[1] !== -1) {
            this.matrix.setValueByCoordinate(myFinalCoordinate, this.color);
        }
        return myFinalCoordinate;
    }
};

module.exports = Ai;
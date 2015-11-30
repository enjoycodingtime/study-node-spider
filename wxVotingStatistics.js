var fs = require('fs');
var xlsx = require('node-xlsx');
var voteJson=JSON.parse(fs.readFileSync('./voteData.json'));

var bubbleSort = function(array) {
    var i = 0,
        len = array.length,
        j, d;
    for (; i < len; i++) {
        for (j = 0; j < len; j++) {
            if (array[i][2] > array[j][2]) {
                d = array[j];
                array[j] = array[i];
                array[i] = d;
            }
        }
    }
    return array;
};

var getExcleVoteArray = function(array) {
    var resultArray = [];
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
        var tempArray = [];
        // var nameArray = array[i].name.split("，");
        var nameArray = array[i].name.split(".");
        var voteOrder = nameArray[0];
        var itemName = nameArray[1];
        var voteNumber = array[i].cnt;
        tempArray = [voteOrder, itemName, voteNumber];
        resultArray.push(tempArray);
    };

    return bubbleSort(resultArray);
};


var writeInfoToExcle = function(voteJson) {
    var data = getExcleVoteArray(voteJson.options);
    var date = new Date();
    var time = date.getFullYear()+'-'+ (date.getMonth()+1) + '-' + date.getDate()+' ' +date.getHours() + ':' + date.getMinutes();
    data.push(['Time',time,'']);
    var file = xlsx.build([{
        name: voteJson.title,
        data: data
    }]);
    fs.writeFileSync('voteExcle/' + voteJson.title + '.xlsx', file, 'binary');
    console.log('okk');
};

writeInfoToExcle(voteJson);


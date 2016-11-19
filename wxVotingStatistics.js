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
    for (var j = 0; j < arrayLength; j ++) {
        var subArrayLength = array[j].options.length;
        for (var i = 0; i < subArrayLength; i++) {
            var tempArray = [];
            var nameArray = array[j].options[i].name.split("、");
            // var nameArray = array[i].name.split(".");
            var voteOrder = nameArray[0];
            
            voteOrder   =   voteOrder.replace(/\s+/g,"");  
            var itemName = nameArray[1];
            var voteNumber = array[j].options[i].cnt;
            tempArray = [voteOrder, itemName, voteNumber];
            resultArray.push(tempArray);
        };
        
    }

    return bubbleSort(resultArray);
};


var writeInfoToExcle = function(voteJson) {
    var data = getExcleVoteArray(voteJson);
    var date = new Date();
    var time = date.getFullYear()+'-'+ (date.getMonth()+1) + '-' + date.getDate()+' ' +date.getHours() + ':' + date.getMinutes();
    console.log(time);
    data.push(['Time',time,'']);
    var file = xlsx.build([{
        // name: voteJson.title,
        name: "2016中国酒店品牌高峰论坛人气嘉宾评选！",
        data: data
    }]);
    fs.writeFileSync('voteExcle/' +  '高峰论坛'+time+'.xlsx', file, {encoding:'binary'});
    console.log('okk');
};

writeInfoToExcle(voteJson);


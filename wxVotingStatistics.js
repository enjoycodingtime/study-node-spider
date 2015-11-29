var fs = require('fs');
var xlsx = require('node-xlsx');
var voteArray = [{
    "type": 2,
    "title": "2016年最受欢迎的酒店新品牌",
    "options": [{
        "name": "1，悦榕庄 悦苑Dhawa",
        "url": "",
        "cnt": 161
    }, {
        "name": "2，铂涛 安珀Maison Albar",
        "url": "",
        "cnt": 52
    }, {
        "name": "3，铂涛 H12",
        "url": "",
        "cnt": 64
    }, {
        "name": "4，首旅 安麓AHN LUH",
        "url": "",
        "cnt": 53
    }, {
        "name": "5，雅辰 悦居酒店ARTYZEN habitat ",
        "url": "",
        "cnt": 10
    }, {
        "name": "6，雅辰 世民酒店citizenM",
        "url": "",
        "cnt": 11
    }, {
        "name": "7，明宇 丽雅LIA",
        "url": "",
        "cnt": 299
    }, {
        "name": "8，首旅 山里寒舍&山里逸居",
        "url": "",
        "cnt": 36
    }, {
        "name": "9，首旅 诺金NUO",
        "url": "",
        "cnt": 50
    }, {
        "name": "10，马哥孛罗 尼依格罗NICCOLO",
        "url": "",
        "cnt": 45
    }, {
        "name": "11，朗廷 康得思CORDIS",
        "url": "",
        "cnt": 37
    }, {
        "name": "12，喜达屋 Tribute Portfolio",
        "url": "",
        "cnt": 218
    }, {
        "name": "13，万豪 MOXY",
        "url": "",
        "cnt": 190
    }, {
        "name": "14，希尔顿 CURIO",
        "url": "",
        "cnt": 143
    }, {
        "name": "15，希尔顿 Canopy by Hilton",
        "url": "",
        "cnt": 127
    }, {
        "name": "16，凯悦 Hyatt Centric",
        "url": "",
        "cnt": 110
    }, {
        "name": "17，洲际 华邑酒店",
        "url": "",
        "cnt": 180
    }, {
        "name": "18，洲际 EVEN Hotels",
        "url": "",
        "cnt": 140
    }, {
        "name": "19，香格里拉 今旅Hotel Jen",
        "url": "",
        "cnt": 181
    }, {
        "name": "20，卡尔森 Quorvus Collection",
        "url": "",
        "cnt": 17
    }, {
        "name": "21，卡尔森 Raddisson Red",
        "url": "",
        "cnt": 13
    }, {
        "name": "22，卓美亚 VENU",
        "url": "",
        "cnt": 26
    }, {
        "name": "23，悦榕庄 悦梿CASSIA",
        "url": "",
        "cnt": 64
    }, {
        "name": "24，最佳西方 VIB",
        "url": "",
        "cnt": 12
    }, {
        "name": "25，地中海 Joyview by Club Med",
        "url": "",
        "cnt": 24
    }, {
        "name": "26，御庭 安缇缦 Andaman ",
        "url": "",
        "cnt": 124
    }, {
        "name": "27，凯悦 嘉轩Hyatt Place嘉寓Hyatt House ",
        "url": "",
        "cnt": 64
    }],
    "total_cnt": 2451
}];


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
    for (var i =0; i < arrayLength; i++) {
        var tempArray = [];
        var nameArray = array[i].name.split("，");
        var voteOrder = nameArray[0];
        var itemName = nameArray[1];
        var voteNumber = array[i].cnt;
        tempArray = [voteOrder,itemName,voteNumber];
        resultArray.push(tempArray);
    };

    return bubbleSort(resultArray);
}


var writeInfoToExcle = function(voteArray) {
    var data = getExcleVoteArray(voteArray[0].options);

    var file = xlsx.build([{
                                name: voteArray[0].title,
                                data: data
                            }]);
    fs.writeFileSync('voteExcle/' + voteArray[0].title + '.xlsx', file, 'binary',function(data) {
        console.log(data);
        console.log('ok!~~~~~~~~~~~~~~~');
    });
}
;
writeInfoToExcle(voteArray);

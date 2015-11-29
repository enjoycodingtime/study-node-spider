var express = require('express');
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var itemName = 'Industry';
var targetUrl = 'http://info.meadin.com/' + itemName + '/Index_';
// var targetUrl = 'http://column.meadin.com/Index_';
var mainUrl = 'http://traveldaily.cn';
var fs = require('fs');
var xlsx = require('node-xlsx');
var allArticles = [];
var page = 9;
var sum = 0;
for (var i = 1; i <= page; i++) {
    (function(i) {
        superagent.get(targetUrl + i +'.shtml')
            .end(function(err, res) {

                // console.log(res);
                getEliment(res, function() {

                    if (i == page) {
                        sum +=1;
                        console.log(sum);
                        if(sum == 20) {
                            var file = xlsx.build([{name: "mySheetName", data: allArticles}]);
                             fs.writeFileSync('meadin/'+itemName + '.xlsx', file, 'binary');
                        console.log('over')

                        }
                        return
                    }
                });
            });
    })(i)

}



var getEliment = function(res, callback) {
    var $ = cheerio.load(res.text);

    //通过CSS selector来筛选数据
    $('.content .left .listview h3').each(function(idx, element) {

        var detailUrl = element.children[0].attribs.href;
        var title = element.children[0].children[0].data;
        if (detailUrl == undefined || title == undefined) {
            var detailUrl = element.children[1].attribs.href;
            var title = element.children[1].children[0].data;
        } 
        getDetailInfo(detailUrl, function(source) {
                var tempArray = source.split('+');
                var tempSource = tempArray[0];
                var tempArr = tempSource.split('来源：');
                var fromSource = tempArr[1];
                var publishTime = tempArray[1];
                var array = [title, fromSource, publishTime];
                allArticles.push(array);
                callback();
                // console.log(title+' '+ source)
            })
            // console.log(getDetailInfo(detailUrl));
            // console.log(element.children[0].children[0].data);
    });
}

var getDetailInfo = function(url, callback) {
    // console.log(url)
    superagent.get(url)
        .end(function(err, res) {

            //console.log(res);
            // console.log(filterDetailInfo(res))
            callback(filterDetailInfo(res));
        });
}

var filterDetailInfo = function(res) {
    var $ = cheerio.load(res.text);
    var publishTime = $('.content .arial').text();
    var source = $('.content .source').text();
    // var tempArray = source.split('：');
    // source = tempArray[1];
    return source + '+' + publishTime;
}
























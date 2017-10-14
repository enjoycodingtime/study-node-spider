const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

var express = require('express');
var url = require('url'); //解析操作url
// var superagent = require('superagent-charset'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var itemName = 'hotArticle6';
var mainUrl = 'https://mp.weixin.qq.com/cgi-bin/newmasssendpage';
var fs = require('fs');
var xlsx = require('node-xlsx');
var allArticles = [];
var page = 1;
var pageSize = 7;
var total = 184;
// var total = 31;
var getTotal = 0;
for (var ii = page; ii <= total; ii++) {
    (function (ii) {
        request.get('/', function (req, res) {
            var url = mainUrl;
            request
                .get(url)
                .type('application/json')
                .set({
                    'Content-Type':'application/json',
                    'Referer':'https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=2095446785',
                    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
                    'Cookie':'',
                }).charset('utf-8')
                .query({ count: pageSize })
                .query({ begin: ii * (pageSize-1)})
                .query({ token: '2095446785' })
                .query({ lang: 'zh_CN' })
                .query({ f: 'json' })
                .query({ ajax: 'ajax' })
                .end(function (err, res) {
                    if(err || !res){
                        return ;
                    }
                    var response = res.text
                    if(response) {
                        console.log(ii)
                        var data = JSON.parse(response);
                        var sent_list = data.sent_list;
                        getTotal++;
                        console.log('getTotal:'+getTotal)
                        for(var i = 0;i<sent_list.length;i++) {
                            var appmsg_info = sent_list[i]['appmsg_info'];
                            var sent_info = sent_list[i]['sent_info'];
                            var send_time = sent_info['time'];
                            var date = new Date(send_time * 1000);
                            var time_format = date.getFullYear()+'-'+ (date.getMonth()+1) + '-' + date.getDate()+' ' +date.getHours() + ':' + date.getMinutes();
                            for(var j = 0;j<appmsg_info.length;j++) {
                                var article = appmsg_info[j];
                                var title = article['title'];
                                var read_num = article['read_num'];
                                var like_num = article['like_num'];
                                var comment_num = article['comment_num'];
                                var content_url = article['content_url'];
                                var cover = article['cover'];
                                var array = [title,read_num,like_num,comment_num,time_format,content_url,cover];
                                allArticles.push(array);
                            }
                        }
                        if (getTotal >= total-30) {
                            setTimeout(function () {
                                var file = xlsx.build([{name: "mySheetName", data: allArticles}]);
                                fs.writeFileSync('xlsxs/' + itemName + '.xlsx', file, 'binary');
                            }, 3000);
                            return
                        }
                    }
                });
        })
    })(ii)

}
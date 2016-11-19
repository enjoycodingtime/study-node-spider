const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

var express = require('express');
var url = require('url'); //解析操作url
// var superagent = require('superagent-charset'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var itemName = 'three';
var targetUrl = 'http://www.feeyo.com/airport_code.asp?page=';
// var mainUrl = 'http://traveldaily.cn';
var fs = require('fs');
var xlsx = require('node-xlsx');
var allArticles = [];
var page = 1;
var total = 0;
for (var i = page; i < page +9; i++) {
    (function(i) {
        request.get(targetUrl + i).charset('gbk')
            .end(function(err, res) {
                getEliment(res, function() {
                    if (i == page) {
                        setTimeout(function(){
                            var file = xlsx.build([{name: "mySheetName", data: allArticles}]);
                            fs.writeFileSync('xlsxs/'+itemName + '.xlsx', file, 'binary');
                        }, 3000);
                        return
                    }
                });
            });
    })(i)

}



var getEliment = function(res, callback) {
    var $ = cheerio.load(res.text);
    //通过CSS selector来筛选数据
    $('tbody tr').each(function(idx, element) {
        // console.log('tr-----'+idx)
        total ++ ;
        if(idx != 0 && idx < 21) {
            var city = element.children[0].children[0].children[0].data;
            var three = element.children[1].children[0].data;
            var name = element.children[3].children[0].data;
            var en =  element.children[4].children[0].data;
            // console.log(city)
            var array = [city,three,name,en];
            allArticles.push(array);

        }
    });
    callback();
}

var getDetailInfo = function(url, callback) {
    superagent.get(url)
        .end(function(err, res) {
            //console.log(res);
            // console.log(filterDetailInfo(res))
            callback(filterDetailInfo(res));
        });
}

var filterDetailInfo = function(res) {
    var $ = cheerio.load(res.text);
    var publishTime = $('.content .title p .time').text();
    var source = $('.content .title p .source').text();
    var tempArray = source.split('：');
    source = tempArray[1];
    return source + '+' + publishTime;
}

































// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;

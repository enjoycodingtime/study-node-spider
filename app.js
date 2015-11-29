var express = require('express');
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var itemName = 'review';
var targetUrl = 'http://traveldaily.cn/' + itemName + '/';
var mainUrl = 'http://traveldaily.cn';
var fs = require('fs');
var xlsx = require('node-xlsx');
var allArticles = [];
var page = 5;

for (var i = 1; i <= page; i++) {
    (function(i) {
        superagent.get(targetUrl + i)
            .end(function(err, res) {
                //console.log(res);
                getEliment(res, function() {

                    if (i == page) {
                        console.log('over')
                        
                        var file = xlsx.build([{name: "mySheetName", data: allArticles}]);
                        fs.writeFileSync('xlsxs/'+itemName + '.xlsx', file, 'binary');
                        return
                    }
                });
            });
    })(i)

}



var getEliment = function(res, callback) {
    var $ = cheerio.load(res.text);
    //通过CSS selector来筛选数据
    $('.main-item .item-l h3').each(function(idx, element) {
        var detailUrl = mainUrl + element.children[0].attribs.href;
        var title = element.children[0].children[0].data;
        getDetailInfo(detailUrl, function(source) {
                var tempArray = source.split('+');
                var fromSource = tempArray[0];
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

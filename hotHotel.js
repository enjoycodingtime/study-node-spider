const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

var express = require('express');
var url = require('url'); //解析操作url
// var superagent = require('superagent-charset'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var mainUrl = 'http://hotels.ctrip.com/Domestic/Tool/AjaxHotelList.aspx';
var fs = require('fs');
var xlsx = require('node-xlsx');

var hotelId = [
    ['58', '香港酒店'],
    ['1', '北京酒店'],
    ['2', '上海酒店'],
    ['25', '厦门酒店'],
    ['59', '澳门酒店'],
    ['17', '杭州酒店'],
    ['7', '青岛酒店'],
    ['12', '南京酒店'],
    ['6', '大连酒店'],
    ['32', '广州酒店'],
    ['30', '深圳酒店'],
    ['10', '西安酒店'],
    ['28', '成都酒店'],
    ['4', '重庆酒店'],
    ['43', '三亚酒店'],
    ['3', '天津酒店'],
    ['14', '苏州酒店'],
    ['477', '武汉酒店'],
    ['15', '扬州酒店'],
    ['206', '长沙酒店'],
    ['27', '张家界酒店'],
    ['223', '东莞酒店']
];


var getCityHotHotel = function(id, name) {
    var hotelResultList = [];
    var title = ['id', '名字', '评分', '推荐比例', '类型', '点评数']
    hotelResultList.push(title);
    var total = 6;
    var getTotal = 0;

    var cityPY = name;
    var cityId = id;
    var itemName = cityPY;
    console.log('start');
    var saveToExcel = function() {
        console.log('over');
        var file = xlsx.build([{ name: "mySheetName", data: hotelResultList }]);
        fs.writeFileSync('xlsxs/' + itemName + '.xlsx', file, 'binary');
    }
    var getOnePage = function() {
        if (getTotal > total) {
            saveToExcel();
            return;
        } else {
            console.log('total:' + getTotal);
            request.get('/', function(req, res) {
                var url = mainUrl;
                request
                    .get(url)
                    .type('application/json')
                    .set({
                        'Content-Type': 'text/html',
                        'Referer': 'http://hotels.ctrip.com/hotel/Shenzhen30',
                        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
                        'Cookie': '_abtest_userid=cb747341-4567-492c-838f-b9dd7abb96da; page_time=1501773940428%2C1504622901855%2C1504622916593%2C1504622916879%2C1504623422389%2C1504623422791; ASP.NET_SessionId=gdppgtpwa1szf5wikebeqryn; OID_ForOnlineHotel=15017739391291ze8zl1515685414883102002; _RF1=27.38.32.25; _RSG=cLKYII9cvQEzrehMvqZ0eB; _RDG=2889f92d41664c2f432a7c6ff94f49435a; _RGUID=e6b99894-9289-4566-ba00-8f4e56ae8d7d; _jzqco=%7C%7C%7C%7C%7C1.1209780486.1504622903424.1504622919016.1515685417202.1504622919016.1515685417202.0.0.0.3.3; __zpspc=9.2.1515685417.1515685417.1%231%7C%7C%7C%7C%25E6%259C%25BA%25E7%25A5%25A8%7C%23; _ga=GA1.2.1945528857.1504622904; _gid=GA1.2.348145597.1515685417; MKT_Pagesource=PC; appFloatCnt=1; manualclose=1; _bfa=1.1501773939129.1ze8zl.1.1504622900515.1515685414784.3.11; _bfs=1.5; _bfi=p1%3D102002%26p2%3D102002%26v1%3D11%26v2%3D10',
                    }).charset('utf-8')
                    .query({ __VIEWSTATEGENERATOR: 'DB1FBB6D' })
                    .query({ cityName: '%E6%B7%B1%E5%9C%B3' })
                    .query({ StartTime: '2018-01-11' })
                    .query({ DepTime: '2018-01-12' })
                    .query({ txtkeyword: '' })
                    .query({ Resource: '' })
                    .query({ Room: '' })
                    .query({ Paymentterm: '' })
                    .query({ BRev: '' })
                    .query({ Minstate: '' })
                    .query({ PromoteType: '' })
                    .query({ PromoteDate: '' })
                    .query({ operationtype: 'NEWHOTELORDER' })
                    .query({ PromoteStartDate: '' })
                    .query({ PromoteEndDate: '' })
                    .query({ OrderID: '' })
                    .query({ RoomNum: '' })
                    .query({ IsOnlyAirHotel: 'F' })
                    .query({ cityId: cityId })
                    .query({ cityPY: cityPY })
                    .query({ cityCode: '0755' })
                    .query({ cityLat: '22.5487559551' })
                    .query({ cityLng: '114.0644200241' })
                    .query({ positionArea: '' })
                    .query({ positionId: '' })
                    .query({ hotelposition: '' })
                    .query({ keyword: '' })
                    .query({ hotelId: '' })
                    .query({ htlPageView: '0' })
                    .query({ hotelType: 'F' })
                    .query({ hasPKGHotel: 'F' })
                    .query({ requestTravelMoney: 'F' })
                    .query({ isusergiftcard: 'F' })
                    .query({ useFG: 'F' })
                    .query({ HotelEquipment: '' })
                    .query({ priceRange: '-2' })
                    .query({ hotelBrandId: '' })
                    .query({ promotion: 'F' })
                    .query({ prepay: 'F' })
                    .query({ IsCanReserve: 'F' })
                    .query({ OrderBy: '99' })
                    .query({ OrderType: '' })
                    .query({ k1: '' })
                    .query({ k2: '' })
                    .query({ CorpPayType: '' })
                    .query({ viewType: '' })
                    .query({ checkIn: '2018-01-11' })
                    .query({ checkOut: '2018-01-12' })
                    .query({ DealSale: '' })
                    .query({ ulogin: '' })
                    .query({ hidTestLat: '0%7C0' })
                    .query({ psid: '' })
                    .query({ HideIsNoneLogin: 'T' })
                    .query({ isfromlist: 'T' })
                    .query({ ubt_price_key: 'htl_search_result_promotion' })
                    .query({ showwindow: '' })
                    .query({ defaultcoupon: '' })
                    .query({ isHuaZhu: 'False' })
                    .query({ hotelPriceLow: '' })
                    .query({ htlFrom: 'hotellist' })
                    .query({ unBookHotelTraceCode: '' })
                    .query({ showTipFlg: '' })
                    .query({ markType: '0' })
                    .query({ zone: '' })
                    .query({ location: '' })
                    .query({ type: '' })
                    .query({ brand: '' })
                    .query({ group: '' })
                    .query({ feature: '' })
                    .query({ equip: '' })
                    .query({ sl: '' })
                    .query({ s: '' })
                    .query({ l: '' })
                    .query({ price: '' })
                    .query({ a: '0' })
                    .query({ keywordLat: '' })
                    .query({ keywordLon: '' })
                    .query({ contrast: '0' })
                    .query({ contyped: '0' })
                    .query({ productcode: '' })
                    .query({ star: '5' })
                    .query({ attachDistance: '0' })
                    .query({ page: getTotal + 1 })
                    .end(function(err, res) {
                        if (err || !res) {
                            return;
                        }
                        var response = res.text
                        if (response) {
                            var data = JSON.parse(response);
                            var hotelPositionJSON = data.hotelPositionJSON;
                            console.log(hotelPositionJSON);
                            var paging = data.paging;

                            var length = hotelPositionJSON.length;
                            for (var i = 0; i < length; i++) {
                                var id = hotelPositionJSON[i]['id'];
                                var name = hotelPositionJSON[i]['name'];
                                var score = hotelPositionJSON[i]['score'];
                                var dpscore = hotelPositionJSON[i]['dpscore'];
                                var stardesc = hotelPositionJSON[i]['stardesc'];
                                var dpcount = hotelPositionJSON[i]['dpcount'];
                                var array = [id, name, score, dpscore, stardesc, dpcount];
                                hotelResultList.push(array);

                            }
                            if (paging.indexOf('c_down_nocurrent') != -1) {
                                saveToExcel();
                                return;
                            }

                            getTotal++;
                            getOnePage();
                        }
                    });
            })
        }
    }
    getOnePage();
}

for (var i = hotelId.length - 1; i >= 0; i--) {
    getCityHotHotel(hotelId[i][0], hotelId[i][1]);
}
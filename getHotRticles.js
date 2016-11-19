var data = wx.cgiData.list
var getHotAriticles = function (data){
    var index,
        result = [];
    for( index in data) {
        var subArray = data[index].multi_item,
            subIndex;
        for (subIndex in subArray) {
            if(subArray[subIndex].read_num >= 50000) {
                result.push(subArray[subIndex].title)
            }
        }
    }
    return result.join('||');
}
getHotAriticles(data);


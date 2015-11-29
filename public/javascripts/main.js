$.ajax({
    data: {
        page: 1
    },
    dataType: "json",
    type: "get",
    url: "/creeper",
    success: function(data) {
        console.log(data)
        var html = "";
        for (var i = 0; i < data.blogs.length; i++) {
            var blog = data.blogs[i];
            html += "<p><a href='" + blog.src + "' target='_blank'>" + blog.title + "</a><br>" + "<div class='break'>" + blog.content + "</div><div class='moreMess' style='text-align:right'>" +
                blog.time + "&nbsp;&nbsp;" + blog.read + "&nbsp;&nbsp;" + blog.say + "</div></p>"
        }

        $(".showMess").html(html);
    },
    error: function() {
        alert("错误")
    }
})

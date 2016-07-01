/**
 * Created by lhf55 on 7/1/2016.
 */

$(function () {
    $("#EN").click(function () {
        var prefix = "http://lhf552004.github.io";
        var relativePath = GetUrlRelativePath();
        window.location.href =prefix + relativePath;
    });
    $("#ZN").click(function () {
        var prefix = "http://lhf552004.com";
        var relativePath = GetUrlRelativePath();
        window.location.href =prefix + relativePath;
    });
});


function GetUrlRelativePath()
{
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if(relUrl.indexOf("?") != -1){
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}
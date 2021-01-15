//网站根目录 抽离出来
var URL = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function (options) {
    // console.log(options); 
    options.url = URL + options.url
})
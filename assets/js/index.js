$(function () {
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储
            localStorage.removeItem('token')
            //2.跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })


})

//获取用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            //非空校验
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //获取成功  进行渲染页面
            renderAvatar(res.data)
        }
    });
}

//渲染用户头像和名称
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    //渲染文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    //按需渲染头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
$(function () {
    //1.表单校验
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });

    //2.初始化用户信息
    var layer = layui.layer
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                //form.val() 为表单快速赋值  input中必须有lay-filter='formUserInfo'  lay-filter属性
                form.val('formUserInfo', res.data)
            }
        });
    }

    //3.实现表单重置效果
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //4.发起请求 更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        });
    })
})
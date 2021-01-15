$(function () {
    // 点击"去注册账号"的链接
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    })

    //点击"去登录"的链接
    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    })

    //表单验证
    var form = layui.form
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg_box [name=password]').val().trim();
            if (pwd !== value) {
                return alert('两次密码不一致');
            }
        }
    });

    //注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form_reg input[name=username]').val(),
                password: $('#form_reg input[name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 清空表单
                $('#form_reg')[0].reset();
                //模拟人的点击行为
                $('#link_login').click();

            }
        });
    })

    //登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        //这里的this 指的是#form_login
        // console.log($(this));
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //保存token 用于有权限接口的身份认证
                localStorage.setItem('token', res.token);
                //跳转页面
                location.href = '/index.html'
            }
        });
    })

})
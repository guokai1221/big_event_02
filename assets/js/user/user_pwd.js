$(function () {

    //表单校验
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value === $('input[name=oldPwd]').val()) {
                return '新旧密码不能相同!'
            }
        },
        repwd: function (value) {
            if (value !== $('input[name=newPwd]').val()) {
                return '两次密码输入不一致!'
            }
        }
    });


    // 发起请求实现重置密码的功能
    var layer = layui.layer;
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("更新密码成功")
                $('.layui-form')[0].reset()
            }
        });

    })





})
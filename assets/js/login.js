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
})
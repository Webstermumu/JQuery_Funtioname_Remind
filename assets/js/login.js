$(function () {
  $(".login_link").on("click", function () {
    //登录页面隐藏
    $(".login").hide();
    //注册界面显示
    $(".register").show();
  });
  $(".register_link").on("click", function () {
    // console.log(123);
    //登录页面隐藏
    $(".login").show();
    //注册界面显示
    $(".register").hide();
    if ($("#repwd").val() !== $("#pwd").val()) {
      alert("两次输入的密码不一致");
    }
  });
  let layer = layui.layer; // 加载弹出层模块
  let form = layui.form;
  //添加验证方法
  form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    checkRepwd: function (value) {
      // console.log(value);
      if ($("#pwd").val() !== value) {
        return "两次输入的不一致";
      }
    },
  }); //
  // console.log($("repwd").val(), $("pwd").val());
  // $("#register").on("click", function () {
  //   if ($("#repwd").val() !== $("#pwd").val()) {
  //     console.log(1);
  //   }
  // });
  //注册账号的数据传输

  $(".register form").on("submit", function (e) {
    e.preventDefault();

    console.log($(this).serialize());
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: $(this).serialize(),
      success: function (res) {
        layer.msg(res.message);

        if (res.status === 0) {
          // 注册成功，让登陆的盒子显示
          $(".register").hide().prev().show();
        }
        // console.log(res);
      },
    });
  });
  $(".login form").on("submit", function (e) {
    e.preventDefault();
    // 获取账号和密码
    // 提交给接口，完成登录。登录成功，跳转到 index.html （index.html是项目的首页面）
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(), // 检查表单各项的name属性值
      success: function (res) {
        layer.msg("登陆成功，即将跳转首页", function () {
          //   // 登录成功，还需要把服务器给的token信息给存储起来
          localStorage.setItem("token", res.token);
          //   // 弹出框关闭了才会执行该函数
          //   // 跳转页面
          location.href = "/home/index.html";
        });
      },
    });
  });
});
// 弹出框关闭了才会执行该函数
// 跳转页面

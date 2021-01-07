$(function () {
  let form = layui.form;
  let layer = layui.layer;
  //表单验证
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    newPass: function (value) {
      // console.log(value); // 新密码

      // 获取到原密码的值
      let oldPwd = $("[name=oldPwd]").val();

      if (value === oldPwd) {
        return "新密码不能和原密码相同";
      }
    },
    reword: function (value) {
      if (value !== $("#newPwd").val()) {
        console.log($("#newPwd").text());
        console.log(value);
        return "两次输入的密码不一致";
      }
    },
  });
  $("#formPwd").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    // console.log(data);
    // $("#formPwd").get(0);
    // console.log($("#formPwd")[0].res;

    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data,
      success: function (res) {
        // if (res.status !== 1) {

        //   //   return layer.msg(res.message);
        // }
        $("#formPwd")[0].reset();
        layer.msg(res.message);
        $("#formPwd").get(0);
      },
    });
  });
});

let form = layui.form;
let layer = layui.layer;
getInfo();
function getInfo() {
  $.ajax({
    // type: "POST",
    url: "/my/userinfo",
    success: function (res) {
      let data = res.data;
      form.val("form", data);
    },
  });
}
$("#resetBtn").on("click", function (e) {
  console.log(2);
  e.preventDefault();
  getInfo();
});
//提交
// console.log($("#resetBtn"));
$("#subBtn").on("click", function (e) {
  // console.log(1);
  e.preventDefault();
  let data = $(this).parents(".layui-form").serialize();
  console.log(data);
  $.ajax({
    type: "POST",
    url: "/my/userinfo",
    data,
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("修改用户信息失败！");
      }
      console.log(res);
      layer.msg("修改用户信息成功！");
      window.parent.getUserInfo();
    },
  });
});

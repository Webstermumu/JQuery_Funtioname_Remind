$(function () {
  let layer = layui.layer;
  getUserInfo();

  // 退出功能
  $("#logoutBtn").click(function () {
    console.log(1);
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提 示" },
      function (index) {
        localStorage.removeItem("token");
        location.href = "login.html";
        layer.close(index); // 关闭当前询问框
      }
    );
  });
});
//ajax通讯
function getUserInfo() {
  console.log(localStorage.getItem("token"));
  $.ajax({
    url: "/my/userinfo",
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败！");
      }
      //渲染头像和名字到页面
      let data = res.data;
      // console.log(data);
      setNameAndPic(data);
      // console.log(res.data);
    },
  });
}
//建立函数渲染头像和名字
function setNameAndPic(data) {
  // console.log(data.username);
  // console.log(data.user_pic);
  //处理名字
  let name = data.nickname || data.username;
  let first = data.username[0].toUpperCase();
  // console.log(first, username);
  $(".textProt").text(`${first}`);
  $(".welcomeText").text("欢迎" + name);
  if (data.user_pic) {
    //   有用户头像，展示用户头像，隐藏文字头像
    $(".layui-nav-img").show().attr("src", data.user_pic);
    $(".textProt").hide();
  } else {
    //   没有用户头像，隐藏用户头像，展示文字头像 ==> 文字头像的文字来源于name的第一个字符（大写的）
    $(".layui-nav-img").hide();
    $(".textProt").text(first).show();
  }
}

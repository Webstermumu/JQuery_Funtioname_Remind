$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $("#image");
  let layer = layui.layer;

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  //关联上传按钮和隐藏的input file
  $("#subBtn").on("click", function () {
    $(".fileSub").click();
  });
  //文件改变触发事件
  $(".fileSub").on("change", function () {
    // console.dir(this.files[0]);
    let file = this.files[0];
    if (!file) {
      return;
    }

    let newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  $("#sureBtn").click(function () {
    let dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          return layer.msg("更换头像失败！");
        }

        layer.msg("更换头像成功！");
        // 调用父页面（index）的函数，从而更新导航和侧边栏的头像
        window.parent.getUserInfo();
      },
    });
  });
});

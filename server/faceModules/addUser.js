const addUser = function (client, config, callback) {

  // let image = "取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串";
  let image = config.image;
  let imageType = "BASE64";
  let groupId = config.groupId;
  let userId = config.userId;

  // 调用人脸注册
  client.addUser(image, imageType, groupId, userId).then(function (result) {
    let res = JSON.stringify(result);
    // console.log(res);
    callback.success && callback.success(res);
  }).catch(function (err) {
    // 如果发生网络错误
    // console.log(err);
    callback.fail&&callback.fail(err);
  });

  // 如果有可选参数
  // let options = {};
  // options["user_info"] = "user's info";
  // options["quality_control"] = "NORMAL";
  // options["liveness_control"] = "LOW";

  // // 带参数调用人脸注册
  // client.addUser(image, imageType, groupId, userId, options).then(function(result) {
  //     console.log(JSON.stringify(result));
  // }).catch(function(err) {
  //     // 如果发生网络错误
  //     console.log(err);
  // });
};
module.exports = addUser;
const search = function (client, config, callback) {

  // var image = "取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串";
  let image = config.image;
  let imageType = "BASE64";
  let groupIdList = config.groupIdList;

  // 调用人脸搜索
  // client.search(image, imageType, groupIdList).then(function(result) {
  //     console.log(JSON.stringify(result));
  // }).catch(function(err) {
  //     // 如果发生网络错误
  //     console.log(err);
  // });

  // 如果有可选参数
  let options = {};
  options["quality_control"] = "NORMAL";
  options["liveness_control"] = "LOW";
  options["user_id"] = config.userId;
  options["max_user_num"] = "1";

  // 带参数调用人脸搜索
  client.search(image, imageType, groupIdList, options).then(function (result) {
    // console.log(JSON.stringify(result));
    let res = JSON.stringify(result);
    callback.success&&callback.success(res);
  }).catch(function (err) {
    // 如果发生网络错误
    console.log(err);
    callback.fail&&callback.fail(err);
  });
};
module.exports = search;
const detect = function(client,image,client){
  // var image = "取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串";
  let imageType = "BASE64";

  // 调用人脸检测
  client.detect(image, imageType).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });

  // 如果有可选参数
  let options = {};
  options["face_field"] = "age";
  options["max_face_num"] = "2";
  options["face_type"] = "LIVE";

  // 带参数调用人脸检测
  client.detect(image, imageType, options).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
};
module.exports = detect;
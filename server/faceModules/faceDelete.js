const faceDelete = function(client,userId,groupId,faceToken){
  
  // let userId = "user1";
  // let groupId = "group1";

  // let faceToken = "face_token_23123";

  // 调用人脸删除
  client.faceDelete(userId, groupId, faceToken).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
}
module.exports = faceDelete;
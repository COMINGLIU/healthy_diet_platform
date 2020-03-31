// 获取用户人脸列表
const faceGetlist = function(client,userId,groupId){
  
  // let userId = "user1";

  // let groupId = "group1";

  // 调用获取用户人脸列表
  client.faceGetlist(userId, groupId).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
};
module.exports = faceGetlist;
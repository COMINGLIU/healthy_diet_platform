// 用户信息查询
const getUser = function(client,userId,groupId){
    
  // let userId = "user1";

  // let groupId = "group1";

  // 调用用户信息查询
  client.getUser(userId, groupId).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
}
module.exports = getUser;
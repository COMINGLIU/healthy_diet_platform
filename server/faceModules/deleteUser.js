// 删除用户
const deleteUser = function(client,groupId,userId){
  
  // let groupId = "group1";

  // let userId = "user1";

  // 调用删除用户
  client.deleteUser(groupId, userId).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
};
module.exports = deleteUser;
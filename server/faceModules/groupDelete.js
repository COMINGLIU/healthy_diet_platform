// 删除用户组
const groupDelete = function(client,groupId){
  
  // var groupId = "group1";

  // 调用删除用户组
  client.groupDelete(groupId).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
};
module.exports = groupDelete;
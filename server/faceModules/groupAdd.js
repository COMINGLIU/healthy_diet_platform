// 创建用户组
const groupAdd = function(client,groupId){
  
  // let groupId = "group1";

  // 调用创建用户组
  client.groupAdd(groupId).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });

};
module.exports = groupAdd;
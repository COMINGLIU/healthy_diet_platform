// 获取用户列表
const getGroupUsers = function(client,groupId){
    
  // let groupId = "group1";

  // 调用获取用户列表
  client.getGroupUsers(groupId).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });

  // 如果有可选参数
  let options = {};
  options["start"] = "0";
  options["length"] = "50";

  // 带参数调用获取用户列表
  client.getGroupUsers(groupId, options).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
};
module.exports = getGroupUsers;
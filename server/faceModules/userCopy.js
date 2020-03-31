// 复制用户
const userCopy = function(client,userId){
    
  let userId = "user1";

  // 调用复制用户
  client.userCopy(userId).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });

  // 如果有可选参数
  let options = {};
  options["src_group_id"] = "11111";
  options["dst_group_id"] = "222222";

  // 带参数调用复制用户
  client.userCopy(userId, options).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });;
};
module.exports = userCopy;
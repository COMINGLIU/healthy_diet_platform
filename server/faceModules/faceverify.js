// 在线活体检测
const faceverify = function(client){
  client.faceverify([{
    image: new Buffer(fs.readFileSync('./assets/face/sample.jpg')).toString('base64'),
    image_type: 'BASE64'
  },{
      image: new Buffer(fs.readFileSync('./assets/face/sample.jpg')).toString('base64'),
      image_type: 'BASE64'
  }]).then(function (result) {
  console.log('<faceverify>: ' + JSON.stringify(result));
  });
};
module.exports = faceverify;
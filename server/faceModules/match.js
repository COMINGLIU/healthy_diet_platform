// 人脸对比
const match = function(client){
  client.match([{
    image: new Buffer(fs.readFileSync('./assets/face/sample.jpg')).toString('base64'),
    image_type: 'BASE64'
  },{
      image: new Buffer(fs.readFileSync('./assets/face/sample.jpg')).toString('base64'),
      image_type: 'BASE64'
  }]).then(function (result) {
  console.log('<match>: ' + JSON.stringify(result));
  });
};
module.exports = match;
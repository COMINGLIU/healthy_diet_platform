module.exports = (nodemailer,config) => {
  // var nodemailer = require('nodemailer');
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    service: 'qq',
    auth: {
      user: '2876224574@qq.com',
      //授权码,通过QQ获取
      pass: 'hwbzcsqlbunpdeea' 
    }
    });
    let mailOptions = {
      // 发送者
      from: '15243695692@qq.com', 
      // 接受者,可以同时发送多个,以逗号隔开
      to: config.to, 
      // 标题
      subject: config.emailTitle, 
      // 文本
      html: `<h3>【`+config.shareTitle+`】</h3><p>回复: `+config.emailText+`</p><br/><br/><br/><p>点击下列网址前往查看前往查看</p><p><a href="`+config.shareUrl+`">`+config.shareUrl+`</a></p>`
      // html: `<h2>这是个测试邮件，收到请回复</h2>` 
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        // console.log(err);
        config.fail&&config.fail(err);
        return;
      }else {
        // console.log('发送成功');
        config.success&&config.success(info);
      }
  });
}
/*
config = {
  to: 被发送者
  emailTitle: 邮件标题
  emailText: 邮件正文,
  success: 成功回调
  fail: 失败回调
}

*/ 
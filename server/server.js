const express = require('express');
const expressStatic = require('express-static');
const server = express();
const https = require('https');
const qs = require('querystring');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
// 用于将数据库时间格式化的
const moment = require('moment');
// multiPart：用于接收formData数据的中转器
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
// 邮件发送器
const nodemailer = require('nodemailer');
// 给入口文件添加压缩传输功能
const compression = require('compression');
server.use(compression());
// 接收
// 设置上传文件接收文件夹
server.use(multipart({ uploadDir: '../client/temp' }));

const CONN = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kkxxdgmyt67LIUQIONG',
  database: 'vegtablec'
});
// 使用cookie(建议不使用cookie的secret,否则session将无法保存)
server.use(cookieParser());
// 使用cookie-ssion
server.use(session({
  resave: false,
  // 当设置为true时，无论用户是否登录，只要访问网站都会生成一个session,不过这个session是空的
  saveUninitialized: false,
  // secret必须是固定的，否则存不了值
  secret: 'sjdjskkkshk',
  // 1s=1000ms
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))
/*自行创建的功能模块*/
const CREATEUSERID = require('./self_modules/createUserId.js');
const CREATEHEADFACE = require('./self_modules/createHeadFace.js');
const MAILER = require('./self_modules/mailer.js');
// const HANDLESQL = require('./self_modules/handleSql.js');
/*********************************************************************************/
/*用于人脸识别的模块*/
const ADDUSER = require('./faceModules/addUser.js');
const SEARCH = require('./faceModules/search.js');
/*用于人脸识别的功能模块*/

/* AipFaceClient是人脸识别的node客户端，为使用人脸识别的开发人员提供了一系列的交互方法。 */
const AipFaceClient = require("baidu-aip-sdk").face;

// 设置APPID/AK/SK
const APP_ID = "16096951";
const API_KEY = "pEyTAww3oIPdLot9Z8OTtzci";
const SECRET_KEY = "BOhWF9oW6csICnTHSBU5S0BUSgZKiODY";

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

const HttpClient = require("baidu-aip-sdk").HttpClient;

// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({ timeout: 5000 });

// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function (requestOptions) {
  // 查看参数
  console.log(requestOptions)
  // 修改参数
  requestOptions.timeout = 5000;
  // 返回参数
  return requestOptions;
});
/***********************************************************************************/
// 语音模块
const tencentcloud = require("tencentcloud-sdk-nodejs");
const AaiClient = tencentcloud.aai.v20180522.Client;
const models = tencentcloud.aai.v20180522.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

const cred = new Credential("AKIDJOHrCKr6fz73pRv79wUowtdIl25tar7A", "5wb1FF3Zs2xhCRTL5aw2we9PTP9WjrkS");
const httpProfile = new HttpProfile();
httpProfile.endpoint = "aai.tencentcloudapi.com";
const clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
const voice_client = new AaiClient(cred, "ap-guangzhou", clientProfile);
/***********************************************************************************/

// 接收任意文件
// server.use(objMulter.any());
// 解析post数据
server.post(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());
// 设置一下接收post文件的大小，否则默认大小可能接受不了过大文件
server.use(bodyParser.json({ limit: '2100000kb' }));

server.all('*', function (req, res, next) {
  // 跨域允许访问的的域名
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  // 跨域允许包含的头Content-type(X-Requested-With用来判断请求时ajax请求还是其他请求)
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Accept,Content-type");
  // 跨域允许访问的方法
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By",' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  // 若为true允许ajax请求带cookie信息
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
/********************************************************************/
// 用户路由
const userRouter = express.Router();
// 人脸在线活体检测
userRouter.post('/detect', (req, res) => {
  console.log('detect');
  let faceImg = req.body.face;
  let resStatus = '',
    resMsg = '';
  client.faceverify([{
    image: faceImg,
    image_type: 'BASE64',
    face_field: 'quality'
  }])
    .then(function (result) {
      // console.log('<faceverify>: ' + JSON.stringify(result));
      console.log(result["error_code"]);
      if (result["error_code"] == 0) {
        let face_liveness = result.result.face_liveness,
          faceQuality = result.result.face_list[0].quality.occlusion;
        //人脸活体指数
        console.log('人脸活体指数', face_liveness);
        // 人脸遮挡信息
        console.log('人脸遮挡信息', faceQuality);
        // 非活体
        if (face_liveness < 0.6) {
          resStatus = "fail";
          resMsg = '请将脸部对准摄像头';
        } else {
          // 活体无遮挡
          if (faceQuality["left_eye"] > 0) {
            resStatus = "fail";
            resMsg = '请勿遮挡左眼';
          }
          if (faceQuality["right_eye"] > 0) {
            resStatus = "fail";
            resMsg = '请勿遮挡右眼';
          }
          if (faceQuality["node"] > 0) {
            resStatus = "fail";
            resMsg = '请勿遮挡鼻子';
          }
          if (faceQuality["mouth"] > 0.6) {
            resStatus = "fail";
            resMsg = '请勿遮挡嘴巴';
          }
          if (faceQuality["left_cheek"] > 0.3) {
            resStatus = "fail";
            resMsg = '请勿遮挡左脸';
          }
          if (faceQuality["right_cheek"] > 0.3) {
            resStatus = "fail";
            resMsg = '请勿遮挡右脸';
          }
          if (faceQuality["chin_contour"] > 0.8) {
            resStatus = "fail";
            resMsg = '请勿遮挡下巴';
          }
          // 活体无遮挡
          else {
            resStatus = "success";
            resMsg = '人脸检测成功';
          }
        }
      } else {
        resStatus = "fail";
        resMsg = '未识别到人脸';
      }
      console.log(resStatus, resMsg);
      res.send({
        'status': resStatus,
        'msg': resMsg
      });
      res.end();
    })
    .catch(err => {
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    })
})
// 注册
userRouter.post('/regist', (req, result) => {
  console.log('regist');
  const getData = req.body;
  const userInfo = getData.userInfo;
  // 先看邮箱是否有被注册过
  let sql_checkEmail = 'SELECT email FROM user where email="' + userInfo.email + '";';
  console.log(sql_checkEmail);
  new Promise((resolve, reject) => {
    CONN.query(sql_checkEmail, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
    .then(res => {
      // 判断邮箱是否被注册
      console.log(res);
      if (res.length === 0) {
        console.log('邮箱未被注册');
        return;
      } else {
        console.log('该邮箱已被注册');
        result.send({
          status: 'fail',
          msg: '该邮箱已被注册'
        })
      }
    })
    .then(res => {
      // 执行
      let USERID = CREATEUSERID();
      switch (getData.act) {
        case 'faceRegist':
          console.log('人脸注册');
          // 先将人脸写入文件夹然后同时入驻百度平台再插入数据库
          new Promise((resolve, reject) => {
            let faceBuffer = Buffer.from(userInfo.face, 'base64');
            let faceFileName = 'images/users/' + CREATEHEADFACE() + '.png';
            console.log(faceFileName);
            fs.writeFile('../client7/src/pages/' + faceFileName, faceBuffer, err => {
              if (err) {
                console.log('人脸文件存储失败');
                console.log(err);
                result.send({
                  status: 'fail',
                  msg: '人脸存储失败'
                })
              } else {
                console.log('人脸存储成功');
                resolve(faceFileName);
              }
            })
          })
            .then(res => {
              console.log('入驻百度，存入数据库');
              console.log('人脸路径', res);
              let faceFileName = res;
              Promise.all([
                // 入驻百度
                new Promise((resolve, reject) => {
                  ADDUSER(client, {
                    image: userInfo.face,
                    groupId: 'user',
                    userId: USERID
                  }, {
                      success: function (res) {
                        // console.log(res);
                        console.log('百度入驻成功');
                        resolve();
                      },
                      fail: function (err) {
                        // console.log(err);
                        console.log('百度入驻失败');
                        reject();
                      }
                    })
                }),
                // 插入数据库
                new Promise((resolve, reject) => {
                  let sql_addUser_face = 'INSERT INTO user(userId,groupId,email,userName,userFace) values("' + USERID + '","user","' + userInfo.email + '","' + userInfo.userName + '","' + faceFileName + '");';
                  console.log(sql_addUser_face);
                  CONN.query(sql_addUser_face, (err, data) => {
                    if (err) {
                      console.log(err);
                      console.log('user信息数据库插入失败');
                      reject();
                    } else {
                      console.log('user信息数据库插入成功');
                      resolve();
                    }
                  }
                  )
                })
              ])
                .then(res => {
                  console.log('注册成功！！！！！！');
                  req.session.userId = USERID;
                  req.session.userName = userInfo.userName;
                  req.session.email = userInfo.email;
                  console.log(req.session.userId);
                  result.send({
                    status: 'success',
                    msg: '注册成功',
                    data: {
                      userId: USERID,
                    }
                  })
                })
            })
            .catch(err => {
              result.send({
                status: 'fail',
                msg: '注册失败'
              })
            })
          break;
        case 'passRegist':
          console.log('密码注册');
          let sql_addUser_pass = 'INSERT INTO user(userId,groupId,email,userName,userPass) values("' + USERID + '","user","' + userInfo.email + '","' + userInfo.userName + '","' + userInfo.pass + '");';
          CONN.query(sql_addUser_pass, (err, data) => {
            if (err) {
              console.log(err);
              console.log('user信息数据库插入失败');
              result.send({
                status: 'fail',
                msg: '注册失败'
              })
            } else {
              console.log('user信息数据库插入成功');
              // 设置session
              req.session.userId = USERID;
              req.session.userName = userInfo.userName;
              req.session.email = userInfo.email;
              console.log(req.session.userId);
              result.send({
                status: 'success',
                msg: '注册成功',
                data: {
                  userId: USERID,
                }
              })
            }
          })
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
})
// 登录
userRouter.post('/login', (req, result) => {
  console.log('login');
  const getData = req.body;
  const userInfo = getData.userInfo;
  // 先查询是否注册过，然后再比对密码或人脸
  console.log(userInfo.email);
  let sql_checkEmail = 'SELECT * FROM user where email="' + userInfo.email + '";';
  console.log(sql_checkEmail);
  new Promise((resolve, reject) => {
    CONN.query(sql_checkEmail, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
    .then(res => {
      console.log(res);
      if (res.length === 0) {
        // 没有注册过需要注册
        console.log('该账号未注册过');
        result.send({
          status: 'fail',
          msg: '该账号未注册'
        })
      } else {
        let getLoginUserInfo = res[0];
        console.log(getLoginUserInfo);
        switch (getData.act) {
          case 'faceLogin':
            console.log('人脸登录');
            // 先拿到数据库中的人脸图，然后和传输过来的face进行比对
            if (getLoginUserInfo.userFace) {
              // 有人脸登录方式正确
              client.match([{
                // 数据库保留图
                image: Buffer.from(fs.readFileSync('../client7/src/pages/' + getLoginUserInfo.userFace)).toString('base64'),
                image_type: 'BASE64'
              }, {
                // 传输图
                image: userInfo.face,
                image_type: 'BASE64'
              }])
                .then(res => {
                  console.log(res);
                  if (res.error_code === 0 && res.error_msg === "SUCCESS") {
                    if (res.result.score > 60) {
                      req.session.userId = getLoginUserInfo.userId;
                      req.session.userName = getLoginUserInfo.userName;
                      req.session.email = getLoginUserInfo.email;
                      result.send({
                        status: 'success',
                        msg: '登录成功',
                        data: {
                          userId: getLoginUserInfo.userId,
                          userName: getLoginUserInfo.userName,
                        }
                      })
                    } else {
                      result.send({
                        status: 'fail',
                        msg: '人脸不匹配'
                      })
                    }
                  } else {
                    console.log('人脸对比出现错误');
                  }
                })
            } else {
              // 没有人脸，未开通人脸验证
              result.send({
                status: 'fail',
                msg: '未开通人脸登录'
              })
            }
            break;
          case 'passLogin':
            console.log('密码登录');
            if (getLoginUserInfo.userPass === userInfo.pass) {
              req.session.userId = getLoginUserInfo.userId;
              req.session.userName = getLoginUserInfo.userName;
              req.session.email = getLoginUserInfo.email;
              console.log(req.session.userId);
              result.send({
                status: 'success',
                msg: '登录成功',
                data: {
                  userId: getLoginUserInfo.userId,
                  userName: getLoginUserInfo.userName,
                }
              })
            } else {
              result.send({
                status: 'fail',
                msg: '密码错误'
              })
            }
            break;
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
})
// 退出登录
userRouter.get('/exit', (req, result) => {
  console.log('exit');
  // 清除session
  req.session.destroy();
  result.send({
    status: 'success',
    msg: '退出登录成功'
  });
})
// 检测密码登录
userRouter.post('/checkPassLogin', (req, res) => {
  console.log('checkPassLogin');
  let USERID = req.session.userId;
  let getData = req.body;
  console.log('userId:', USERID);
  let sql_checkPassLogin = 'SELECT userPass FROM user where userId="' + USERID + '";';
  if (USERID) {
    CONN.query(sql_checkPassLogin, (err, data) => {
      if (err) {
        console.log(err);
        res.send({
          status: 'fail',
          msg: '网络繁忙，请稍后重试'
        })
      } else {
        console.log(data);
        data[0].userPass === getData.userInfo.pass ?
          res.send({
            status: 'success',
            msg: '验证成功'
          })
          :
          res.send({
            status: 'fail',
            msg: '验证失败'
          })
      }
    })
  } else {
    res.send({
      status: 'ovderdue',
      msg: '登录超时,请重新登录'
    })
  }
})
// 添加人脸登录权限
userRouter.post('/addFaceLoginRight', (req, result) => {
  console.log('addFaceLoginRight');
  let USERID = req.session.userId;
  let face = req.body.face;
  console.log('userid:', USERID);
  if (USERID) {
    // 先将人脸写入文件夹然后同时入驻百度平台再更新数据库
    new Promise((resolve, reject) => {
      let faceBuffer = Buffer.from(face, 'base64');
      let faceFileName = 'images/users/' + CREATEHEADFACE() + '.png';
      console.log(faceFileName);
      fs.writeFile('../client7/src/pages/' + faceFileName, faceBuffer, err => {
        if (err) {
          console.log('人脸文件存储失败');
          console.log(err);
          result.send({
            status: 'fail',
            msg: '人脸存储失败'
          })
        } else {
          console.log('人脸存储成功');
          resolve(faceFileName);
        }
      })
    })
      .then(res => {
        console.log('入驻百度，存入数据库');
        console.log('人脸路径', res);
        let faceFileName = res;
        Promise.all([
          // 入驻百度
          new Promise((resolve, reject) => {
            ADDUSER(client, {
              image: face,
              groupId: 'user',
              userId: USERID
            }, {
                success: function (res) {
                  // console.log(res);
                  console.log('百度入驻成功');
                  resolve();
                },
                fail: function (err) {
                  // console.log(err);
                  console.log('百度入驻失败');
                  reject();
                }
              })
          }),
          // 更新数据库
          new Promise((resolve, reject) => {
            let sql_openUser_face = 'UPDATE user SET userFace="' + faceFileName + '" WHERE userId="' + USERID + '";';
            console.log(sql_openUser_face);
            CONN.query(sql_openUser_face, (err, data) => {
              if (err) {
                console.log(err);
                console.log('userFace更新成功');
                reject();
              } else {
                console.log('userFace更新成功');
                resolve();
              }
            }
            )
          })
        ])
          .then(res => {
            console.log('开启人脸登录成功！！！！！！');
            req.session.userId = USERID;
            console.log(req.session.userId);
            result.send({
              status: 'success',
              msg: '开启人脸登录成功'
            })
          })
      })
      .catch(err => {
        result.send({
          status: 'fail',
          msg: '开启人脸登录失败'
        })
      })
  } else {
    result.send({
      status: 'overdue',
      msg: '登录超时，请重新登录'
    })
  }
})
// 检测人脸登录
userRouter.post('/checkFaceLogin', (req, result) => {
  console.log('checkFaceLogin');
  let getData = req.body;
  let USERID = req.session.userId;
  let sql_checkFaceLogin = 'SELECT userFace FROM user where userId="' + USERID + '";';
  if (USERID) {
    // 先拿到数据库里的人脸然后再进行人脸比对
    new Promise((resolve, reject) => {
      CONN.query(sql_checkFaceLogin, (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log(data);
          resolve(data[0].userFace);
        }
      })
    })
      .then(res => {
        console.log(res);
        // 人脸比对
        client.match([{
          // 数据库保留图
          image: Buffer.from(fs.readFileSync('../client7/src/pages/' + res)).toString('base64'),
          image_type: 'BASE64'
        }, {
          // 传输图
          image: getData.face,
          image_type: 'BASE64'
        }])
          .then(res => {
            console.log(res);
            if (res.error_code === 0 && res.error_msg === "SUCCESS") {
              if (res.result.score > 60) {
                result.send({
                  status: 'success',
                  msg: '登录成功'
                })
              } else {
                result.send({
                  status: 'fail',
                  msg: '人脸不匹配'
                })
              }
            } else {
              console.log('人脸对比出现错误');
            }
          })
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    result.send({
      status: 'overdue',
      msg: '登录超时，请重新登录'
    })
  }
})
// 添加密码登录权限
userRouter.post('/addPassLoginRight', (req, res) => {
  console.log("addPassLoginRight");
  let getData = req.body;
  let USERID = req.session.userId;
  let sql_addPassLoginRight = 'UPDATE user SET userPass="' + getData.pass + '" WHERE userId="' + USERID + '";';
  if (USERID) {
    CONN.query(sql_addPassLoginRight, (err, data) => {
      if (err) {
        console.log(err);
        res.send({
          status: 'fail',
          msg: '网络繁忙，请稍候重试'
        })
      } else {
        console.log(data);
        res.send({
          status: 'success',
          msg: '开启密码登录成功'
        })
      }
    })
  } else {
    res.send({
      status: 'overdue',
      msg: '登录超时，请稍后重试'
    })
  }
})
// 修改用户信息
userRouter.post('/editUserInfo', (req, res) => {
  console.log('editUserInfo');
  let getData = req.body;
  let USERID = req.session.userId;
  let sql_editUserInfo = 'UPDATE user SET userName="' + getData.userInfo.userName + '", email="' + getData.userInfo.email + '" WHERE userId="' + USERID + '";'
  if (USERID) {
    CONN.query(sql_editUserInfo, (err, data) => {
      if (err) {
        console.log(err);
        res.send({
          status: 'fail',
          msg: '网络繁忙，请稍候重试'
        })
      } else {
        console.log(data);
        console.log('用户信息更新成功');
        res.send({
          status: 'success',
          msg: '用户信息更新成功'
        })
      }
    })
  } else {
    res.send({
      status: 'overdue',
      msg: '登陆超时，请重新登陆'
    })
  }
})
userRouter.get('/test', (req, res) => {
  console.log('test');
  let sql_1 = 'SELECT * FROM user where userId="201946181521448PHXYSpNNep"';
  let sql_2 = 'SELECT * FROM editvideo';
  function get1(sql_1) {
    return new Promise((resolve, reject) => {
      CONN.query(sql_1, (err, data) => {
        if (err) {
          console.log(err.sqlMessage);
        } else {
          resolve(data);
        }
      })
    })
  }
  function get2(sql_2) {
    return new Promise((resolve, reject) => {
      CONN.query(sql_2, (err, data) => {
        if (err) {
          console.log(err.sqlMessage);
        } else {
          resolve(data);
        }
      })
    })
  }
  async function getData() {
    let first = await get1(sql_1);
    let second = await get2(sql_2);
    console.log(first, second);
  }
  getData();
  // res.send({
  //   msg: 'ok',
  //   data: 'test',
  //   testId: req.session.userId
  // });
})
server.use('/user', userRouter);
/********************************************************************/
const vegRouter = express.Router();
vegRouter.get('/searchVegName', (req, result) => {
  console.log('searchVegName');
  let getData = req.query;
  let vegName = getData.vegName;
  let sql_1 = 'SELECT vegId,vegName FROM vegs WHERE vegName like "%'+vegName+'"';
  let sql_2 = 'SELECT vegId,vegName FROM vegs WHERE vegName like "'+vegName+'%"';
  let sql_3 = 'SELECT vegId,vegName FROM vegs WHERE vegName like "%'+vegName+'%";';
  let sql_searchVegName = sql_1 + " UNION "+ sql_2 + ' UNION ' + sql_3;
  console.log(sql_searchVegName);
  CONN.query(sql_searchVegName,(err,data) => {
    if(err){
      console.log(err.sqlMessage);
      result.send({
        status: 'fail',
        msg: '网络繁忙，请稍后重试'
      })
    }else {
      console.log(data);
      if(data.length>0){
        result.send({
          status: 'success',
          data: data
        })
      }else {
        result.send({
          status: 'fail',
          msg: '暂无数据'
        })
      }
    }
  })
})
// 搜索veg通过vegId或vegName
vegRouter.get('/searchVegDetail', (req, result) => {
  console.log('search');
  console.log(req.query);
  let getData = req.query;
  let searchVegId='',searchVegName='';
  let sql_allocation_good='';
  let sql_allocation_bad = '';
  let sql_nuitrience = '';
  let sql_getVegId = '';
  // 需要数据： 搭配相宜，搭配禁忌，营养指数，veg详情
  function handleSql(sql){
    return new Promise((resolve,reject) => {
      CONN.query(sql,(err,data) => {
        if(err){
          console.log(err.sqlMessage);
          result.send({
            status: 'fail',
            msg: '网络繁忙，请稍候重试'
          })
        }else {
          resolve(data);
        }
      })
    })
  }
  async function getSearchVegDetailById(){
    let sql_vegDetailById = 'SELECT * FROM vegs WHERE vegId="'+getData.vegId+'";';

    let vegDetail = await handleSql(sql_vegDetailById);
    console.log('vegDetail: ',vegDetail);
    console.log('vegName:',vegDetail[0].vegName);
    
    sql_allocation_good = 'SELECT * FROM veg_collocate WHERE vegsName like "%'+vegDetail[0].vegName+'%";';
    let allocation_good = await handleSql(sql_allocation_good);
    console.log('allocation_good',allocation_good);

    sql_allocation_bad = 'SELECT * FROM veg_collocate_ban WHERE vegsName like "%'+vegDetail[0].vegName+'%";';
    let allocation_bad = await handleSql(sql_allocation_bad);
    console.log('allocation_bad',allocation_bad);

    sql_nuitrience = 'SELECT * FROM veg_nutridata WHERE vegId="'+getData.vegId+'";';
    let nuitrience = await handleSql(sql_nuitrience);
    console.log('nuitrience',nuitrience);
    result.send({
      status: 'success',
      data: {
        vegDet: vegDetail[0],
        allocation_good: allocation_good,
        allocation_bad: allocation_bad,
        nuitrience: nuitrience[0]
      }
    })
  }
  async function getSearchVegDetailByName(){
    let sql_vegDetailByName = 'SELECT * FROM vegs WHERE vegName="'+getData.vegName+'";';
    let vegDetail = await handleSql(sql_vegDetailByName);
    let vegId = '';
    if(!vegDetail){
      res.send({
        status: 'fail',
        msg: '暂无数据'
      })
    }
    console.log('vegDetail: ',vegDetail);
    vegId = vegDetail[0].vegId
    console.log('vegId:',vegId);
    sql_allocation_good = 'SELECT * FROM veg_collocate WHERE vegsName like "%'+getData.vegName+'%";';
    let allocation_good = await handleSql(sql_allocation_good);
    console.log('allocation_good',allocation_good);

    sql_allocation_bad = 'SELECT * FROM veg_collocate_ban WHERE vegsName like "%'+getData.vegName+'%";';
    let allocation_bad = await handleSql(sql_allocation_bad);
    console.log('allocation_bad',allocation_bad);

    sql_nuitrience = 'SELECT * FROM veg_nutridata WHERE vegId="'+vegId+'";';
    let nuitrience = await handleSql(sql_nuitrience);
    console.log('nuitrience',nuitrience);
    result.send({
      status: 'success',
      data: {
        vegDet: vegDetail[0],
        allocation_good: allocation_good,
        allocation_bad: allocation_bad,
        nuitrience: nuitrience[0]
      }
    })
  }
  if(req.query.vegId){
    console.log('vegId搜索');
    // 通过vegId搜索
    getSearchVegDetailById();
  }
  if(req.query.vegName){
    console.log('vegName搜索');
    // 通过vegName搜索
    getSearchVegDetailByName();
  }
})
// 获取搭配详情
vegRouter.get('/getCollocationDetail',(req,result) => {
  console.log('getCollocationDetail');
  let getData = req.query;
  let sql_getColloInfo = 'SELECT * FROM veg_collocate WHERE colloId="'+getData.colloId+'"';
  
  console.log(getData);
  function handleSql(sql){
    return new Promise((resolve,reject) => {
      CONN.query(sql,(err,data) => {
        if(err){
          console.log(err.sqlMessage);
          result.send({
            status: 'fail',
            msg: '网络繁忙，请稍后重试'
          })
        }else {
          resolve(data);
        }
      })
    })
  }
  async function getCollocationDetail(){
    let colloInfo = await handleSql(sql_getColloInfo);
    console.log('getColloInfo',colloInfo);
    let vegsName = colloInfo[0].vegsName.split('，');
    console.log(vegsName);
    let vegInfo = [];
    for(let i=0,len=vegsName.length;i<len;i++){
      let sql_getPerVegInfo = 'SELECT vegId,vegName,vegImg FROM vegs WHERE vegName = "'+vegsName[i]+'";';
      let temp = await handleSql(sql_getPerVegInfo);
      vegInfo[i]=temp[0];
    }
    console.log('vegInfo:',vegInfo);
    let vegIndex =[];
    for(let i=0,len=vegsName.length;i<len;i++){
      let sql_getPerIndex = 'SELECT veg_nutridata.*,vegs.vegName FROM veg_nutridata,vegs WHERE vegs.vegId="'+vegInfo[i].vegId+'" and veg_nutridata.vegId=vegs.vegId;';
      let temp = await handleSql(sql_getPerIndex);
      vegIndex[i] = temp[0];
    }
    console.log('vegIndex：',vegIndex);
    let recommendColloList = [];
    for(let i=0,len=vegsName.length;i<len;i++){
      let sql_recommendCollo = 'SELECT * FROM veg_collocate WHERE vegsName like "%'+vegsName[i]+'%"';
      let temp = await handleSql(sql_recommendCollo);
      recommendColloList[i] = temp[0];
    }
    console.log('recommendColloList',recommendColloList);
    // sql_recommendCollo = '';
    // let recommendCollo = await handleSql(sql_recommendCollo);
    result.send({
      status: 'success',
      data: {
        colloInfo: colloInfo[0],
        vegInfo: vegInfo,
        vegIndex: vegIndex,
        recommendColloList: recommendColloList
      }
    })
  }
  getCollocationDetail();
})
// 拉取首页推荐的搭配信息
vegRouter.get('/getRecommendColloVeg',(req,res) => {
  console.log('getRecommendColloVeg');
  let getData = req.query;
  let pageId = getData.pageId;
  let startId = pageId*20;
  console.log('pageId:',pageId);
  console.log('startId:',startId);
  let sql_getRecommendColloVeg = 'SELECT * FROM veg_collocate LIMIT '+startId+',20';
  CONN.query(sql_getRecommendColloVeg,(err,data) => {
    if(err){
      console.log(err.sqlMessage);
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    }else {
      // console.log(data);
      res.send({
        status: 'success',
        data: data
      })
    }
  })
})
server.use('/veg', vegRouter);
/********************************************************************/
const shareRouter = express.Router();
// 编辑文章
shareRouter.post('/editArticle', (req, result) => {
  console.log('editArticle');
  let USERID = req.session.userId;
  let getData = req.body;
  console.log('用户id:', USERID);
  console.log('title:', getData.title);
  // console.log('text:',getData.text);
  if (USERID) {
    let sql_addArticle = 'INSERT INTO editarticle(userId,title,text) values("' + USERID + '","' + getData.title + '","' + getData.text + '");';
    new Promise((resolve, reject) => {
      CONN.query(sql_addArticle, (err, data) => {
        if (err) {
          console.log(err.sqlMessage);
          console.log('提交失败');
          result.send({
            status: 'fail',
            msg: '提交失败'
          })
        } else {
          console.log(data);
          resolve(data.insertId);
        }
      })
    })
      .then(res => {
        console.log(res);
        let sql_addEditRecord = 'INSERT INTO editrecord(editId,type) values("' + res + '","article");';
        CONN.query(sql_addEditRecord, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            console.log('文章提交成功');
            result.send({
              status: 'success',
              msg: '提交成功',
              insertId: res
            })
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    result.send({
      status: 'overdue',
      msg: '登录失效，请重新登录'
    })
  }
})
// 获取文章
shareRouter.get('/getArticle', (req, res) => {
  console.log('getArticle');
  let getData = req.query;
  let articleId = getData.articleId;
  let sql_getArticle = 'SELECT title,text FROM editarticle where articleId="' + articleId + '";';
  CONN.query(sql_getArticle, (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    } else {
      console.log(data);
      if (data.length == 0) {
        res.send({
          status: 'fail',
          msg: '该文章异常'
        })
      } else {
        res.send({
          status: 'success',
          data: data[0]
        })
      }
    }
  })
})
// 重新编辑文章
shareRouter.post('/reEditArticle', (req, res) => {
  console.log('reEditArticle');
  let getData = req.body;
  let USERID = req.session.userId;
  let sql_reEditArticle = 'UPDATE editarticle SET title="' + getData.title + '",text="' + getData.text + '" where articleId="' + getData.articleId + '";';
  if (USERID) {
    CONN.query(sql_reEditArticle, (err, data) => {
      if (err) {
        console.log(err);
        res.send({
          status: 'fail',
          msg: '网络繁忙，请稍后重试'
        })
      } else {
        console.log('编辑成功');
        res.send({
          status: 'success',
          msg: '编辑成功'
        })
      }
    })
  } else {
    res.send({
      status: 'overdue',
      msg: '登录失效，请重新登录'
    })
  }
})
// 编辑视频     此处要添加multipartMiddleware
shareRouter.post('/editVideo', multipartMiddleware, (req, result) => {
  console.log('editVideo');
  // 接收处文件外的其他参数
  console.log(req.body);
  // req.files接收文件,video是传输过来的文件属性名
  console.log(req.files.video);
  let videoFile = req.files.video;
  let extName = '.' + videoFile.type.split('/')[1];
  let getData = req.body;
  let USERID = req.session.userId;
  console.log(USERID);
  if (USERID) {
    if (videoFile.size > 0) {
      let temp_path = videoFile.path;
      let target_path = '../client/upload/video/' + CREATEHEADFACE() + extName;
      console.log('target_path', target_path);
      new Promise((resolve, reject) => {
        fs.rename(temp_path, target_path, err => {
          if (err) {
            reject(err);
          } else {
            // 去掉首部的点
            resolve(target_path.slice(1, target_path.length));
          }
        })
      })
        .then(res => {
          console.log('视频更名成功');
          let videoFileUrl = res;
          // 存储数据
          let sql_addVideo = 'INSERT INTO editvideo(userId,title,text,src) values("' + USERID + '","' + getData.videoTitle + '","' + getData.videoText + '","' + videoFileUrl + '");';
          CONN.query(sql_addVideo, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              // 返回insertId
              // 插入记录
              let videoInserId = data.insertId;
              let sql_addEditRecord = 'INSERT INTO editrecord(editId,type) values("' + videoInserId + '","video");';
              CONN.query(sql_addEditRecord, (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(data);
                  console.log('视频提交成功');
                  result.send({
                    status: 'success',
                    msg: '提交成功',
                    insertId: videoInserId
                  })
                }
              })
            }
          })
        })
        .catch(err => {
          console.log('视频更名失败');
          console.log(err);
          result.send({
            status: 'fail',
            msg: '网络繁忙，请稍候重试'
          })
        })
    }
  } else {
    result.send({
      status: 'overdue',
      msg: '登录失效，请重新登录'
    })
  }
})
// 获取视频
shareRouter.get('/getVideo', (req, res) => {
  console.log('getVideo');
  let getData = req.query;
  let videoId = getData.videoId;
  let sql_getVideo = 'SELECT title,text,src FROM editvideo  where videoId="' + videoId + '";';
  CONN.query(sql_getVideo, (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    } else {
      console.log(data);
      if (data.length == 0) {
        res.send({
          status: 'fail',
          msg: '该视频异常'
        })
      } else {
        res.send({
          status: 'success',
          data: data[0]
        })
      }
    }
  })
})
// 重新编辑视频
shareRouter.post('/reEditVideo', (req, res) => {
  console.log('reEditVideo');
  let getData = req.body;
  let USERID = req.session.userId;
  console.log(getData);
  let sql_reEditVideo = 'UPDATE editvideo SET title="' + getData.videoTitle + '",text="' + getData.videoText + '" where videoId="' + getData.videoId + '";';
  if (USERID) {
    CONN.query(sql_reEditVideo, (err, data) => {
      if (err) {
        console.log('video信息更新失败');
        res.send({
          status: 'fail',
          msg: 'video信息更新失败'
        })
      } else {
        console.log('video信息更新成功');
        res.send({
          status: 'success',
          msg: 'video信息更新成功'
        })
      }
    })
  } else {
    res.send({
      status: 'overdue',
      msg: '登录失效，请重新登录'
    })
  }
})
// 编辑音频
shareRouter.post('/editAudio', multipartMiddleware, (req, result) => {
  console.log('editAudioFile');
  // 接收处文件外的其他参数
  console.log(req.body);
  // req.files接收文件,video是传输过来的文件属性名
  console.log(req.files.audio);
  let audioFile = req.files.audio;
  let extName = '.' + audioFile.type.split('/')[1];
  let getData = req.body;
  let USERID = req.session.userId;
  console.log(USERID);
  let temp_path = '';
  let target_path = '';
  let recorderBuffer = '';
  if (USERID) {
    switch (getData.audioType) {
      case 'file':
        console.log('file');
        if (audioFile.size > 0) {
          temp_path = audioFile.path;
          target_path = '../client/upload/audio/' + CREATEHEADFACE() + extName;
          console.log('target_path', target_path);
          new Promise((resolve, reject) => {
            fs.rename(temp_path, target_path, err => {
              if (err) {
                reject(err);
              } else {
                resolve(target_path.slice(1, target_path.length));
              }
            })
          })
            .then(res => {
              console.log('音频更名成功');
              let audioFileUrl = res;
              // 存储数据
              let sql_addAudio = 'INSERT INTO editaudio(userId,title,text,src) values("' + USERID + '","' + getData.audioTitle + '","' + getData.audioText + '","' + audioFileUrl + '");';
              CONN.query(sql_addAudio, (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(data);
                  // 返回insertId
                  // 插入记录
                  let audioInserId = data.insertId;
                  let sql_addEditRecord = 'INSERT INTO editrecord(editId,type) values("' + audioInserId + '","audio");';
                  CONN.query(sql_addEditRecord, (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(data);
                      console.log('音频提交成功');
                      result.send({
                        status: 'success',
                        msg: '提交成功',
                        insertId: audioInserId
                      })
                    }
                  })
                }
              })
            })
            .catch(err => {
              console.log('音频更名失败');
              console.log(err);
              result.send({
                status: 'fail',
                msg: '网络繁忙，请稍候重试'
              })
            })
        }
        break;
      case 'record':
        console.log('record');
        recorderBuffer = Buffer.from(getData.audio, 'base64');
        target_path = './upload/audio/' + CREATEHEADFACE() + ".mp3";
        new Promise((resolve, reject) => {
          fs.writeFile(target_path, recorderBuffer, err => {
            if (err) {
              reject(err);
            } else {
              resolve(target_path.slice(1, target_path.length));
            }
          })
        })
          .then(res => {
            console.log('音频存入文件成功');
            let audioFileUrl = res;
            // 存储数据
            let sql_addAudio = 'INSERT INTO editaudio(userId,title,text,audioUrl) values("' + USERID + '","' + getData.audioTitle + '","' + getData.audioText + '","' + audioFileUrl + '");';
            CONN.query(sql_addAudio, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
                // 返回insertId
                // 插入记录
                let audioInserId = data.insertId;
                let sql_addEditRecord = 'INSERT INTO editrecord(editId,type) values("' + audioInserId + '","audio");';
                CONN.query(sql_addEditRecord, (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(data);
                    console.log('音频提交成功');
                    result.send({
                      status: 'success',
                      msg: '提交成功',
                      insertId: audioInserId
                    })
                  }
                })
              }
            })
          })
          .catch(err => {
            console.log('音频更名失败');
            console.log(err);
            result.send({
              status: 'fail',
              msg: '网络繁忙，请稍候重试'
            })
          })
        break;
    }
  } else {
    result.send({
      status: 'overdue',
      msg: '登录失效，请重新登录'
    })
  }
})
// 获取音频
shareRouter.get('/getAudio', (req, res) => {
  console.log('getAudio');
  let getData = req.query;
  let audioId = getData.audioId;
  console.log(req.query);
  let sql_getAudio = 'SELECT title,text,src FROM editaudio where audioId="' + audioId + '";';
  CONN.query(sql_getAudio, (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    } else {
      console.log(data);
      if (data.length == 0) {
        res.send({
          status: 'fail',
          msg: '该音频异常'
        })
      } else {
        res.send({
          status: 'success',
          data: data[0]
        })
      }
    }
  })
})
// 重新编辑音频
shareRouter.post('/reEditAudio', (req, res) => {
  console.log('reEditAudio');
  let getData = req.body;
  let USERID = req.session.userId;
  let sql_reEditAudio = 'UPDATE editaudio SET title="' + getData.audioTitle + '",text="' + getData.audioText + '" where audioId="' + getData.audioId + '";';;
  if (USERID) {
    CONN.query(sql_reEditAudio, (err, data) => {
      if (err) {
        res.send({
          status: 'fail',
          msg: 'audio信息更新失败'
        })
      } else {
        res.send({
          status: 'success',
          msg: 'audio信息更新成功'
        })
      }
    });
  } else {
    res.send({
      status: 'overdue',
      msg: '登录失效，请重新登录'
    })
  }
})
// 获取详情
shareRouter.get('/getShareDetail', (req, res) => {
  console.log('getShareDetail');
  let getData = req.query;
  console.log(getData);
  let sql_getShareDetail = "";
  function getShareInfo(sql) {
    return new Promise((resolve, reject) => {
      CONN.query(sql, (err, data) => {
        if (err) {
          console.log(err.sqlMessage);
        } else {
          let nowData = Object.assign(data[0], { time: moment(data[0].time).format('YYYY-MM-DD HH:mm:ss') });
          resolve(nowData);
        }
      })
    })
  }
  function getRemarkDetail(id) {
    let sql_getRemark = 'SELECT share_remark.*,user.userName from share_remark,user where share_remark.editrecordId="' + id + '" and share_remark.userId=user.userId order by remarkTime desc;';
    return new Promise((resolve, reject) => {
      CONN.query(sql_getRemark, (err, data) => {
        if (err) {
          console.log(err.sqlMessage);
        } else {
          if (data.length > 0) {
            for (let i = 0, len = data.length; i < len; i++) {
              data[i] = Object.assign(data[i], { remarkTime: moment(data[i].remarkTime).format('YYYY-MM-DD HH:mm:ss') });

              CONN.query()
            }
          }
          let nowRemarkData = data;
          resolve(data);
        }
      })
    })
  }

  function getReplyDetail(remark) {
    return new Promise((resolve, reject) => {
      remark.forEach((item, index) => {
        let sql_getReply = 'SELECT share_remark_reply.*,user.userName FROM share_remark_reply,user WHERE share_remark_reply.remarkId="' + item.remarkId + '" and share_remark_reply.userId=user.userId order by replyTime desc;';
        CONN.query(sql_getReply, (err, data) => {
          if (err) {
            console.log(err.sqlMessage);
          } else {
            for (let i = 0, len = data.length; i < len; i++) {
              data[i] = Object.assign(data[i], { replyTime: moment(data[i].replyTime).format('YYYY-MM-DD HH:mm:ss') });
            }
            console.log(data);
            Object.assign(item, { reply: data });
            if (index === remark.length - 1) {
              resolve(remark);
            }
          }
        })
      })
    })
  }
  async function getShareDetail(sql_shareDetail) {
    let shareDetail = await getShareInfo(sql_shareDetail);
    console.log('分享详情', shareDetail);
    let editRecordId = shareDetail.id;
    console.log('editRecordId:', editRecordId);
    let remarkDetail = [];
    let replyDetail = [];
    if (editRecordId) {
      
      remarkDetail = await getRemarkDetail(editRecordId);
    }
    console.log('评论详情', remarkDetail);
    if (remarkDetail.length>0) {
      console.log('存在remarkDetail');
      replyDetail = await getReplyDetail(remarkDetail);
    }
    console.log('回复详情', replyDetail);
    res.send({
      status: 'success',
      data: Object.assign(shareDetail, { remark: replyDetail })
    })
  }
  switch (getData.type) {
    case 'article':
      console.log('article');
      sql_getShareDetail = 'SELECT editarticle.*,user.userName,editrecord.time,editrecord.readNum,editrecord.id FROM editarticle,user,editrecord WHERE editarticle.articleId="' + getData.id + '" and user.userId=editarticle.userId and editrecord.editId="' + getData.id + '" and editrecord.type="article";';
      break;
    case 'video':
      console.log('video');
      sql_getShareDetail = 'SELECT editvideo.*,user.userName,editrecord.time,editrecord.readNum,editrecord.id FROM editvideo,user,editrecord WHERE editvideo.videoId="' + getData.id + '" and user.userId=editvideo.userId and editrecord.editId="' + getData.id + '" and editrecord.type="video";';
      break;
    case 'audio':
      console.log('audio');
      sql_getShareDetail = 'SELECT editaudio.*,user.userName,editrecord.time,editrecord.readNum,editrecord.id FROM editaudio,user,editrecord WHERE editaudio.audioId="' + getData.id + '" and editaudio.userId=user.userId and editrecord.editId="' + getData.id + '" and editrecord.type="audio";';
      break;
  }
  getShareDetail(sql_getShareDetail);
})
// 添加shareDetail评论
shareRouter.post('/addShareRemark', (req, result) => {
  console.log('addShareRemark');
  let getData = req.body;
  let USERID = req.session.userId;
  console.log(getData);
  let sql_addShareRemark = 'INSERT INTO share_remark(editrecordId,userId,remarkText) VALUES("' + getData.editrecordId + '","' + USERID + '","' + getData.remarkText + '");';
  let sql_getUserName = 'SELECT userName FROM user WHERE userId="' + USERID + '";';
  let sql_getBeRemarkedUserEmail = 'SELECT email FROM user WHERE userId="' + getData.authorId + '";';
  let sql_updateRemarkNum = 'UPDATE editrecord SET remarkNum=remarkNum+1 where id="'+getData.editrecordId+'";' ;
  let remarkUserName = '';
  let remarkId = '';
  let remarkUserId = '';
  function handleSql(sql){
    return new Promise((resolve,reject) => {
      CONN.query(sql,(err,data) => {
        if(err){
          res.send({
            status: 'fail',
            msg: '网络繁忙，请稍后重试'
          })
        }else {
          resolve(data);
        }
      })
    })
  }
  function sendEmail(email,remarkId){
    return new Promise((resolve,reject) =>{
      MAILER(nodemailer, {
        // 被发送者
        to: email,
        // 邮件标题
        emailTitle: '健康饮食搭配平台——用户【' + req.session.userName + '】评论了您的动态',
        // 链接
        shareUrl: getData.shareUrl,
        // 邮件正文
        emailText: getData.remarkText,
        // 本评论的动态标题
        shareTitle: getData.shareTitle,
        // 成功回调
        success: (err) => {
          console.log(err);
          resolve(true);
        },
        // 失败回调
        fail: (info) => {
          console.log(info);
          resolve(false);
        }
      })
    })
  }
  async function addShareRemarkAsync(){
    let addShareRemark = await handleSql(sql_addShareRemark);
    let remarkId = addShareRemark.inserId;
    let getBeRemarkedUserEmail = await handleSql(sql_getBeRemarkedUserEmail);
    let updateRemarkNum = await handleSql(sql_updateRemarkNum);
    let userEmail = getBeRemarkedUserEmail[0].email;
    let sendEmailState = await sendEmail(userEmail,remarkId);
    if(sendEmailState){
      result.send({
        status: 'success',
        msg: '评论成功，邮件已发送',
        data: {
          remarkId: remarkId,
        }
      })
    }else {
      result.send({
        status: 'success',
        msg: '评论成功，邮件发送失败',
        data: {
          remarkId: remarkId,
        }
      })
    }
  }
  if (USERID) {
    addShareRemarkAsync();
  } else {
    result.send({
      status: 'overdue',
      msg: '登录超时，请重新登录'
    })
  }
})
// 添加shareDetail回复
shareRouter.post('/addShareReply', (req, result) => {
  console.log('addShareReply');
  let getData = req.body;
  let USERID = req.session.userId;
  let sql_addShareReply = 'INSERT INTO share_remark_reply(remarkId,userId,beReplyedUserId,replyText) VALUES(' + getData.remarkId + ',"' + USERID + '","' + getData.beReplyedUserId + '","' + getData.replyText + '");';
  let sql_getByReplyedEmail = 'SELECT email FROM user WHERE userId="' + getData.beReplyedUserId + '";';
  console.log(getData);
  console.log(USERID);
  function addShareReply(sql) {
    return new Promise((resolve, reject) => {
      CONN.query(sql, (err, data) => {
        if (err) {
          console.log(err.sqlMessage);
          result.send({
            status: 'fail',
            msg: '网络繁忙，请稍后重试'
          })
        } else {
          console.log(data);
          resolve(data.insertId);
        }
      })
    })
  }
  function getByReplyedEmail(sql) {
    return new Promise((resolve, reject) => {
      CONN.query(sql, (err, data) => {
        if (err) {
          console.log(err.sqlMessage);
          result.send({
            status: 'fail',
            msg: '网络繁忙，请稍后重试'
          })
        } else {
          console.log(data);
          resolve(data[0].email);
        }
      })
    })
  }
  function sendEmail(email) {
    return new Promise((resolve, reject) => {
      // 发邮件
      MAILER(nodemailer, {
        // 被发送者
        to: email,
        // 邮件标题
        emailTitle: '健康饮食搭配平台——用户【' + req.session.userName + '】回复了您的评论',
        // 链接
        shareUrl: getData.shareUrl,
        // 邮件正文
        emailText: getData.replyText,
        // 本评论的动态标题
        shareTitle: getData.shareTitle,
        // 成功回调
        success: (err) => {
          console.log(err);
          resolve(true);
          // result.send({
          //   status: 'success',
          //   msg: '评论成功，邮件已发送',
          //   data: {
          //     remarkId: remarkId,
          //   }
          // })
        },
        // 失败回调
        fail: (info) => {
          console.log(info);
          resolve(false);
          // result.send({
          //   status: 'success',
          //   msg: '评论成功，邮件发送失败',
          //   data: {
          //     remarkId: remarkId,
          //   }
          // })
        }
      })
    })
  }
  async function addShareReply_sendEmail() {
    let insertReplyId = await addShareReply(sql_addShareReply);
    let ByReplyedEmail = await getByReplyedEmail(sql_getByReplyedEmail);
    let sendEmailState;
    if (ByReplyedEmail) {
      sendEmailState = await sendEmail(ByReplyedEmail);
    }
    console.log('inserReplyId:', insertReplyId);
    console.log('要发送的email:', ByReplyedEmail);
    console.log('邮件发送情况', sendEmailState);
    if (sendEmailState) {
      result.send({
        status: 'success',
        msg: '回复成功，邮件发送成功',
        data: {
          replyId: insertReplyId
        }
      })
    } else {
      result.send({
        status: 'success',
        msg: '回复成功，但邮件发送失败',
        data: {
          replyId: insertReplyId
        }
      })
    }
  }
  if (USERID) {
    addShareReply_sendEmail();
  } else {
    result.send({
      status: 'overdue',
      msg: '登陆超时，请重新登录'
    })
  }
})
// 删除shareDetail评论
shareRouter.get('/deleteRemark', (req, result) => {
  console.log('deleteRemark');
  let USERID = req.session.userId;
  let getData = req.query;
  let sql_delReply = 'DELETE FROM share_remark_reply WHERE remarkId="' + getData.remarkId + '";';
  let sql_delRemark = 'DELETE FROM share_remark WHERE remarkId="' + getData.remarkId + '";';
  console.log(getData);
  function handleSql(sql) {
    return new Promise((resolve, reject) => {
      CONN.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          result.send({
            status: 'fail',
            msg: '网络繁忙，请稍后重试'
          })
        } else {
          resolve(true);
        }
      })
    })
  }
  async function deleteRemark() {
    let delReplyInfo = handleSql(sql_delReply);
    let delRemarkInfo = handleSql(sql_delRemark);
    if (delReplyInfo && delRemarkInfo) {
      result.send({
        status: 'success',
        msg: '删除成功'
      })
    }
  }
  if (USERID) {
    deleteRemark();
  } else {
    result.send({
      status: 'overdue',
      msg: '登陆超时，请重新登陆'
    })
  }
})
// 删除sharedetail回复
shareRouter.get('/deleteReply', (req, result) => {
  console.log('deleteReply');
  let USERID = req.session.userId;
  let getData = req.query;
  console.log(getData);
  let sql_deleteReply = 'DELETE FROM share_remark_reply WHERE replyId="' + getData.replyId + '";';
  if (USERID) {
    CONN.query(sql_deleteReply, (err, data) => {
      if (err) {
        console.log(err.sqlMessage);
        result.send({
          status: 'fail',
          msg: '网络繁忙，请稍候重试'
        })
      } else {
        console.log(data);
        result.send({
          status: 'success',
          msg: '删除成功'
        })
      }
    })
  } else {
    result.send({
      status: 'overdue',
      msg: '登录超时，请重新登录'
    })
  }
})
// 获取推荐share
shareRouter.get('/getRecommendShare',(req,res) => {
  console.log('getRecommendShare');
  let getData = req.query;
  console.log(getData);
  let startId = getData*20;
  let endId = 20;
  let sql_article = 'SELECT editrecord.*,editarticle.title,editarticle.text,editarticle.src,user.userName FROM editrecord,editarticle,user WHERE editrecord.type="article" and editrecord.editId=editarticle.articleId and editarticle.userId=user.userId';
  let sql_video = 'SELECT editrecord.*,editvideo.title,editvideo.text,editvideo.src,user.userName FROM editrecord,editvideo,user WHERE editrecord.type="video" and editrecord.editId=editvideo.videoId and editvideo.userId=user.userId';
  let sql_audio = 'SELECT editrecord.*,editaudio.title,editaudio.text,editaudio.src,user.userName FROM editrecord,editaudio,user WHERE editrecord.type="audio" and editrecord.editId=editaudio.audioId and editaudio.userId=user.userId order by time desc';
  let sql_getAllArticle = sql_article+' UNION '+sql_video+' UNION '+sql_audio;
  // + 'order by editrecord.time desc';
  console.log(sql_getAllArticle);
  CONN.query(sql_getAllArticle,(err,data) => {
    if(err){
      console.log(err);
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    }else {
      console.log(data);
      for(let i=0,len=data.length;i<len;i++){
        data[i] = Object.assign(data[i],{time: moment(data[i].time).format('YYYY-MM-DD HH:mm:ss')});
      }
      res.send({
        status: 'success',
        data: data
      })
    }
  })
})
// 获取定量文章
shareRouter.get('/getAllArticle',(req,res) => {
  console.log('getAllArticle');
  let getData = req.query;
  console.log(getData);
  let startId = parseInt(getData.page)*20;
  console.log(startId);
  let sql_getAllArticle = 'SELECT editrecord.*,editarticle.title,editarticle.text,editarticle.src,user.userName FROM editrecord,editarticle,user WHERE editrecord.type="article" and editrecord.editId=editarticle.articleId and editarticle.userId=user.userId;';
  CONN.query(sql_getAllArticle,(err,data) => {
    if(err){
      console.log(err);
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    }else {
      for(let i=0,len=data.length;i<len;i++){
        data[i] = Object.assign(data[i],{time: moment(data[i].time).format('YYYY-MM-DD HH:mm:ss')});
      }
      console.log(data);
      res.send({
        status: 'success',
        data: data
      })
    }
  })
})
// 获取定量音频
shareRouter.get('/getAllAudio',(req,res) => {
  console.log('getAllAudio');
  let getData = req.query;
  console.log(getData);
  let startId = parseInt(getData.page)*20;
  let sql_getAllArticle = 'SELECT editrecord.*,editaudio.title,editaudio.text,editaudio.src,user.userName FROM editrecord,editaudio,user WHERE editrecord.type="audio" and editrecord.editId=editaudio.audioId and editaudio.userId=user.userId;';
  CONN.query(sql_getAllArticle,(err,data) => {
    if(err){
      console.log(err);
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    }else {
      for(let i=0,len=data.length;i<len;i++){
        data[i] = Object.assign(data[i],{time: moment(data[i].time).format('YYYY-MM-DD HH:mm:ss')});
      }
      console.log(data);
      res.send({
        status: 'success',
        data: data
      })
    }
  })
})
// 获取定量视频
shareRouter.get('/getAllVideo',(req,res) => {
  console.log('getAllVideo');
  let getData = req.query;
  console.log(getData);
  let startId = parseInt(getData.page)*20;
  let sql_getAllArticle = 'SELECT editrecord.*,editvideo.title,editvideo.text,editvideo.src,user.userName FROM editrecord,editvideo,user WHERE editrecord.type="video" and editrecord.editId=editvideo.videoId and editvideo.userId=user.userId;';
  CONN.query(sql_getAllArticle,(err,data) => {
    if(err){
      console.log(err);
      res.send({
        status: 'fail',
        msg: '网络繁忙，请稍候重试'
      })
    }else {
      for(let i=0,len=data.length;i<len;i++){
        data[i] = Object.assign(data[i],{time: moment(data[i].time).format('YYYY-MM-DD HH:mm:ss')});
      }
      console.log(data);
      res.send({
        status: 'success',
        data: data
      })
    }
  })
})
server.use('/share', shareRouter);
/********************************************************************/
const usercenterRouter = express.Router();
// 获取用户信息
usercenterRouter.get('/getMyInfo', (req, res) => {
  console.log('getMyInfo');
  let USERID = req.session.userId;
  let sql_getMyInfo = 'SELECT userId,email,userName,userPass,userFace FROM user where userId="' + USERID + '";';
  if (USERID) {
    CONN.query(sql_getMyInfo, (err, data) => {
      if (err) {
        console.log('获取用户信息失败');
        console.log(err);
        res.send({
          status: 'fail',
          msg: '获取用户信息失败'
        })
      } else {
        console.log(data);
        let getData = data[0];
        res.send({
          status: 'success',
          data: {
            userId: getData.userId,
            userName: getData.userName,
            email: getData.email,
            passLoginOpen: getData.userPass ? true : false,
            faceLoginOpen: getData.userFace ? true : false
          }
        })
      }
    })
  } else {
    console.log('用户登录失效');
    res.send({
      status: 'overdue',
      msg: '登录失效，请重新登录'
    })
  }
})
// 获取搭配收藏
usercenterRouter.get('/getMyCollection',(req,res) => {
  console.log('getMyCollection');
  let sql_getMyCollection = '';
  let getData = req.query;
  let USERID = req.session.userId;
  if(USERID){
    CONN.query(sql_getMyCollection,(err,data) => {
      if(err){
        console.log(err.sqlMessage);
        res.send({
          status: 'fail',
          msg: '网络繁忙，请稍后重试'
        })
      }else {
        console.log(data);
        res.send({
          status: 'success',
          data: data
        })
      }
    })
  }else {
    res.send({
      status: 'overdue',
      msg: '登陆失效，请重新登录'
    })
  }
})
// 获取评论
usercenterRouter.get('/getMyRemark',(req,res) => {
  console.log('getMyRemark');
  let USERID = req.session.userId;
  if(USERID){
    let sql_article = 'SELECT editrecord.type,editrecord.editId,editarticle.title,share_remark.remarkText,share_remark.remarkTime FROM editrecord,editarticle,share_remark WHERE share_remark.userId="'+USERID+'" and share_remark.editrecordId=editrecord.editId and editrecord.type="article" and editrecord.editId=editarticle.articleId';
    let sql_video = 'SELECT editrecord.type,editrecord.editId,editarticle.title,share_remark.remarkText,share_remark.remarkTime FROM editrecord,editarticle,share_remark WHERE share_remark.userId="'+USERID+'" and share_remark.editrecordId=editrecord.editId and editrecord.type="video" and editrecord.editId=editarticle.videoId';
    let sql_audio = 'SELECT editrecord.type,editrecord.editId,editarticle.title,share_remark.remarkText,share_remark.remarkTime FROM editrecord,editarticle,share_remark WHERE share_remark.userId="'+USERID+'" and share_remark.editrecordId=editrecord.editId and editrecord.type="auduo" and editrecord.editId=editarticle.audioId;';
    let sql_getMyRemark = sql_article+' UNION ALL '+sql_video+ ' UNION ALL '+ sql_audio;
    CONN.query(sql_getMyRemark,(err,data) => {
      if(err){
        console.log(err.sqlMessage);
        res.send({
          status: 'fail',
          msg: '网络繁忙，请稍后重试'
        })
      }else {
        for(let i=0,len=data.length;i<len;i++){
          data[i] = Object.assign(data[i],{time: moment(data[i].time).format('YYYY-MM-DD HH:mm:ss')});
        }
        console.log(data);
        res.send({
          status: 'success',
          data: data
        })
      }
    })
  }else {
    res.send({
      status: 'overdue',
      msg: '登陆失效，请重新登录'
    })
  }
})
// 获取消息
usercenterRouter.get('/getMyNews',(req,res) => {
  console.log('getMyNews');
  let sql_getMyNews = '';
  let USERID = req.session.userId;
  if(USERID){
    let sql_article = 'SELECT share_remark_reply.replyText,share_remark_reply.time,user.userName,share_remark.remarkText,editarticle.articleId FROM share_remark_reply,user WHERE share_remark_reply.byReplyedUserId="'+USERID+'" and share_remark_reply.beReplyedUserId="'+USERID+'" share_remark_reply.userId=user.userId and share_remark_reply.editrecordId=editrecord.id and editrecord.editId=editarticle.articleId and editrecord.type="article"';
    let sql_video = 'SELECT share_remark_reply.replyText,share_remark_reply.time,user.userName,share_remark.remarkText,editarticle.articleId FROM share_remark_reply,user WHERE share_remark_reply.byReplyedUserId="'+USERID+'" and share_remark_reply.beReplyedUserId="'+USERID+'" share_remark_reply.userId=user.userId and share_remark_reply.editrecordId=editrecord.id and editrecord.editId=editvideo.videoId and editrecord.type="video"';
    let sql_audio = 'SELECT share_remark_reply.replyText,share_remark_reply.time,user.userName,share_remark.remarkText,editarticle.articleId FROM share_remark_reply,user WHERE share_remark_reply.byReplyedUserId="'+USERID+'" and share_remark_reply.beReplyedUserId="'+USERID+'" share_remark_reply.userId=user.userId and share_remark_reply.editrecordId=editrecord.id and editrecord.editId=editaudio.articleId and editrecord.type="audio"';
    let sql_getMyNews = sql_article + ' UNION ALL '+ sql_video+ ' UNION ALL'+sql_audio;
    CONN.query(sql_getMyNews,(err,data) => {
      if(err){
        console.log(err.sqlMessage);
        res.send({
          status: 'fail',
          msg: '网络繁忙，请稍候重试'
        })
      }else {
        console.log(data);
        res.send({
          status: 'success',
          data: data
        })
      }
    })
  }else {
    res.send({
      status: 'overdue',
      msg: '登录过期，请重新登录'
    })
  }
})
// 获取发布的动态
usercenterRouter.get('/getMyPost',(req,res) => {
  console.log('getMyPost');
  let USERID = req.session.userId;
  if(USERID){
    let sql_article = 'SELECT editarticle.articleId as `id`,editarticle.title,editrecord.type,editrecord.time FROM editarticle,editrecord WHERE editarticle.userId="'+USERID+'" and editarticle.articleId=editrecord.editId and editrecord.type="article"';
    let sql_video = 'SELECT editvideo.videoId as `id`,editvideo.title,editrecord.type,editrecord.time FROM editvideo,editrecord WHERE editvideo.userId="'+USERID+'" and editvideo.videoId=editrecord.editId and editrecord.type="video"';
    let sql_audio = 'SELECT editaudio.audioId as `id`,editaudio.title,editrecord.type,editrecord.time FROM editaudio,editrecord WHERE editaudio.userId="'+USERID+'" and editaudio.audioId=editrecord.editId and editrecord.type="audio"';
    let sql_getMyPost = sql_article+' UNION ALL '+sql_video+' UNION ALL '+sql_audio;
    CONN.query(sql_getMyPost,(err,data) => {
      if(err){
        console.log(err.sqlMessage);
        res.send({
          status: 'fail',
          msg: '网络繁忙，请稍候重试'
        })
      }else {
        for(let i=0,len=data.length;i<len;i++){
          data[i] = Object.assign(data[i],{time: moment(data[i].time).format('YYYY-MM-DD HH:mm:ss')});
        }
        console.log(data);
        res.send({
          status: 'success',
          data: data
        })
      }
    })
  }else {
    res.send({
      status: 'overdue',
      msg: '登录过期，请重新登录'
    })
  }
})
// 删除发布的动态
usercenterRouter.get('/delPost',(req,res) => {
  console.log('delPost');
  let getData = req.query;
  let USERID = req.session.userId;
  let sql_getRemarkId = 'SELECT remarkId FROM share_remark WHERE editrecordId IN(SELECT id FROM editrecord WHERE type="'+getData.type+'" and editId="'+getData.id+'")';
  let sql_delReply = '';
  let sql_delRemark = '';
  let sql_delPost = '';
  let sql_delEditRecord = '';
  // 先找到remarkId删除所有reply，然后删除所有remark,然后删除editArticle/editVideo/editAudio中的数据，最后删除editRecord里的数据
  function handleSql(sql){
    return new Promise((resolve,reject) => {
      CONN.query(sql,(err,data) => {
        if(err){
          console.log(err);
          res.send({
            status: 'fail',
            msg: '网络繁忙，请稍后重试'
          })
        }else {
          console.log(data);
          resolve(data);
        }
      })
    })
  }
  async function delPost(){
    // 找remarkId
    let getRemarkId = await handleSql(sql_getRemarkId);
    // remark可能是数组
    let remarkId = delReplyState[0].remarkId;
    console.log('getRemarkId:',getRemarkId);
    console.log('remarkId:',remarkId);
    // 删除reply
    sql_delReply = 'DELETE FROM share_remark_reply WHERE remarkId="'+remarkId+'";';
    let delReplyState = await handleSql(sql_delReply);
    console.log('delReplyState:',delReplyState);
    // 删除remark
    sql_delRemark = 'DELETE FROM share_remark WHERE remarkId="'+remarkId+'";';
    let delRemarkState = await handleSql(sql_delRemark);
    console.log('delRemarkState:',delRemarkState);
    // 删除editArticle/editVideo/editAudio
    sql_delPost = 'DELETE FROM edit+'+getData.type+' WHERE '+getData.type+'Id ="'+getData.id+'";';
    let delPostState = await handleSql(sql_delPost);
    console.log('delPostState',delPostState);
    // 删除editRecord
    sql_delEditRecord = 'DELETE FROM editrecord WHERE type="'+getData.type+'" and editId="'+getData.id+'";';
    let delEditRecord = handleSql(sql_delEditRecord);
    console.log('delEditRecord:',delEditRecord);
    res.send({
      status: 'success',
      msg: '删除成功'
    })    
  }
  // if(USERID){
    delPost();
  // }else {
    res.send({
      status: 'overdue',
      msg: '登陆超时，请重新登录'
    })
  // }
})
server.use('/usercenter', usercenterRouter);
/********************************************************************/
const serviceRouter = express.Router();
serviceRouter.get('/chat', function (req, res) {
  console.log(req.query);
  // 闲聊实例
  let xianliao_req = new models.ChatRequest();
  // let params = '{}';
  let params = {
    "Text": req.query.text,
    "ProjectId": 0,
    "User": JSON.stringify({ "id": "kskndck", "gender": "male" })
  };
  params = JSON.stringify(params);
  xianliao_req.from_json_string(params);

  voice_client.Chat(xianliao_req, function (errMsg, response) {
    if (errMsg) {
      console.log(errMsg);
      res.send({
        status: 'fail',
        answer: '网络开小差了'
      })
    }
    let answer = JSON.parse(response.to_json_string()).Answer;
    console.log(answer);
    // 语音合成
    let textToVoice = new models.TextToVoiceRequest();
    let objToVoice = {
      // 内容
      Text: answer,
      // session标识
      SessionId: 'skdcks111',
      // （int）模型类型，1-默认
      ModelType: 1,
      // (float)音量大小，范围：[0，10]，分别对应10个等级的音量，默认为0
      Volume: 2,
      // (float)语速，范围：[-2，2]，分别对应不同语速：0.6倍，0.8倍，1.0倍，1.2倍，1.5倍，默认为0
      Speed: 1.8,
      // 项目id，用户自定义，默认为0
      ProjectId: 0,
      //(int) 音色: 0-女声1，亲和风格(默认)    1-男声1，成熟风格    2-男声2，成熟风格
      VoiceType: 0,
      // (int)主语言类型    1-中文，最大100个汉字（标点符号算一个汉子） 2-英文，最大支持400个字母（标点符号算一个字母）
      PrimaryLanguage: 2,
      // (int)音频采样率，16000：16k，8000：8k，默认16k
      SampleRate: 16000
    };
    let params_toVoice = JSON.stringify(objToVoice);
    // let params = '{"Text":"这是一首简单的小情歌","SessionId":"sdcsc111","ModelType":1}'
    textToVoice.from_json_string(params_toVoice);
    voice_client.TextToVoice(textToVoice, function (errMsg, response) {
      if (errMsg) {
        console.log(errMsg);
        res.send({
          status: 'fail',
          answer: '网络开小差了'
        })
      }
      let auto = JSON.parse(response.to_json_string()).Audio;
      res.send({
        status: 'success',
        answer: answer,
        data: auto
      });
    });
  });
})
server.use('/service', serviceRouter);
/********************************************************************/
server.use(expressStatic('../client7/dist'));
// server.use(expressStatic('../client'));
server.listen(8000);



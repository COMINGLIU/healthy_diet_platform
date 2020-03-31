1.post请求
fetch(url,{
  method: 'post',
  mode: 'cors',
  headers: {
    'Accept': 'application/json;charset=utf-8',
    'Content-type': 'application/json'
  },
  body: JSON.stringify({}),
  // 加上才能携带cookie
  credentials: 'include'
})
.then(res => res.json())
.then(res => {

})
.catch(err => {

})

get请求
fetch(url,{
  method: 'get',
  mode: 'cors'
})
.then(res => res.json())
.then(res => {

})
.catch(err => {

})

2.assign:用于对象的合并
Object.assign(target,source1,source2)
  target:目标对象
  其他：都是源对象
  如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
eg: Object.assign({a:1,b:2,c:4},{a:10,d:200})
>>{a: 10, b: 2, c: 4, d: 200}

3.去除ico请求
app.use(function (req, res) {
 if (req.url === '/favicon.ico') {
 return
 }

 4.

 5.
 <form method="post" onSubmit={(e) => e.preventDefault()}> 

 6.前端无法获取后台req.session创建的用于保存sessionId的cookie
 
 7.
 可以直接设置input标签的accept属性来限制上传文件的类型

<input type="file" accept="application/msword" ><br><br>accept属性列表<br>12

1.accept=”application/msexcel”
2.accept=”application/msword”
3.accept=”application/pdf”
4.accept=”application/poscript”
5.accept=”application/rtf”
6.accept=”application/x-zip-compressed”
7.accept=”audio/basic”
8.accept=”audio/x-aiff”
9.accept=”audio/x-mpeg”
10.accept=”audio/x-pn/realaudio”
11.accept=”audio/x-waw”
12.accept=”image/gif”
13.accept=”image/jpeg”
14.accept=”image/tiff”
15.accept=”image/x-ms-bmp”
16.accept=”image/x-photo-cd”
17.accept=”image/x-png”
18.accept=”image/x-portablebitmap”
19.accept=”image/x-portable-greymap”
20.accept=”image/x-portable-pixmap”
21.accept=”image/x-rgb”
22.accept=”text/html”
23.accept=”text/plain”
24.accept=”video/quicktime”
25.accept=”video/x-mpeg2”
26.accept=”video/x-msvideo”

如果限制上传的文件为图片格式，则可以直接写成：accept = ‘image/*’；

8.文件支持多选： multiple
<input type="file" id="multifile" multiple size="80"/>

9.上传文件
formEle.bookImg.onchange = function(){
  console.log(this.files[0]);
  file = this.files[0];
  data = new FormData();
  data.append('act','addBook');
  // 填写shopperId
  data.append('shopperId',SHOPPERID);
  // 填写userName
  data.append('userName','QPQ');
  data.append('bookImg',file);
  // 以下代码是将图片放在网页框中
  var obj = new FileReader(file);
  obj.readAsDataURL(file);
  obj.onload = function(){
    book_img.src = this.result;
  };
};

10.node接收post传输的formData数据
// multiPart：用于接收formData数据的中转器
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// 设置上传文件接收文件夹(先设置一个接收文件的临时文件夹)
server.use(multipart({uploadDir: './temp'}));

server.post(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());
// 设置一下接收post文件的大小，否则默认大小可能接受不了过大文件
server.use(bodyParser.json({ limit: '2100000kb' }));

// 此处要添加multipartMiddleware
shareRouter.post('/editVideo',multipartMiddleware,(req,res) => {
  // req.body接收处文件外的其他参数
  console.log(req.body);
  // req.files接收文件
  console.log(req.files);
  if(videoFile.size>0){
    let temp_path = videoFile.path;
    let target_path = './upload/video/'+CREATEHEADFACE()+videoFile.name;
    console.log('target_path',target_path);
    <!-- 改文件名 -->
    fs.rename(temp_path,target_path, err =>{
      if(err){
        console.log(err);
        console.log('视频更名失败');
      }else {
        console.log('视频更名成功');
      }
    })
  }
})

11.刷新页面
window.location.reload();

12.将blob文件转为base64
blobToDataBase64(blob,callback){
  let reader = new FileReader();
  reader.onload = e => {
    callback&&callback(e.target.result);
  }
  reader.readAsDataURL(blob);
}

13.react中input设置默认value
  defaultValue
textarea中直接写在标签内

14.给表创建索引
CREATE INDEX index_name ON table_name(column_list)

15.数据时间格式化
const monent = require('moment');
moment(time).format('YYYY-MM-DD HH:mm:ss')

16.父级给this.props.childre传值
getChildren(){
  const that = this;
  let {children} = that.props;
  return React.Children.map(children,child => {
    return React.cloneElement(child,{
      handleGotoLogin: that.handleGotoLogin
    });
  });
}
{this.getChildren()}

17.默认登录处理
componentDidMount(){
  if(window.localStorage.email){
    this.setState({
      login: true
    })
  }
}

18.MYSQL中limit
limt 4: 前四个
limit 0,4：第0个开始，取4个

19.a标签
a:link - 正常，未访问过的链接
a:visited - 用户已访问过的链接
a:hover - 当用户鼠标放在链接上时
a:active - 链接被点击的那一刻


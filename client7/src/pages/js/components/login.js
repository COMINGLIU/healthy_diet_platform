import React, { Component } from 'react';
import '../../css/commonCss/login.css';
import Face from './face.js';
import serverUrl from '../../js/modules/serverUrl.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loginMethodToggle: 'pass'
      loginMethodToggle: 'pass',
      loginOpenToggle: true,
    };
    this.handlePassLogin = this.handlePassLogin.bind(this);
    this.handleFaceLogin = this.handleFaceLogin.bind(this);
  }
  handlePassLogin() {
    this.setState({
      loginMethodToggle: 'pass'
    });
  }
  handleFaceLogin() {
    this.setState({
      loginMethodToggle: 'face'
    });
  }
  render() {
    let handleLoginClose = this.props.handleLoginClose;
    let handleGotoRegist = this.props.handleGotoRegist;
    if (this.state.loginOpenToggle) {
      return (
        <div className="login-bg">
          <div id="login">
            <h3>登录</h3>
            <LoginMethod
              loginMethodToggle={this.state.loginMethodToggle}
              loginTrue = {this.props.loginTrue}
            />
            <div className="check check-login">
              <p className="check-method">切换登录方式</p>
              <p class="login-method">
                <span onClick={this.handlePassLogin}>账号密码登录</span>
                <span onClick={this.handleFaceLogin}>账号人脸登录</span>
              </p>
            </div>
            <p className="goto-regist" onClick={handleGotoRegist}>注册新账号</p>
            <i onClick={handleLoginClose} className="iconfont icon-Icon_close_black close-btn"></i>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
class PassLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginPassInfo: {},
      defaultValue: '',
      loginInfo: {
        status: '',
        msg: ''
      }
    };
    // 密码登录
    this.handlePassLoginInputChange = this.handlePassLoginInputChange.bind(this);
    this.handlePassLoginSubmit = this.handlePassLoginSubmit.bind(this);
  }
  handlePassLoginInputChange(e){  
    let target = e.target;
    let value = target.value;
    const name = target.name;
    this.setState( prevState => {
      loginPassInfo: Object.assign(prevState.loginPassInfo,{[name]:value})
    })
  }
  handlePassLoginSubmit(){
    console.log('密码登录啦');
    document.querySelector('input[name="passLogin"]').style.backgroundColor="rgb(38,42,63)";
    let loginPassInfo = this.state.loginPassInfo;
    console.log(loginPassInfo);
    let loginTrue = this.props.loginTrue;
    // 主要是邮箱验证
    let emailReg = /^([a-z0 -9_\. -]+)@([\da -z\. -]+)\.([a -z\.]{2,6})$/;
    let formVerify = emailReg.test(loginPassInfo.email);
    let that = this;
    if(loginPassInfo.email&&loginPassInfo.pass&&formVerify){
      fetch(serverUrl+'/user/login',{
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;charset=utf-8',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          act: 'passLogin',
          userInfo: loginPassInfo
        }),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.status === 'success'){
          that.setState({
            loginInfo: {
              status: 'ok',
              msg: res.msg
            }
          })
          const loginInfoStorage = window.localStorage;
          loginInfoStorage.email = that.state.loginPassInfo.email;
          loginInfoStorage.userId = res.data.userId;
          loginInfoStorage.userName=res.data.userName;
          // 关闭登录框
          loginTrue();
        }else {
          that.setState({
            loginInfo: {
              status: 'no',
              msg: res.msg
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  componentDidMount(){
    if(window.localStorage.email){
      let email = window.localStorage.email;
      document.querySelector('.pass-login input[name="email"]').value=email;
      this.setState({
        loginPassInfo: Object.assign(this.state.loginPassInfo,{email: email})
      })
    }
  }
  render() {
    return (
      <div className="pass-login">
      <p style={{"line-height": "10px","color": this.state.loginInfo.status==='ok'?"rgb(152,203,43)":"#f00","margin":0}}>{this.state.loginInfo.msg}</p>
      <form method="post" onSubmit={(e) => e.preventDefault()}> 
        <p>
          <i className="iconfont icon-youjian"></i>
          <input 
            type="text" 
            name="email" 
            placeholder="email" 
            onChange={this.handlePassLoginInputChange}
            pattern="(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)"
            required />
        </p>
        <p className="fill-pass">
          <i className="iconfont icon-Icon_view"></i>
          <input 
            type="password" 
            name="pass" 
            placeholder="密码" 
            onChange={this.handlePassLoginInputChange}
            required />
          <a href="" className="forget-pass">忘记密码</a>
        </p>
        <p>
          <input type="submit" name="passLogin" value="登录" onClick={this.handlePassLoginSubmit}/>
        </p>
        </form>
      </div>
    )
  }
}
class FaceLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginFaceInfo: {},
      loginInfo: {
        status: '',
        msg: ''
      }
    };
    // 人脸登录
    this.handleFaceLoginInputChange = this.handleFaceLoginInputChange.bind(this);
    this.handleFaceLoginSubmit = this.handleFaceLoginSubmit.bind(this);
  }
  handleFaceLoginInputChange(e){
    let target = e.target;
    let value = target.value;
    const name = target.name;
    this.setState( prevState => {
      loginFaceInfo: Object.assign(prevState.loginFaceInfo,{[name]:value})
    })
  }
  handleFaceLoginSubmit(){
    console.log('人脸登录啦');
    document.querySelector('input[name="faceLogin"]').style.backgroundColor="rgb(38,42,63)";
    let loginFaceInfo = this.state.loginFaceInfo;
    console.log(loginFaceInfo);
    let loginTrue = this.props.loginTrue;
    // 主要是邮箱验证
    let emailReg = /^([a-z0 -9_\. -]+)@([\da -z\. -]+)\.([a -z\.]{2,6})$/;
    let formVerify = emailReg.test(loginFaceInfo.email);
    let that = this;
    if(loginFaceInfo.face&&loginFaceInfo.email&&formVerify){
      fetch(serverUrl+'/user/login',{
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;charset=utf-8',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          act: 'faceLogin',
          userInfo: loginFaceInfo
        }),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.status==="success"){
          that.setState({
            loginInfo: {
              status: 'ok',
              msg: res.msg
            }
          })
          // 保存信息
          const loginInfoStorage = window.localStorage;
          loginInfoStorage.email = that.state.loginFaceInfo.email;
          loginInfoStorage.userId = res.data.userId;
          loginInfoStorage.userName=res.data.userName;
          // 关闭登录框
          loginTrue();
        }else {
          that.setState({
            loginInfo: {
              status: 'no',
              msg: res.msg
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  componentDidMount() {
    let canvas = document.querySelector('.face canvas'),
      context = canvas.getContext('2d'),
      video = document.querySelector('.face video'),
      // 是否捕获流媒体
      streaming = false,
      // 人脸路径
      faceSrc = '',
      timer = null;
    let that = this;
    console.log('获取人脸');
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      });
    // 自动拍照
    (function () {
      console.log('自动拍照');
      video.style.display = 'block';
      timer = setInterval(() => {
        console.log('拍照啦');
        if (streaming) {
          // 将视频画面捕获到canvas里
          context.drawImage(video, -45, 0, 390, 150);
          faceSrc = canvas.toDataURL('image/png').split(',')[1];
          /***************************************************************/ 
          // 将人脸发到后台检测
          fetch(serverUrl+'/user/detect',{
            method: 'post',
            mode: 'cors',
            headers: {
              'Accept': 'application/json;charset=utf-8',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              act: 'detect',
              face: faceSrc
            })
          })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if(res.status==="success"){
              clearInterval(timer);
              canvas.style.display = 'block';
              video.style.display = 'none';
            }
            // 改变状态
            document.querySelector('.face-info').innerHTML = res.msg;
            that.setState( prevState => {
              loginFaceInfo: Object.assign(prevState.loginFaceInfo,{face: faceSrc})
            })
          })
          .catch(err => {
            console.log(err);
            clearInterval(timer);
          })
          /***************************************************************/ 
        }
      }, 2000);
    })();
    video.addEventListener('canplay', function (e) {
      if (!streaming) {
        streaming = true;
      }
    });
    // 填写email
    if(window.localStorage.email){
      let email = window.localStorage.email;
      document.querySelector('.face-login input[name="email"]').value=email;
      this.setState({
        loginFaceInfo: Object.assign(this.state.loginFaceInfo,{email: email})
      })
    }
  }
  render() {
    return (
      <div className="face-login">
        <p style={{"line-height": "10px","margin":"10px","color": this.state.loginInfo.status==='ok'?"rgb(152,203,43)":"#f00"}}>{this.state.loginInfo.msg}</p>
        <form method="post" onSubmit={(e) => e.preventDefault()}>
          <Face/>
          <p>
            <i className="iconfont icon-youjian"></i>
            <input 
              type="text" 
              name="email" 
              placeholder="email" 
              onChange={this.handleFaceLoginInputChange}
              pattern="(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)"
              required />
          </p>
          <p>
            <input type="submit" name="faceLogin" value="登录" onClick={this.handleFaceLoginSubmit}/>
          </p>
        </form>
      </div>
    )
  }
}
class LoginMethod extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    switch (this.props.loginMethodToggle) {
      case 'pass':
        console.log('pass');
        return (
          <PassLogin loginTrue={this.props.loginTrue}/>
        );
        break;
      case 'face':
        console.log('face');
        return (
          <FaceLogin loginTrue={this.props.loginTrue}/>
        );
        break;
    }
  }
}
export default Login;
import React, { Component } from 'react';
import '../../css/commonCss/regist.css';
import Face from './face.js';
import serverUrl from '../../js/modules/serverUrl.js';

class Regist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registMethodToggle: 'pass',
      registOpenToggle: true,
    };
    this.handlePassRegist = this.handlePassRegist.bind(this);
    this.handleFaceRegist = this.handleFaceRegist.bind(this);
    this.handleRegistClose = this.handleRegistClose.bind(this);
  }
  handlePassRegist() {
    this.setState({
      registMethodToggle: 'pass'
    });
  }
  handleFaceRegist() {
    this.setState({
      registMethodToggle: 'face'
    });
  }
  handleRegistClose() {
    this.setState({
      registOpenToggle: false
    });
    this.props.registTrue();
  }
  render() {
    let handleRegistClose = this.props.handleRegistClose;
    let handleGotoLogin = this.props.handleGotoLogin;
    if (this.state.registOpenToggle) {
      return (
        <div class="regist-bg">
          <div id="regist">
            <h3>注册</h3>
            <RegistMethod
              registMethodToggle={this.state.registMethodToggle}
              registTrue={this.props.registTrue}
            />
            <div className="check check-regist">
              <p className="check-method">切换注册方式</p>
              <p className="regist-method">
                <span onClick={this.handlePassRegist}>账号密码注册</span>
                <span onClick={this.handleFaceRegist}>账号人脸注册</span>
              </p>
            </div>
            <p class="goto-login" onClick={handleGotoLogin}>前往登录</p>
            <i onClick={handleRegistClose} className="iconfont icon-Icon_close_black close-btn"></i>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
class PassRegist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registPassInfo: {},
      registInfo: {
        status: 'no',
        msg: ''
      }
    };
    // 密码注册
    this.passRegistSubmit = this.passRegistSubmit.bind(this);
    this.handlePassRegistInputChange = this.handlePassRegistInputChange.bind(this);
  }
  // 密码注册input
  handlePassRegistInputChange(e) {
    let target = e.target;
    let value = target.value;
    const name = target.name;
    this.setState(prevState => {
      registPassInfo: Object.assign(prevState.registPassInfo, { [name]: value })
    })
  }
  // 密码注册submit
  passRegistSubmit() {
    console.log('密码注册啦');
    document.querySelector('input[name="passRegist"]').style.backgroundColor="rgb(38,42,63)";
    let registPassInfo = this.state.registPassInfo;
    console.log(registPassInfo);
    let registTrue = this.props.registTrue;
    // 主要是邮箱验证
    let emailReg = /^([a-z0 -9_\. -]+)@([\da -z\. -]+)\.([a -z\.]{2,6})$/;
    let formVerify = emailReg.test(registPassInfo.email);
    let comfirmPass = (registPassInfo.pass===registPassInfo.passSure);
    let that = this;
    if (registPassInfo.userName && registPassInfo.email && registPassInfo.pass && registPassInfo.passSure && formVerify&&comfirmPass) {
      fetch(serverUrl+'/user/regist', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;charset=utf-8',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          act: 'passRegist',
          userInfo: registPassInfo
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(res.status==="success"){
            that.setState({
              registInfo: {
                status: 'ok',
                msg: res.msg
              }
            })
            registTrue();
            // 保存信息registPassInfo
            const registInfoStorage = window.localStorage;
            registInfoStorage.email = registPassInfo.email;
            loginInfoStorage.userId = res.data.userId;
            loginInfoStorage.userName=registPassInfo.userName;
          }else {
            that.setState({
              registInfo: {
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
    if(!comfirmPass){
      console.log('密码不对应');
      this.setState({
        registInfo: {
          status: 'no',
          msg: '密码不对应'
        }
      })
    }
  }
  render() {
    return (
      <div className="pass-regist">
        <p style={{"line-height": "10px","color": this.state.registInfo.status==='ok'?"rgb(152,203,43)":"#f00","margin":0}}>{this.state.registInfo.msg}</p>
        <form method="post" onSubmit={(e) => e.preventDefault()}>
          <p>
            <i className="iconfont icon-wode_"></i>
            <input
              type="text"
              name="userName"
              placeholder="用户名"
              onChange={this.handlePassRegistInputChange}
              required />
          </p>
          <p>
            <i className="iconfont icon-youjian"></i>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handlePassRegistInputChange}
              pattern="(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)"
              required />
          </p>
          <p>
            <i className="iconfont icon-Icon_view"></i>
            <input
              type="password"
              name="pass"
              placeholder="密码"
              onChange={this.handlePassRegistInputChange}
              required />
          </p>
          <p>
            <i className="iconfont icon-Icon_view"></i>
            <input
              type="password"
              name="passSure"
              placeholder="确认密码"
              onChange={this.handlePassRegistInputChange}
              required />
          </p>
          <p>
            <input type="submit" name="passRegist" value="注册" onClick={this.passRegistSubmit} />
          </p>
        </form>
      </div>
    );
  }
}
class FaceRegist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registFaceInfo: {},
      registInfo: {
        status: '',
        msg: ''
      }
    }
    // 人脸注册
    this.faceRegistSubmit = this.faceRegistSubmit.bind(this);
    this.handleFaceRegistInputChange = this.handleFaceRegistInputChange.bind(this);
  }
  // 人脸注册
  faceRegistSubmit() {
    console.log('人脸注册啦');
    document.querySelector('input[name="faceRegist"]').style.backgroundColor="rgb(38,42,63)";
    let registFaceInfo = this.state.registFaceInfo;
    console.log(registFaceInfo);
    let registTrue = this.props.registTrue;
    // 主要是邮箱验证
    let emailReg = /^([a-z0 -9_\. -]+)@([\da -z\. -]+)\.([a -z\.]{2,6})$/;
    let formVerify = emailReg.test(registFaceInfo.email);
    let that = this;
    if (registFaceInfo.face && registFaceInfo.userName && registFaceInfo.email && formVerify) {
      fetch(serverUrl+'/user/regist', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;charset=utf-8',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          act: 'faceRegist',
          userInfo: registFaceInfo
        }),
        credentials: 'include'
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(res.status==="success"){
            that.setState({
              registInfo: {
                status: 'ok',
                msg: res.msg
              }
            })
            // 保存信息
            const registInfoStorage = window.localStorage;
            registInfoStorage.email = registFaceInfo.email;
            loginInfoStorage.userId = res.data.userId;
            loginInfoStorage.userName=registFaceInfo.userName;
            // 关闭注册框
            registTrue();
          }else {
            that.setState({
              registInfo: {
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
  // 人脸注册input
  handleFaceRegistInputChange(e) {
    let target = e.target;
    let value = target.value;
    const name = target.name;
    this.setState(prevState => {
      registFaceInfo: Object.assign(prevState.registFaceInfo, { [name]: value })
    })
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
          fetch(serverUrl+'/user/detect', {
            method: 'post',
            mode: 'cors',
            headers: {
              'Accept': 'application/json;charset=utf-8',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              act: 'detect',
              face: faceSrc
            }),
            credentials: 'include'
          })
            .then(res => res.json())
            .then(res => {
              console.log(res);
              if (res.status === "success") {
                clearInterval(timer);
                canvas.style.display = 'block';
                video.style.display = 'none';
              }
              // 改变状态
              document.querySelector('.face-info').innerHTML = res.msg;
              that.setState(prevState => {
                registFaceInfo: Object.assign(prevState.registFaceInfo, { face: faceSrc })
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

  }
  render() {
    return (
      <div className="face-regist">
        <p style={{"line-height": "10px","margin":"10px","color": this.state.registInfo.status==='ok'?"rgb(152,203,43)":"#f00"}}>{this.state.registInfo.msg}</p>
        <form method="post" onSubmit={(e) => e.preventDefault()}>
          <Face />
          <p>
            <i className="iconfont icon-wode_"></i>
            <input
              type="text"
              name="userName"
              placeholder="用户名"
              onChange={this.handleFaceRegistInputChange}
              required />
          </p>
          <p>
            <i className="iconfont icon-youjian"></i>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleFaceRegistInputChange}
              pattern="(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)"
              required />
          </p>
          <p>
            <input type="submit" name="faceRegist" value="注册" onClick={this.faceRegistSubmit} />
          </p>
        </form>
      </div>
    );
  }
}
class RegistMethod extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    switch (this.props.registMethodToggle) {
      case 'pass':
        return (
          <PassRegist registTrue={this.props.registTrue}/>
        );
        break;
      case 'face':
        return (
          <FaceRegist registTrue={this.props.registTrue}/>
        );
        break;
    }
  }
}
export default Regist;
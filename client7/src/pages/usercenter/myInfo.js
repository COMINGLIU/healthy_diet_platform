import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/commonCss/iconfont.css';
import '../css/usercenter/myInfo.css';
import UserCenter from '../js/components/usercenter.js';
import Face from '../js/components/face.js';
import serverUrl from '../js/modules/serverUrl.js';

class MyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRight: {
        toggle: false,
        name: ''
      },
      editToggle: false,
      faceImg: require('../images/user.png'),
      userInfoData: {
        // userId: '',
        // userName: '',
        // email: '',
        // passLoginOpen: false,
        // faceLoginOpen: false
      }
    };
    this.handleOpenRight = this.handleOpenRight.bind(this);
    this.openFaceRightOk = this.openFaceRightOk.bind(this);
    this.openPassRightOk = this.openPassRightOk.bind(this);
    // 取消开启权限
    this.handleResetOpenRight = this.handleResetOpenRight.bind(this);
  }
  componentDidMount(){
    let that = this;
    if(window.localStorage.email){
      fetch(serverUrl+'/usercenter/getMyInfo',{
        method: 'get',
        mode: 'cors',
        credentials: 'include',
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        switch(res.status){
          case 'success':
            // 渲染数据
            console.log('用户信息获取成功');
            that.setState({
              userInfoData: res.data
            })
            break;
          case 'fail':
            alert(res.msg);
            break;
          case 'overdue':
            if(confirm(res.msg)){
              window.localStorage.email="";
              window.location.reload();
            }
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  handleOpenRight(e) {
    let target = e.target || e.srcElement;
    let that = this;
    switch (target.className) {
      case 'handleOpenPassToggle':
        this.setState({
          openRight: {
            toggle: true,
            name: 'pass'
          }
        });
        break;
      case 'handleOpenFaceToggle':
        this.setState({
          openRight: {
            toggle: true,
            name: 'face'
          }
        });
        break;
      case 'iconfont icon-Icon_edit':
        this.setState({
          editToggle: true,
          openRight: {
            toggle: false,
          }
        });
        break;
      case 'edit-submit':
        console.log('更改用户信息');
        let editUserName = this.editUserName.value;
        let editEmail = this.editEmail.value;
        let emailReg = /^([a-z0 -9_\. -]+)@([\da -z\. -]+)\.([a -z\.]{2,6})$/;
        let formVerify = emailReg.test(editEmail);
        if(editUserName&&editEmail&&formVerify){
          fetch(serverUrl+'/user/editUserInfo',{
            method: 'post',
            mode: 'cors',
            headers: {
              'Accept': 'application/json;charset=utf-8',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              act: 'editUserInfo',
              userInfo: {
                userName: editUserName,
                email: editEmail
              }
            }),
            credentials: 'include'
          })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            switch(res.status){
              case 'success':
                that.setState({
                  editToggle: false,
                  userInfoData: Object.assign(this.state.userInfoData,{userName:editUserName,email:editEmail })
                })
                break;
              case 'fail':
                alert(res.msg);
                break;
              case 'overdue':
                if(confirm(res.msg)){
                  window.localStorage.email="";
                  window.location.reload();
                }
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
        }
        break;
      case 'edit-reset':
        this.setState({
          editToggle: false
        });
        break;
    }
  }
  openFaceRightOk(){
    this.setState({
      openRight: {
        toggle: false,
        name: ''
      },
      userInfoData: Object.assign(this.state.userInfoData,{faceLoginOpen:true})
    })
  }
  openPassRightOk(){
    this.setState({
      openRight: {
        toggle: false,
        name: ''
      },
      userInfoData: Object.assign(this.state.userInfoData,{passLoginOpen:true})
    })
  }
  // 取消开启权限
  handleResetOpenRight(){
    this.setState({
      openRight: {
        toggle: false,
        name: ''
      }
    })
  }
  render() {
    return (
      <UserCenter>
        <h3>个人资料</h3>
        <div id="userInfo">
          <div className="head-img">
            <img src={this.state.faceImg} alt="img" />
          </div>
          <div className="info">
            <div className="info-list" onClick={this.handleOpenRight}>
              {
                this.state.editToggle ?
                  <React.Fragment>
                    <form method="post" onSubmit={e => e.preventDefault()}>
                      <ul>
                        <li>
                          <span>用户名</span>:
                          <input 
                            type="text" 
                            name="userName" 
                            defaultValue={this.state.userInfoData.userName} 
                            ref={input => this.editUserName=input}
                            required
                            />
                        </li>
                        <li>
                          <span>邮箱</span>:
                          <input 
                            type="text" 
                            name="email" 
                            defaultValue={this.state.userInfoData.email} 
                            pattern="(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)"
                            ref={input => this.editEmail=input}
                            required
                          />
                        </li>
                      </ul>
                      <div className="edit-end">
                        <input type="submit" value="提交" className="edit-submit" />
                        <input type="reset" value="取消" className="edit-reset" />
                      </div>
                    </form>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <ul>
                      <li>
                      <span>用户名</span>:
                      <span>{this.state.userInfoData.userName}</span>
                      </li>
                      <li>
                      <span>邮箱</span>:
                      <span>{this.state.userInfoData.email}</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <span>密码登录</span>:
                        <span>{this.state.userInfoData.passLoginOpen ? "已开启" : "未开启"}</span>
                        {this.state.userInfoData.passLoginOpen ? null : <i className="handleOpenPassToggle">开启密码登录</i>}
                      </li>
                      <li>
                        <span>人脸登录</span>:
                        <span>{this.state.userInfoData.faceLoginOpen ? "已开启" : "未开启"}</span>
                        {this.state.userInfoData.faceLoginOpen ? null : <i className="handleOpenFaceToggle">开启人脸登录</i>}
                      </li>
                    </ul>
                    <i className="iconfont icon-Icon_edit"></i>
                  </React.Fragment>
              }
            </div>
            {
              this.state.openRight.toggle ?
                <OpenRight 
                  openRightName={this.state.openRight.name} 
                  openFaceRightOk={this.openFaceRightOk}
                  openPassRightOk={this.openPassRightOk}
                  handleResetOpenRight={this.handleResetOpenRight}
                />
                : null
            }
          </div>
        </div>
      </UserCenter>
    );
  }
}
class EditInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}
class OpenRight extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="open-right">
        {/* <h4>开通权限区域</h4> */}
        {
          this.props.openRightName === "pass" ?
            <OpenPassLogin 
              handleResetOpenRight={this.props.handleResetOpenRight}
              openPassRightOk={this.props.openPassRightOk}
            /> : 
            <OpenFaceLogin 
              openFaceRightOk={this.props.openFaceRightOk}
              handleResetOpenRight={this.props.handleResetOpenRight}
            />
        }
      </div>
    );
  }
}
class OpenPassLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      face: '',
      testPassToggle: false,
      openInfo: '',
      checkInfo: '验证'
    }
    this.handleGetFace = this.handleGetFace.bind(this);
    this.handleFaceCheckSub = this.handleFaceCheckSub.bind(this);
    this.handleOpenPassSubmit = this.handleOpenPassSubmit.bind(this);
  }
  handleGetFace(){
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
              that.setState({
                face: faceSrc
              })
            }
            // 改变状态
            document.querySelector('.face-info').innerHTML = res.msg;
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
  handleFaceCheckSub(){
    let that = this;
    document.querySelector('input[name="faceLoginSub"]').style.backgroundColor="rgb(38,42,63)";
    this.setState({
      checkInfo: '验证中'
    })
    fetch(serverUrl+'/user/checkFaceLogin',{
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json;charset=utf-8',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        act: 'checkFaceLogin',
        face: this.state.face
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          that.setState({
            testPassToggle: true,
            checkInfo: '验证成功'
          })
          break;
        case 'fail':
          alert(res.msg);
          break;
        case 'ovedue':
          if(confirm(res.msg)){
            window.localStorage.email="";
            window.location.reload();
          }
          break;
      }
    })
    .catch(err =>{
      console.log(err);
    })
  }
  handleOpenPassSubmit(){
    let pass = this.pass.value;
    let passSure = this.passSure.value;
    let checkToggle = (pass===passSure);
    let that = this;
    console.log(pass);
    console.log(passSure);
    console.log(checkToggle);
    document.querySelector('input[name="openPassSubmit"]').style.backgroundColor="rgb(38,42,63)";
    if(pass&&passSure&&checkToggle){
      fetch(serverUrl+'/user/addPassLoginRight',{
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;charset=utf-8',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          act: 'addPassLoginRight',
          pass: pass
        }),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        switch(res.status){
          case 'success':
            that.setState({
              openInfo: res.msg
            })
            let temp_timer = setTimeout(() =>{
              that.props.openPassRightOk();
              clearTimeout(temp_timer);
            },1000)
            break;
          case 'fail':
            that.setState({
              openInfo: res.msg
            })
            break;
          case 'overdue':
            if(confirm(res.msg)){
              window.localStorage.email='';
              window.location.reload();
            }
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }else if(!checkToggle){
      this.setState({
        openInfo: '密码不对应'
      })
    }
  }
  render() {
    return (
      <div id="openPassLogin">
        {
          this.state.testPassToggle ?
            <div id="openPassLoginRight">
              <form method="post" onSubmit={e => e.preventDefault()}>
                <p>
                  <i className="iconfont icon-Icon_view"></i>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="密码"  
                    required autofocus
                    ref={input => this.pass=input}
                  />
                </p>
                <p>
                  <i className="iconfont icon-Icon_view"></i>
                  <input 
                    type="password" 
                    name="passwordSure" 
                    placeholder="确认密码" 
                    required 
                    ref={input => this.passSure=input}
                  />
                </p>
                <p><input type="submit" name="openPassSubmit" value="提交" 
                      onClick={this.handleOpenPassSubmit}
                  />
                </p>
                <p className="login-info">{this.state.openInfo}</p>
              </form>
            </div>
            :
            <div className="test-login">
              <h5>开通前先登录验证</h5>
                <Face />
              {/* <p class="face-info">获取人脸失败</p> */}
              <p><button style={{backgroundColor:'#ccc',color:'#fff',borderRadius:'10px',padding:'4px',fontSize:'10px',cursor:"pointer"}} 
                  onClick={this.handleGetFace}
                >点击获取人脸</button></p>
              <p><input type="submit" name="faceLoginSub" value={this.state.checkInfo} onClick={this.handleFaceCheckSub}/></p>
              <p><input type="reset" name="faceLoginReset" value="取消" onClick={this.props.handleResetOpenRight}/></p>
            </div>
        }
      </div>
    );
  }
}
class OpenFaceLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testFaceToggle: false,
      openFaceState: {
        status: false,
        txt: '点击获取人脸'
      },
      openInfo: ''
    };
    this.handlePassCheckSubmit = this.handlePassCheckSubmit.bind(this);
    this.handleGetFace = this.handleGetFace.bind(this);
  }
  handlePassCheckSubmit(){
    console.log('密码验证啦');
    document.querySelector('input[name="passLoginSub"]').style.backgroundColor="rgb(38,42,63)";
    let pass = this.pass.value;
    console.log(pass);
    // 主要是邮箱验证
    let that = this;
    if(pass){
      console.log('可以发送');
      fetch(serverUrl+'/user/checkPassLogin',{
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;charset=utf-8',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          act: 'checkPassLogin',
          userInfo: {
            pass: pass
          }
        }),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          openInfo: res.msg
        })
        switch(res.status){
          case 'success':
            console.log('验证成功');
            that.setState({
              testFaceToggle: true,
              openInfo: res.msg
            })
            break;
          case 'fail':
            console.log('验证失败');
            that.setState({
              openInfo: res.msg
            })
            alert(res.msg);
            break;
          case 'overdue':
            if(confirm(res.msg)){
              window.localStorage.email='';
              window.location.reload();
            }
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  handleGetFace(){
    document.querySelector('input[name="openFaceLoginSubInput"]').style.backgroundColor="rgb(38,42,63)";
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
            // that.setState( prevState => {
            //   loginFaceInfo: Object.assign(prevState.loginFaceInfo,{face: faceSrc})
            // })
            that.setState({
              openFaceState: {
                status: true,
                txt: '正在开启'
              }
            });
            fetch(serverUrl+'/user/addFaceLoginRight',{
              method: 'post',
              mode: 'cors',
              headers: {
                'Accept': 'application/json;charset=utf-8',
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                act: 'addFaceLoginRight',
                face: faceSrc
              }),
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res);
              switch(res.status){
                case 'success':
                  that.setState({
                    openFaceState: {
                      status: true,
                      txt: '开启成功'
                    }
                  })
                  // 将
                  let temp_timer = setTimeout(() =>{
                    that.setState({
                      testFaceToggle: false
                    })
                    that.props.openFaceRightOk();
                    clearTimeout(temp_timer);
                  },1000)
                  break;
                case 'fail':
                  alert(res.msg);
                  break;
                case 'overdue':
                  if(confirm(res.msg)){
                    window.localStorage.email='';
                    window.location.reload();
                  }
                  break;
              }
            })
            .catch(err => {
              console.log(err);
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
      <div id="openFaceLogin">
        {
          this.state.testFaceToggle ?
            <div id="openFaceLoginRight">
              <Face/>
              <p><input 
                  type="submit" 
                  name="openFaceLoginSubInput"
                  value={this.state.openFaceState.txt} 
                  onClick={this.handleGetFace}
                  disabled={this.state.openFaceState.status?"disabled":""}
                  />
              </p>
              {/* <p class="face-info">获取人脸失败</p> */}
            </div>
            :
            <div class="test-login">
              <h5>开通前先登录验证</h5>
              <form method="post" onSubmit={(e) => e.preventDefault()}>
                <p>
                  <i className="iconfont icon-Icon_view"></i>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="密码" 
                    ref={input => this.pass = input}
                    required 
                  />
                </p>
                <p><input type="submit" name="passLoginSub" value="验证" onClick={this.handlePassCheckSubmit}/></p>
                <p><input type="reset" name="passLoginReset" value="取消" onClick={this.props.handleResetOpenRight}/></p>
                <p className="login-info">{this.state.openInfo}</p>
              </form>
            </div>
        }
      </div>
    );
  }
}
ReactDOM.render(
  <MyInfo />,
  document.getElementById('root')
);

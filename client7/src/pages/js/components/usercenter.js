import React, { Component } from 'react';
import '../../css/commonCss/usercenter.css';
import Header from './header.js';
import Regist from './regist.js'
import Login from './login.js';

class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      subMenu: [
        {
          title: '个人资料',
          url: '/usercenter/myInfo.html'
        },
        {
          title: '我的收藏',
          url: '/usercenter/myCollection.html'
        },
        {
          title: '我的评论',
          url: '/usercenter/myRemark.html'
        },
        {
          title: '我的消息',
          url: '/usercenter/myNews.html'
        },
        {
          title: '我的动态',
          url: '/usercenter/myPost.html'
        }
      ]
    };
    this.handleGotoRegist = this.handleGotoRegist.bind(this);
    this.handleGotoLogin = this.handleGotoLogin.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleRegistClose = this.handleRegistClose.bind(this);
    this.handleHeader = this.handleHeader.bind(this);
    // 注册成功
    this.registTrue = this.registTrue.bind(this);
    // 登录成功
    this.loginTrue = this.loginTrue.bind(this);
    // 退出登录
    this.exitLogin = this.exitLogin.bind(this);
  }
  handleHeader(e){
    let target = e.target||e.srcElement;
    console.log(target);
    switch(target.id){
      case 'loginBtn':
        this.setState({
          loginOpenToggle:true
        })
        break;
      case 'registBtn':
        this.setState({
          registOpenToggle:true
        })
        break;
    }
  }
  handleGotoRegist() {
    this.setState({
      registOpenToggle: true,
      loginOpenToggle: false
    })
  }
  handleGotoLogin() {
    this.setState({
      registOpenToggle: false,
      loginOpenToggle: true
    })
  }
  handleLoginClose() {
    this.setState({
      loginOpenToggle: false
    })
  }
  handleRegistClose() {
    this.setState({
      registOpenToggle: false
    })
  }
  registTrue(){
    let that = this;
    let closeTimer = setTimeout(() => {
      that.setState({
        registOpenToggle:false,
        login: true
      })
      clearTimeout(closeTimer);
    },1000)
  }
  loginTrue(){
    let that = this;
    let closeTimer = setTimeout(() => {
      that.setState({
        loginOpenToggle:false,
        login: true
      })
      clearTimeout(closeTimer);
    },1000)
  }
  exitLogin(){
    this.setState({
      login: false
    })
  }
  componentDidMount(){
    if(!window.localStorage.email){
      console.log('未登录');
      this.setState({
        loginOpenToggle: true,
      })
    }else {
      this.setState({
        login: true
      })
      console.log('已登录，可以编辑');
    }
  }
  render() {
    let subMenuListItem = this.state.subMenu.map(item =>
      <li key={item.url}>
        <a href={item.url}>{item.title}</a>
      </li>
    );
    return (
      <div id="userCenter">
        <Header className="header-add-bg" handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <div id="content">
          <div className="sub-menu">
            <ul>{subMenuListItem}</ul>
          </div>
          <div className="user-detail">
            {this.props.children}
          </div>
        </div>
        {this.state.loginOpenToggle ? <Login handleLoginClose={this.handleLoginClose} handleGotoRegist={this.handleGotoRegist} loginTrue={this.loginTrue}/> : null}
        {this.state.registOpenToggle ? <Regist handleRegistClose={this.handleRegistClose} handleGotoLogin={this.handleGotoLogin} registTrue={this.registTrue}/> : null}
      </div>
    );
  }
}
export default UserCenter;
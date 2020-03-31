import React, { Component } from 'react';
import '../../css/share.css';
import Header from './header.js';
import Adsence from './adsence.js';
import Regist from './regist.js'
import Login from './login.js';

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      subMenu: [
        {
          name: '推荐',
          url: '/share/recommend.html'
        },
        {
          name: '文章',
          url: '/share/article.html'
        },
        {
          name: '视频',
          url: '/share/video.html'
        },
        {
          name: '音频',
          url: '/share/audio.html'
        }
      ],
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
    // 
    this.getChildren = this.getChildren.bind(this);
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
  handleGotoRegist(){
    this.setState({
      registOpenToggle:true,
      loginOpenToggle:false
    })
  }
  handleGotoLogin(){
    this.setState({
      registOpenToggle:false,
      loginOpenToggle:true
    })
  }
  handleLoginClose(){
    this.setState({
      loginOpenToggle:false
    })
  }
  handleRegistClose(){
    this.setState({
      registOpenToggle:false
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
  getChildren(){
    const that = this;
    let {children} = that.props;
    return React.Children.map(children,child => {
      return React.cloneElement(child,{
        handleGotoLogin: that.handleGotoLogin
      });
    });
  }
  componentDidMount(){
    if(!window.localStorage.email){
      if(window.location.pathname==="/share/edit.html"){
        this.setState({
          loginOpenToggle: true,
        })
      }
    }else {
      this.setState({
        login: true
      })
    }
  }
  render() {
    let subMenuListItem = this.state.subMenu.map((item, index) =>
      <li key={index}>
        <a href={item.url}>{item.name}</a>
      </li>
    );
    let handleGotoLogin = this.handleGotoLogin;
    return (
      <div id="share">
        <Header handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <article>
          <ul className="sub-menu">{subMenuListItem}</ul>
          <div id="content" handleGotoLogin={this.handleGotoLogin}>
            {this.getChildren()}
          </div>
          <div id="right">
            <Adsence />
          </div>
          {this.state.loginOpenToggle ? <Login handleLoginClose={this.handleLoginClose} handleGotoRegist={this.handleGotoRegist} loginTrue={this.loginTrue}/> : null}
          {this.state.registOpenToggle ? <Regist handleRegistClose={this.handleRegistClose} handleGotoLogin={this.handleGotoLogin} registTrue={this.registTrue}/> : null}
        </article>
      </div>
    );
  }
}
export default Share;

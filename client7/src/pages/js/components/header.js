import React, { Component } from 'react';
import '../../css/commonCss/header.css';
import serverUrl from '../../js/modules/serverUrl.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerBgToggle: false,
      userMenuOpenToggle: false,
      searchValue: ''
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    // 用户中心菜单
    this.handleUserMenu = this.handleUserMenu.bind(this);
    this.handleHeadSearch = this.handleHeadSearch.bind(this);
    // 
    this.handleSearchValue = this.handleSearchValue.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll(e) {
    let scroll = document.documentElement.scrollTop || window.scrollY || window.pageYOffset;
    if (scroll > 100) {
      this.setState({
        headerBgToggle: true
      });
      document.getElementsByClassName("header-search")[0].style.cssText = "box-sizing: border-box; border: 1px solid #ccc;border-radius: 4px;";
      // document.querySelector('header>ul').style.color = '#666';
    } else {
      this.setState({
        headerBgToggle: false
      });
      document.getElementsByClassName("header-search")[0].style.cssText = " border: 0;border-radius: none;";
      // document.querySelector('header>ul').style.color = '#fff';
    }
  }
  handleOpenUserMenu(e){
    e.stopPropagation();
    this.setState((prevState) => ({
      userMenuOpenToggle: !prevState.userMenuOpenToggle
    }));
  }
  handleUserMenu(e){
    let target = e.target;
    let that = this;
    switch(target.className){
      case 'exit':
        // 发送请求清除服务端session
        fetch(serverUrl+'/user/exit',{
          method: 'get',
          mode: 'cors'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          // 清除本地localstorage并设置本地login为false
          if(res.status==="success"){
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('userName');
            that.props.exitLogin();
          }else {
            alert('网络繁忙，请稍候重试');
          }
        })
        .catch(err => {
          console.log(err);
        })
        break;
    }
  }
  handleHeadSearch(){
    if(this.headSearchValue){
      window
    }
  }
  handleSearchValue(e){
    this.setState({
      searchValue: e.target.value
    })
  }
  render() {
    let classname = this.state.headerBgToggle ? "header-add-bg" : "";
    let login = this.props.login;
    return (
      <header className={classname} onClick={this.props.handleHeader}>
        <a href="/index.html"><h2 id="logo">healthy <span style={{ color: "rgb(152,203,43)" }}>diet</span></h2></a>
        <ul>
          <li className="header-search">
            <input type="text" name="search" placeholder="搜索为您搭配" onChange={this.handleSearchValue} value={this.state.searchValue}/>
            <a href={this.state.searchValue?'./minihome.html?vegName='+this.state.searchValue:'./minihome.html'} target="_blank">
              <i className="iconfont icon-Icon_search"></i>
            </a>
          </li>
          <li className="ease-home-page"><a href="/minihome.html">轻简版首页</a></li>
        </ul>
        <ul className="nav-ul">
          <li><i className="iconfont icon-home"></i><a href="/index.html">首页</a></li>
          <li><i className="iconfont icon-Icon_edit"></i><a href="/share/edit.html" target="_blank">写动态</a></li>
          <li><i className="iconfont icon-dongtai"></i><a href="/share/recommend.html" target="_blank">分享广场</a></li>
          <li className="xiaochengxu">小程序
            <div className="xiaochengxu-img">
              <img src={require("../../images/xiaochengxu.jpg")}/>
            </div>
          </li>
          {
            login?
            <li className="user" onClick={this.handleOpenUserMenu}>
              <a href="/usercenter/myInfo.html" target="_blank"><img src={require('../../images/user.png')} /></a>
              <i className="iconfont icon-Icon_dropdown_blue"></i>
              {
                this.state.userMenuOpenToggle?
                <ul className="user-menu" onClick={this.handleUserMenu}>
                  <li className="user-center"><a href="/usercenter/myInfo.html" target="_blank">个人中心</a></li>
                  <li className="my-store"><a href="/usercenter/myCollection.html" target="_blank">我的收藏</a></li>
                  <li className="my-remark"><a href="/usercenter/myRemark.html" target="_blank">我的评论</a></li>
                  <li className="notice"><a href="/usercenter/myNews.html" target="_black">我的消息</a></li>
                  <li className="my-remark"><a href="/usercenter/myPost.html" target="_blank">我的动态</a></li>
                  <li className="exit">退出</li>
                </ul>
                :
                null
              }
            </li>
            :
            <React.Fragment>
              <li id="loginBtn">登录</li>
              <li id="registBtn">注册</li>
            </React.Fragment>
          }
        </ul>
      </header>
    )
  }
}
export default Header;
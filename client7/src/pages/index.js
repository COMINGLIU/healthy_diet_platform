import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/commonCss/reset.css';
import './css/index.css';
import './css/commonCss/iconfont.css';
import Header from './js/components/header.js';
import Banner from './js/components/index/banner.js';
import SideBanner from './js/components/index/side-banner.js';
import Content from './js/components/index/content.js';
import Footer from './js/components/footer.js';
import Regist from './js/components/regist.js'
import Login from './js/components/login.js';
import ServerUrl from './js/modules/serverUrl.js';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      pageId: 0,
      healthyList:[
        {
          colloId: '',
          vegsName: '',
          vegsId: '',
          colloEffect: '',
        }
      ]
    };
    this.handleGotoRegist = this.handleGotoRegist.bind(this);
    this.handleGotoLogin = this.handleGotoLogin.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleRegistClose = this.handleRegistClose.bind(this);
    this.handleHeader = this.handleHeader.bind(this);
    // 点击加载更多
    this.handleClickAddMore = this.handleClickAddMore.bind(this);
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
  handleClickAddMore(){
    let that = this;
    let pageId = this.state.pageId+1;
    console.log(pageId);
    fetch(ServerUrl+'/veg/getRecommendColloVeg?pageId='+pageId,{
      method: 'get',
      mode: 'cors',
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          let newHealthyList = that.state.healthyList;
          newHealthyList = newHealthyList.concat(res.data);
          that.setState({
            healthyList: newHealthyList
          })
          break;
        case 'fail':  
          alert(res.msg);
        break;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  componentDidMount(){
    let that = this;
    // 拉取数据
    fetch(ServerUrl+'/veg/getRecommendColloVeg?pageId='+this.state.pageId,{
      method: 'get',
      mode: 'cors',
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          that.setState({
            healthyList:res.data
          })
          break;
        case 'fail':  
          alert(res.msg);
        break;
      }
    })
    .catch(err => {
      console.log(err);
    })
    if(window.localStorage.email){
      this.setState({
        login: true
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Header handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <Banner />
        <SideBanner />
        <Content 
          healthyList={this.state.healthyList}
          handleClickAddMore={this.handleClickAddMore}
        />
        {this.state.loginOpenToggle?
          <Login 
            handleLoginClose={this.handleLoginClose} 
            handleGotoRegist={this.handleGotoRegist}
            loginTrue={this.loginTrue}
            />
          :null
        }
        {this.state.registOpenToggle?
          <Regist 
            handleRegistClose={this.handleRegistClose} 
            handleGotoLogin={this.handleGotoLogin}
            registTrue={this.registTrue}
          />:null}
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

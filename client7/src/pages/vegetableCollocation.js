import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/commonCss/reset.css';
import './css/commonCss/iconfont.css';
import './css/vegetableCollocation.css';
import Header from './js/components/header.js';
import Regist from './js/components/regist.js';
import Login from './js/components/login.js';
import Remark from './js/components/remark.js';
import ServerUrl from './js/modules/serverUrl.js';

class VegetableCollocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      vegData: {
        vegs:  [
          // {
          //   vegId: 0,
          //   vegName: '西红柿',
          //   vegImg: require('./images/vegs/9-solan/fanqie.jpg')
          // },
          // {
          //   vegId: 1,
          //   vegName: '芹菜',
          //   vegImg: require('./images/vegs/3-tenderLeaves/qincai.jpg')
          // }
        ],
        effect: '',
      },
      vegsIndexName: [
        {
          name: '参数'
        },
        {
          name: '热量(大卡)'
        },
        {
          name: '蛋白质(g)'
        },
        {
          name: '脂肪(g)'
        },
        {
          name: '膳食纤维(mg)'
        },
        {
          name: '维A(μg)'
        },
        {
          name: '维B12(mg)'
        },
        {
          name: '维C(mg)'
        },
        {
          name: '维E(mg)'
        },
        {
          name: '钙(mg)'
        },
        {
          name: '铁(mg)'
        },
        {
          name: '钾(mg)'
        },
        {
          name: '锌(mg)'
        }
      ],
      vegsIndex: [
        // {
        //   vegName: '西红柿',
        //   reliang: '',
        //   danbaizhi: '',
        //   zhifang: '',
        //   shanshixianwei: '',
        //   weiA: '',
        //   weiB12: '',
        //   weiC: '',
        //   weiE: '',
        //   gai: '',
        //   tie: '',
        //   jia: '',
        //   xin: ''
        // },
        // {
        //   vegName: '芹菜',
        //   reliang: '',
        //   danbaizhi: '',
        //   zhifang: '',
        //   shanshixianwei: '',
        //   weiA: '',
        //   weiB12: '',
        //   weiC: '',
        //   weiE: '',
        //   gai: '',
        //   tie: '',
        //   jia: '',
        //   xin: ''
        // }
      ],
      recommend: [
        // {
        //   colloId: '',
        //   vegsName: '',
        //   vegsId: '',
        //   colloEffect: '',
        // }
      ],
      remark: [
      ]
    };
    this.handleHeader = this.handleHeader.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleRegistClose = this.handleRegistClose.bind(this);
    this.handleGotoRegist = this.handleGotoRegist.bind(this);
    this.handleGotoLogin = this.handleGotoLogin.bind(this);
    // 控制
    this.handleRemarkClick = this.handleRemarkClick.bind(this);
    // 注册成功
    this.registTrue = this.registTrue.bind(this);
    // 登录成功
    this.loginTrue = this.loginTrue.bind(this);
    // 退出登录
    this.exitLogin = this.exitLogin.bind(this);
  }
  handleHeader(e) {
    let target = e.target || e.srcElement;
    console.log(target);
    switch (target.id) {
      case 'loginBtn':
        this.setState({
          loginOpenToggle: true
        })
        break;
      case 'registBtn':
        this.setState({
          registOpenToggle: true
        })
        break;
    }
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
  handleRemarkClick(e) {
    let target = e.target || e.srcElement;
    console.log(target);
    switch (target.className) {
      case 'sub-remark-btn':
      case 'sub-remark-num':
        let aimTarget = target.parentNode.parentNode.getElementsByClassName('reply')[0];
        console.log(parseInt(this.getStyle(aimTarget, "height")));
        if (parseInt(this.getStyle(aimTarget, "height")) === 0) {
          target.parentNode.parentNode.getElementsByClassName('reply')[0].style.cssText = "height: auto;padding: 20px";
        } else {
          target.parentNode.parentNode.getElementsByClassName('reply')[0].style.cssText = "height: 0;padding: 0";
        }
        break;
      case 'iconfont icon-shanchu':
        break;
      case 'submit':
        break;
    }
  }
  getStyle(obj,attr){
    return getComputedStyle?getComputedStyle(obj)[attr]:obj.currentStyle[attr];
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
    let searchValue = '';
    let that = this;
    if(window.localStorage.email){
      this.setState({
        login: true
      })
    }
    if(window.location.search){
      searchValue = window.location.search.split('?')[1].split('=')[1];
      console.log(searchValue);
      fetch(ServerUrl+'/veg/getCollocationDetail?colloId='+searchValue,{
        method: 'get',
        mode: 'cors'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        switch(res.status) {
          case 'success':
            let getData = res.data;
            that.setState({
              vegData: {
                vegs: getData.vegInfo,
                effect: getData.colloInfo.colloEffect
              },
              vegsIndex: getData.vegIndex,
              recommend: getData.recommendColloList
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
  }
  render() {
    let vegsList = this.state.vegData.vegs;
    let vegsItem = vegsList.map((item,index) => 
      <React.Fragment>
        {index>0?<i className="iconfont icon-Icon_add"></i>:null}
        <a href={"./minihome.html?vegName="+encodeURI(item.vegName)} target="_blank">
        <figure>
          <img src={item.img} alt="img" />
          <figcaption>
            {item.vegName}
          </figcaption>
        </figure>
        </a>
      </React.Fragment>
    );
    let nutrienTitle = this.state.vegsIndexName.map(item => 
      <li key={item.name}>
        {item.name}
      </li>
    );
    let nutrienData = this.state.vegsIndex.map(item =>{
      return(
        <ul>
          <li>{item.vegName}</li>
          <li>{item.reliang}</li>
          <li>{item.danbaizhi}</li>
          <li>{item.zhifang}</li>
          <li>{item.shanshixianwei}</li>
          <li>{item.weiA}</li>
          <li>{item.weiB12}</li>
          <li>{item.weiC}</li>
          <li>{item.weiE}</li>
          <li>{item.gai}</li>
          <li>{item.tie}</li>
          <li>{item.jia}</li>
          <li>{item.xin}</li>
        </ul>
      )
    });
    return (
      <div id="vegCollocation">
        <Header handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <article>
          <div id="veg-name">{vegsItem}</div>
          {
            this.state.vegData.effect?
            <p id="veg-effect"><span>功效 </span>{this.state.vegData.effect}</p>
            :null
          }
          {
            this.state.vegsIndex.length>0?
            <div id="nutrient-index">
              <h3>{this.state.vegData.veg1}营养指数 (每100g所含量)</h3>
              <ul>{nutrienTitle}</ul>
              {nutrienData}
            </div>
            :null
          }
          {
            this.state.recommend.length>0?
            <div id="veg-collo-recommentd">
              <h3>推荐搭配</h3>
              <RecommentList recommentLists={this.state.recommend} />
            </div>
            :null
          }
          {
            this.state.remark.length>0?
            <Remark
              remarkLists={this.state.remark}
              login={this.state.loginY}
              handleRemarkClick={this.handleRemarkClick}
            />
            :null
          }
          {this.state.loginOpenToggle ? <Login handleLoginClose={this.handleLoginClose} handleGotoRegist={this.handleGotoRegist} loginTrue={this.loginTrue}/> : null}
          {this.state.registOpenToggle ? <Regist handleRegistClose={this.handleRegistClose} handleGotoLogin={this.handleGotoLogin} registTrue={this.registTrue}/> : null}
        </article>
      </div>
    );
  }
}
class NutrientList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let nutrientListItem = this.props.nutrientLists.map(item =>
      <li key={item.name}>
        <h5>{item.name}</h5>
        <p>{item.value}</p>
      </li>
    );
    return (
      <ul>{nutrientListItem}</ul>
    )
  }
}
class RecommentList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let recommentListItem = this.props.recommentLists.map((item,index) => {
      let vegsName = item.vegsName.split('，');
      let vegsList = vegsName.map((vegsItem,vegsIndex) =>{
        return (
          <React.Fragment>
            {vegsIndex>0?
              <i className="iconfont icon-Icon_add"></i>
              :null
            }
            <span><a href={"./minihome.html?vegName="+encodeURI(vegsItem)} target="_blank">{vegsItem}</a></span>
          </React.Fragment>
        )
      }
    );
        return (
          <li key={item.colloId}>
          <h4>
            {vegsList}
          </h4>
          <p><a href={"./vegetableCollocation.html?colloId="+item.colloId} target="_blank">{item.colloEffect}</a></p>
        </li>
        );
      }
    );
    return (
      <ul>{recommentListItem}</ul>
    )
  }
}
ReactDOM.render(
  <VegetableCollocation />,
  document.getElementById('root')
);
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/commonCss/reset.css';
import './css/commonCss/iconfont.css';
import './css/minihome.css';
import Header from './js/components/header.js';
import VegMenu from './js/components/vegMenu.js';
import Regist from './js/components/regist.js';
import Login from './js/components/login.js';
import ServerUrl from './js/modules/serverUrl.js';

class MiniHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vegMenuOpenToggle: false,
      searchResultOpenToggle: false,
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      searchValue:'',
      searchVegNames: [
        // {
        //   vegId: 0,
        //   vegName: '西红柿'
        // },
        // {
        //   vegId: 1,
        //   vegName: '鸡蛋'
        // }
      ],
      hotSearchWords: ["热搜词汇：", "西兰花", "土豆", "牛肉", "豆腐", "西红柿", "鸡蛋", "香菇", "蘑菇", "金针菇", "海带", "莲藕", "山药", "黄瓜", "苦瓜", "南瓜", "胡萝卜", "大白菜"],
      nuitrienceSta: {
        // reliang: '',
        // tanglei: '',
        // danbaizhi: '',
        // zhifang: '',
        // shanshixianwei: '',
        // weiA: '',
        // weiB12: '',
        // weiC: '',
        // weiE: '',
        // gai: '',
        // tie: '',
        // jia: '',
        // xin: ''
      },
      searchNutri: {
        searchVeg: '',
        // 描述
        vegDescribe: '',
        // 功效
        vegEffect: '',
        // 注意事项
        vegCare: '',
         // 搭配
         vegCollocation: [
          // {
          //   colloId: '',
          //   vegsName: '',
          //   vegsId: '',
          //   colloEffect: '',
          // }
        ],
        // 搭配禁忌
        vegAvoid: [
          // {
          //   colloId: '',
          //   vegsName: '',
          //   vegsId: '',
          //   colloEffect: '',
          // }
        ]
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleHeader = this.handleHeader.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleRegistClose = this.handleRegistClose.bind(this);
    this.handleInputSearchValue = this.handleInputSearchValue.bind(this);
    this.handleGotoRegist = this.handleGotoRegist.bind(this);
    this.handleGotoLogin = this.handleGotoLogin.bind(this);
    // 选择menu词汇
    this.handleChooseMenuSearch = this.handleChooseMenuSearch.bind(this);
    // 去搜索veg名
    this.handleSearchSub = this.handleSearchSub.bind(this);
    // 搜索veg详情
    this.getVegDetail = this.getVegDetail.bind(this);
    // 注册成功
    this.registTrue = this.registTrue.bind(this);
    // 登录成功
    this.loginTrue = this.loginTrue.bind(this);
    // 退出登录
    this.exitLogin = this.exitLogin.bind(this);
  }
  // 事件委托
  handleSearch(e) {
    let target = e.target || e.srcElement;
    switch(target.className){
      case 'search-box':
        this.setState({
          vegMenuOpenToggle: false
        })
        break;
      case 'iconfont icon-Icon_search':
        this.handleSearchSub(e);
        break;
      // 选择热搜词
      case 'hot-seach-words-li':
        this.setState({
          searchValue: target.innerHTML
        })
        break;
      case 'search-veg-names-li':
        console.log(target);
        let searchName = target.innerHTML;
        let vegId = target.dataset.vegid;
        console.log('searchName',searchName);
        console.log('vegId',vegId);
        this.setState({
          searchVegNames: [],
          searchValue: searchName
        })
        // 发送请求
        this.getVegDetail('vegId',vegId);
        break;
    }
  }
  handleOpenMenu(e) {
    this.setState({
      vegMenuOpenToggle: true
    })
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
  handleInputSearchValue(e){
    this.setState({
      searchValue: e.target.value,
      vegMenuOpenToggle: false
    });
  }
  // 选择menu的搜索词
  handleChooseMenuSearch(e){
    let target = e.target;
    if(target.parentNode.className==="menu-list"){
      this.setState({
        searchValue: target.innerHTML
      })
    }
  }
  // 根据搜索词搜索vegId和vegName
  handleSearchSub(e){
    let that = this;
    let searchInput = document.querySelector('.search-box input[name="search"]');
    if(e.preventDefault){
      e.preventDefault();
    }
    searchInput.blur();
    this.setState({
      vegMenuOpenToggle: false,
    })
    fetch(ServerUrl+'/veg/searchVegName?vegName='+this.state.searchValue,{
      method: 'get',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          that.setState({
            searchVegNames: res.data
          })
          break;
        case 'fail':
        that.setState({
          searchVegNames: [
            {
              vegId: '',
              vegName: '暂无数据'
            }
          ]
        })
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  // 根据vegId或vegName搜索数据
  getVegDetail(type,typeName){
    let that = this;
    console.log('type:',type);
    console.log('typeName:',typeName);
    fetch(ServerUrl+'/veg/searchVegDetail?'+type+'='+typeName,{
      method: 'get',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          let getData = res.data;
          that.setState({
            searchResultOpenToggle: true,
            nuitrienceSta: getData.nuitrience,
            searchNutri: {
              searchVeg: getData.vegDet.vegName,
              vegDescribe: getData.vegDet.vegDetail,
              vegEffect: getData.vegDet.vegEffect,
              vegCare: getData.vegDet.vegNotice,
              vegCollocation: getData.allocation_good,
              vegAvoid: getData.allocation_bad 
            } 
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
    if(window.localStorage.email){
      this.setState({
        login: true
      })
    }
    const search = window.location.search;
    let searchValue='';
    if(search){
      searchValue = decodeURIComponent(search.split('?')[1].split('=')[1]);
      this.setState({
        searchValue: searchValue
      })
      console.log(searchValue);
      this.getVegDetail('vegName',searchValue);
    }
  }
  render() {
    let hotSearchLists = this.state.hotSearchWords;
    let hotSearchListItem = hotSearchLists.map((item, index) =>
      <li key={index} className="hot-seach-words-li">
        {item}
      </li>
    );
    let searchVegNamesItem = this.state.searchVegNames.map(item =>
      <li className="search-veg-names-li" key={item.vegId} data-vegId={item.vegId}>{item.vegName}</li>
    );
    return (
      <div id="minihome">
        <Header handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <div id="search" onClick={this.handleSearch}>
          <div className="search-box">
            <form method="get" onSubmit={this.handleSearchSub}> 
              <input type="text" name="search" value={this.state.searchValue} onFocus={this.handleOpenMenu} onChange={this.handleInputSearchValue}/>
              <ul className="search-veg-names">{searchVegNamesItem}</ul>
            </form>
            <i className="iconfont icon-Icon_search"></i>
            <ul className="hot-seach-words">
              {hotSearchListItem}
            </ul>
            {
              this.state.vegMenuOpenToggle ?
                <div className="search-choice">
                  <VegMenu handleChooseMenuSearch={this.handleChooseMenuSearch}/>
                </div>
                : null
            }
            {
              this.state.searchResultOpenToggle ?
                <div id="search-result">
                  <VegCollocation
                    searchVeg={this.state.searchNutri.searchVeg}
                    vegCollocation={this.state.searchNutri.vegCollocation}
                    vegAvoid={this.state.searchNutri.vegAvoid}
                  />
                  <VegIntro
                    searchVeg = {this.state.searchNutri.searchVeg}
                    nuitrienceSta={this.state.nuitrienceSta}
                    vegDescribe={this.state.searchNutri.vegDescribe}
                    vegEffect={this.state.searchNutri.vegEffect}
                    vegCare={this.state.searchNutri.vegCare}
                  />
                </div>
                : null
            }
          </div>
        </div>
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
          />
          :null
        }
      </div>
    );
  }
}
class VegIntro extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let searchVeg = this.props.searchVeg;
    let nuitrienceSta = this.props.nuitrienceSta;
    let vegDescribe = this.props.vegDescribe;
    let vegEffect = this.props.vegEffect;
    let vegCare = this.props.vegCare;
    return (
      <div className="right-intro">
        {/* <ul>{powerListItem}</ul> */}
        {
          nuitrienceSta?
          <React.Fragment>
           <h2>{searchVeg}<span style={{color: '#888'}}> (营养指数: 每100g所含量)</span></h2>
            <ul className="nuitrienceSta">
              {
                nuitrienceSta.reliang?
                <li><h5>热量(大卡)</h5><span>{nuitrienceSta.reliang}</span></li>
                :null
              }
              {
                nuitrienceSta.tanglei? 
                <li><h5>糖类(g)</h5><span>{nuitrienceSta.tanglei}</span></li>
                :null
              }
              {
                nuitrienceSta.danbaizhi?
                <li><h5>蛋白质(g)</h5><span>{nuitrienceSta.danbaizhi}</span></li>
                :null
              }
              {
                nuitrienceSta.zhifang?
                <li><h5>脂肪(g)</h5><span>{nuitrienceSta.zhifang}</span></li>
                :null
              }
              {
                nuitrienceSta.shanshixianwei?
                <li><h5>膳食纤维(mg)</h5><span>{nuitrienceSta.shanshixianwei}</span></li>
                :null
              }
              {
                nuitrienceSta.weiA?
                <li><h5>维A(μg)</h5><span>{nuitrienceSta.weiA}</span></li>
                :null
              }
              {
                nuitrienceSta.weiB12?
                <li><h5>维B12(mg)</h5><span>{nuitrienceSta.weiB12}</span></li>
                :null
              }
              {
                nuitrienceSta.weiC?
                <li><h5>维C(mg)</h5><span>{nuitrienceSta.weiC}</span></li>
                :null
              }
              {
                nuitrienceSta.weiE?
                <li><h5>维E(mg)</h5><span>{nuitrienceSta.weiE}</span></li>
                :null
              }
              {
                nuitrienceSta.gai?
                <li><h5>钙(mg)</h5><span>{nuitrienceSta.gai}</span></li>
                :null
              }
              {
                nuitrienceSta.tie?
                <li><h5>铁(mg)</h5><span>{nuitrienceSta.tie}</span></li>
                :null
              }
              {
                nuitrienceSta.jia?
                <li><h5>钾(mg)</h5><span>{nuitrienceSta.jia}</span></li>
                :null
              }
              {
                nuitrienceSta.xin?
                <li><h5>锌(mg)</h5><span>{nuitrienceSta.xin}</span></li>
                :null
              }
            </ul>
          </React.Fragment>
        :null
        }
        {
          vegDescribe?
          <div className="veg-describe">
            <h4>描述</h4>
            <p>{vegDescribe}</p>
          </div>
          :null
        }
        {
          vegEffect?
          <div className="veg-profit">
            <h4>功效</h4>
            <p>{vegEffect}</p>
          </div>
          :null
        }
        {
          vegCare?
          <div className="veg-care">
            <h4>注意事项</h4>
            <p>{vegCare}</p>
          </div>
          :null
        }
      </div>
    )
  }
}
class VegCollocation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let searchVeg = this.props.searchVeg;
    let collocationListItem=null;
    let vegAvoidListItem=null;
    if(this.props.vegCollocation.length>0){
      collocationListItem = this.props.vegCollocation.map((item,index) => {
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
    }
    if(this.props.vegAvoid.length>0){
      vegAvoidListItem = this.props.vegAvoid.map((item,index) => {
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
    }
    return (
      <div className="left-collocation">
      {
        this.props.vegCollocation.length>0?
        <div className="collocation-good">
          <h3>搭配相宜</h3>
          <ul>{collocationListItem}</ul>
        </div>
        :null
      }
      {
        this.props.vegAvoid.length>0?
        <div className="collocation-bad">
          <h3>搭配禁忌</h3>
          <ul>{vegAvoidListItem}</ul>
        </div>
        :null
      }
      </div>
    )
  }
}
ReactDOM.render(
  <MiniHome />,
  document.getElementById('root')
);
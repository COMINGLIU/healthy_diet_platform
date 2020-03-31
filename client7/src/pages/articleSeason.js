import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './css/commonCss/reset.css';
import './css/commonCss/iconfont.css';
import './css/articleSeason.css';
import Header from './js/components/header.js';
import ArticleHeader from './js/components/articleHeader.js';
import Footer from './js/components/footer.js';
import Regist from './js/components/regist.js'
import Login from './js/components/login.js';

class ArticleSeason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      seasonData: [
        {
          title: '春季养生食谱',
          description: '春季饮食要掌握一个原则：根据气温变化，食物由温补、辛甘逐渐转为清淡养阴之品。',
          tips: [
            '早春饮食取温避凉。早春应适当吃些春笋、香椿、菠菜、柳芽、荠菜、葱、姜、蒜、韭菜、芥菜等偏于温补的蔬菜和野菜，不能一味食用人参等温热补品，以免春季气温逐渐上升，加重身体内热，损伤到人体正气；应少食黄瓜、冬瓜、茄子、绿豆等性凉食物。',
            '仲春饮食宜辛甘。适当进食山药、红枣、蜂蜜、芹菜等平补脾胃的食物，同时注意摄取足量的维生素，以提高机体的免疫力，少食酸性食物，以名伤用脾胃。',
            '晚春饮食宜清补.可以适当选择甘蔗汁、荠菜、百合、螺、鸭肉、苦瓜、紫菜、海带、海蜇、绿豆等平补食物，少食辛辣、黏冷、肥腻之物。',
          ]
        },
        {
          title: '夏季养生食谱.',
          description: '夏季是阳气最盛的季节，此时也是人体新陈代谢最旺盛的时候，人体出汗过多而容易丢失津液，因此夏季养生应该以清淡食物为主，避免伤津耗气。',
          tips: [
            '夏季饮食多清淡。夏季署热，人的脾胃消化功能相对较弱，应适当吃些清热解毒的食物，蔬菜类如茼蒿、芹菜、小白菜、香菜、苦瓜、竹笋、黄瓜、冬瓜等；鱼类如青鱼、鲫鱼、鲢鱼等，这些食物能起到清热解署、消除疲劳的作用，对中署和肠道疾病有一定的预防作用。',
            '夏季饮食宜补气。可适当选择一些滋阴补气的食物，如胡萝卜、菠菜、桂圆、荔枝、花生、番茄等。多食，杂粮，蔬果以寒其体，但生冷瓜果当适可而止，不可过食，以免过于寒凉，损伤脾胃。夏季心气旺盛，易伤人气阴，在这个季节里，应以补气养阴、清署热为主，如冬瓜、西瓜、莲藕、鸭肉等，不宜多食温补、滋腻厚味之品。',
          ]
        },
        {
          title: '秋季养生食谱',
          description: '秋季阳气渐收，阴气渐长，此时人体也应顺应四时变化的规律，进入保护阴气的时机，在饮食方面应以防燥养阴、滋阴润肺为主。',
          tips: [
            '入秋饮食宜甘润。宜多选甘寒滋润之品，如百合、银耳、山药、梨、葡萄、荸荠、糯米、甘蔗、豆浆、芝麻、莲藕、菠菜、猪肺、鳖肉、橄榄等，这些食物有润肺生津、养阴清燥的作用。应少食葱、姜、辣椒等辛味之品。秋季饮食宜滋补。秋季引补是中医养生要旨之一，为冬令进补打好基础，避免冬季虚不受补的发生，可适当服用沙参、麦冬、百合、杏仁、川贝等中药材，对于缓解秋燥有良效。',
            '秋季宜少辛增酸。秋天要少吃一些葱、姜、蒜、韭菜、辣椒等辛味之品，以免伤及肺气；要多吃一些酸味的水果和蔬菜，要选择苹果、石榴、葡萄、芒果、柚子、柠檬、山楂等酸味食品，以防秋燥.',
          ]
        },
        {
          title: '冬季养生食谱',
          description: '冬季是万物生机潜伏闭藏的季节，此时天寒地冻人体血液循环减慢。中医认为，此时寒邪强盛，易伤及人体阳气，因此，冬季养生重在滋补。',
          tips: [
            '冬季饮食宜滋补。冬季饮食养生的基本原则是要顺应体内阳气的潜藏，敛阳护阴。可适当选用羊肉、狗肉、虾、韭菜、桂圆、木耳、栗子、核桃、甲鱼等食物；多吃些薯类，如甘薯、马铃薯等；蔬菜类如大白菜、圆白菜、白萝卜、黄豆芽、绿豆芽、油菜等。',
            '冬季忌食寒性物。冬三月草凋零、冰冻虫伏，是自然界万物闭藏的季节，人的阳气也要潜藏于内，脾胃功能相对虚弱，若再食寒凉，宜损伤脾胃阳气。因些冬季应少吃荸荠、柿子、生萝卜、生黄瓜、西瓜、鸭等性凉的食物。同时，不要吃得过饱，以免引起气血运行不畅，更不要饮酒御寒。',
          ]
        }
      ]
    };
    this.handleHeader = this.handleHeader.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleRegistClose = this.handleRegistClose.bind(this);
    this.handleGotoRegist = this.handleGotoRegist.bind(this);
    this.handleGotoLogin = this.handleGotoLogin.bind(this);
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
  }
  render() {
    let seasonLists = this.state.seasonData;
    let seasonTipsLists = [this.state.seasonData[0].tips, this.state.seasonData[1].tips, this.state.seasonData[2].tips, this.state.seasonData[3].tips];
    let springListItem = seasonTipsLists[0].map((item, index) =>
      <li key={index}>
        <p>{item}</p>
      </li>
    );
    let summerListItem = seasonTipsLists[1].map((item, index) =>
      <li key={index}>
        <p>{item}</p>
      </li>
    );
    let autumnListItem = seasonTipsLists[2].map((item, index) =>
      <li key={index}>
        <p>{item}</p>
      </li>
    );
    let winterListItem = seasonTipsLists[3].map((item, index) =>
      <li key={index}>
        <p>{item}</p>
      </li>
    );
    let seasonTipsListItem = [springListItem,summerListItem,autumnListItem,winterListItem];
    let seasonListItem = seasonLists.map((item, index) =>
      <li key={index}>
        <h3>{item.title}</h3>
        <h4>{item.description}</h4>
        <ul class="tips">{seasonTipsListItem[index]}</ul>
      </li>
    );
    return (
      <div id="article-season">
        <Header handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <ArticleHeader articleTitle="春夏秋冬四季食谱" />
        <article>
          <ul>{seasonListItem}</ul>
        </article>
        {this.state.loginOpenToggle?<Login handleLoginClose={this.handleLoginClose} handleGotoRegist={this.handleGotoRegist} loginTrue={this.loginTrue}/>:null}
        {this.state.registOpenToggle?<Regist handleRegistClose={this.handleRegistClose} handleGotoLogin={this.handleGotoLogin} registTrue={this.registTrue}/>:null}
        <Footer />
      </div>
    );
  }
}
ReactDom.render(
  <ArticleSeason />,
  document.getElementById('root')
)

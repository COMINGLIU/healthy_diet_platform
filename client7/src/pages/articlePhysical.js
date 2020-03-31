import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './css/commonCss/reset.css';
import './css/commonCss/iconfont.css';
import Header from './js/components/header.js';
import ArticleHeader from './js/components/articleHeader.js';
import './css/articlePhysical.css';
import Footer from './js/components/footer.js';
import Regist from './js/components/regist.js'
import Login from './js/components/login.js';

class ArticlePhysical extends Component {
  constructor(props){
    super(props);
    this.state = {
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      subMenu: [
        {
          title: "寒性体质",
          name: 'cold'
        },
        {
          title: '热性体质',
          name: 'hot'
        },
        {
          title: '实性体制',
          name: 'fool'
        },
        {
          title: '虚性体质',
          name: 'weak'
        },
      ],
      physicalData: [
        {
          id: 'cold',
          feature: '寒性体质',
          constitution: '畏风、畏冷、手脚经常冰凉，易伤风感冒；喜欢热食物和热饮料；不爱喝茶；脸色嘴唇比较苍白；舌头带	淡红色；精神萎靡不振，说话、动作有气无力；女性月经来迟，且天数增多，多血块。 ',
          tips: '要多食温热性蔬菜、食物，因为温热性蔬菜食物可以温暖身体、活化身体生理机能。 ',
          greens: '韭菜、姜、蒜、辣椒、葱等。'
        },
        {
          id: 'hot',
          feature: '热性体质',
          constitution: '经常口干、口臭、嘴破；喜欢喝冷饮或冰镇之类的食物；怕热、汗多、长时间体温偏高；易长痘疹、脸红、眼睛有血丝；常有便秘现象、尿少而黄；容易烦躁不安、易失眠、脾气较坏；女性经期提早，分泌物浓而有异味。 ',
          tips: '要多食寒凉性蔬菜、食物，因为寒凉性蔬菜、食物可达到清凉、调节的作用。 ',
          greens: '苦瓜、萝卜、冬瓜、白菜、黄瓜、竹笋等。'
        },
        {
          id: 'fool',
          feature: '实性体质',
          constitution: '身体强壮，声音宏亮，精神饱满，中气十足；有时口干口臭、便秘、小便色黄；呼吸气粗、容易腹胀；抵抗力强，常觉闷热；性格固执，不喜欢突然的变化。 ',
          tips: '要多食寒凉性的蔬菜、食物，寒凉性蔬菜食物可清凉、帮助代谢体内毒素。 ',
          greens: '芦笋、芹菜等。'
        }
      ],
      weakData: [
        {
          feature: '气虚',
          constitution: '食欲不振、脸色苍白、气喘气促、头晕不振。 ',
          greens: '菠菜、胡萝卜等。 '
        },
        {
          feature: '血虚',
          constitution: '脸色苍白萎黄、唇色指甲皆发白；经常头昏眼花、失眠健忘；女性月经量少。 ',
          greens:'菠菜、胡萝卜等。 '
        },
        {
          feature: '阴虚',
          constitution: '容易口渴、喜喝冷饮；形体消瘦、失眠健忘；经常盗汗、手足心发热、冒汗；常有便秘，且小便黄而舌质红。 ',
          greens: '白木耳、茄子、黄瓜等。 '
        },
        {
          feature: '阳虚',
          constitution: '喜欢热食，不爱喝水；畏寒、怕冷、易倦、嗜睡；性欲减退，阳萎早泄；尿多易腹泻。 ',
          greens: '辣椒、韭菜等。'
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
  render(){
    let physicalLists = this.state.physicalData;
    let physicalListItem = physicalLists.map((item,index)=>
      <li key={index}>
        <h3 id={item.id}>{item.feature}</h3>
        <p class="constitution">{item.constitution}</p>
        <p class="tips">{item.tips}</p>
        <p class="greens">{item.greens}</p>
      </li>
    );
    let weakLists = this.state.weakData;
    let weakListItem  = weakLists.map((item,index)=>
      <li key={item.index}>
        <h4>{item.feature}</h4>
        <p class="constitution">{item.constitution}</p>
        <p class="greens">{item.greens}</p>
      </li>
    );
    let subMenuLists = this.state.subMenu;
    let subMenuListItem = subMenuLists.map((item,index)=>
      <li key={index}><a name={item.name}>{item.title}</a></li>
    );
    return(
      <div id="article-physical">
        <Header handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <ArticleHeader articleTitle="什么样的体质吃什么样的食材"/>
        <article>
          <ul>{physicalListItem}</ul>
          <div class="weak">
            <h3 id="weak">虚性体质</h3>
            <ul>{weakListItem}</ul>
          </div>
          {/* <div class="sub-menu">
            <ul>{subMenuListItem}</ul>
          </div> */}
        </article>
        {this.state.loginOpenToggle?<Login handleLoginClose={this.handleLoginClose} handleGotoRegist={this.handleGotoRegist} loginTrue={this.loginTrue}/>:null}
        {this.state.registOpenToggle?<Regist handleRegistClose={this.handleRegistClose} handleGotoLogin={this.handleGotoLogin} registTrue={this.registTrue}/>:null}
        <Footer />
      </div>
    );
  }
}
ReactDOM.render(
  <ArticlePhysical />,
  document.getElementById('root')
)

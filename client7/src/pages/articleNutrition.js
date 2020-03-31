import React,{Component} from 'react';
import ReactDom from 'react-dom';
import './css/commonCss/reset.css';
import './css/commonCss/iconfont.css';
import './css/articleNutrition.css';
import './css/commonCss/iconfont.css';
import Header from './js/components/header.js';
import ArticleHeader from './js/components/articleHeader.js';
import Footer from './js/components/footer.js';
import Regist from './js/components/regist.js'
import Login from './js/components/login.js';

class ArticleNutrition extends Component {
  constructor(props){
    super(props);
    this.state = {
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      nutritionTogreens: [
        {
          name: '铁',
          greens: '桃类、青豆类、芦笋、菠菜、麦片、果实核仁类（如南瓜等）、豆腐保健功效：帮助含氧血液的循环、防止贫血。'
        },
        {
          name: '钙',
          greens: '花生、黄豆及黄豆制品（豆浆、豆腐等）、坚果类、胡桃、葵花子、绿色蔬菜类、奶类及乳制品'
        },
        {
          name: '锌',
          greens: '麦类、南瓜子、乳类、芥菜、杏仁果、豆浆、豆腐、未精制的五谷杂粮类'
        },
        {
          name: '镁',
          greens: '无花果、柠檬、葡萄柚、苹果、坚果类'
        },
        {
          name: '锰',
          greens: '坚果类、绿叶蔬菜类、青豆、甜菜、麦谷类'
        },
        {
          name: '钾',
          greens: '柑橘类、哈蜜瓜、蕃茄、薄荷、香蕉、葵花子等；海草类、洋葱、生长在含碘丰富土壤中的蔬菜类'
        },
        {
          name: '铬',
          greens: '玉米、麦谷类'
        },
        {
          name: '硒',
          greens: '麦芽、洋葱、蕃茄、芥兰'
        },
        {
          name: '维生素A',
          greens: '红萝卜、黄绿色蔬菜类、黄色水果类'
        },
        {
          name: '胡萝卜素',
          greens: '红萝卜、胡萝卜、绿叶蔬菜类'
        },
        {
          name: '维生素B1',
          greens: ' 麦谷类、燕麦、花生、蔬果类等'
        },
        {
          name: '维生素B2',
          greens: '燕麦、谷类、绿色蔬果类'
        },
        {
          name: '维生素B3',
          greens: ' 全麦类、燕麦、花生、酪梨等'
        },
        {
          name: '维生素B6',
          greens: ' 麦胚、麦芽、哈蜜瓜、甜瓜、丽菜、山楂果等'
        },
        {
          name: '维他命类复合体（PABA）',
          greens: '米糖、麦胚、谷类、糖蜜等'
        },
        {
          name: '维生素C',
          greens: ' 柚子类、草莓类、柑橘类、绿叶蔬菜类、蕃茄、玉米、马铃薯、生菜'
        },
        {
          name: '维生素D',
          greens: '多晒太阳可获得足量维生素，或自富化豆奶（milk）中摄取。食品来源：乳酪、添加维他命D的营养强化食品'
        },
        {
          name: '抗坏血酸',
          greens: '玉米、柑橘类、绿叶蔬菜类、蕃茄、马铃薯等'
        },
        {
          name: '维生素E',
          greens: '全麦类、麦芽油、豆类、芥兰、蔬菜、油芽、菜类、菠菜、花椰菜'
        },
        {
          name: '维生素H',
          greens: '坚果类、果类、糙米类、乳品等'
        },
        {
          name: '叶绿素',
          greens: '大麦草、小麦草、蔬菜的叶子'
        },
        {
          name: '烟酸胺',
          greens: '麦谷类、麦胚芽、花生类、酪梨'
        },
        {
          name: '叶酸',
          greens: '绿叶蔬果类、红萝卜、麦谷、南瓜、甜瓜类、豆类等'
        },
        {
          name: '胱胺酸',
          greens: '组成蛋白质之28种胺酸之一，存在于各种天然植物中'
        }
      ],
      valueHeight: [
        {
          category: '甲类蔬菜',
          text: '富含胡罗卜素、核黄素、维生素C、钙、纤维等，营养价值较高，主要有小白菜、菠菜、芥菜、苋菜、韭菜、雪里红等。'
        },
        {
          category: '乙类蔬菜',
          text: '营养次于甲类，通常又分3种：第一种含核黄素，包括所有新鲜豆类和豆芽；第二种含胡萝卜素和维生素C较多，包括胡萝卜、芹菜、大葱、青蒜、番茄、辣椒、红薯等；第三类主要含维生素C，包括大白菜、包心菜、菜花等。'
        },
        {
          category: '丙类蔬菜',
          text: '含维生素类较少，但含热量高，包括洋芋、山药、芋头、南瓜等。'
        },
        {
          category: '丁类蔬菜',
          text: '含少量维生素C，营养价值较低，有冬瓜、竹笋、茄子、茭白'
        },
      ],
      colorGreens: [
        {
          color: '绿色',
          detail: '绿色蔬菜主要包括芥菜、菠菜等，含有丰富的维生素C、维生素B1、维生素B2、胡萝卜素及多种微量元素，对高血压及失眠有一定的治疗作用，并有益肝脏。'
        },
        {
          color: '黄色',
          detail: '黄色蔬菜主要有韭黄、南瓜、胡萝卜等，富含维生素E，能减少皮肤色斑，调节胃肠道消化功能，对脾、胰等脏器有益。'
        },
        {
          color: '红色',
          detail: '红色蔬菜有番茄、红辣椒等，能提高食欲、刺激神经系统兴奋。'
        },
        {
          color: '紫色',
          detail: '紫色蔬菜有紫茄子、紫扁豆等，有调节神经和增加肾上腺分泌的功效。紫茄子中的维生素P还能增强细胞之间的黏附力，降低脑血栓的发生几率。'
        },
        {
          color: '白色',
          detail: '白色蔬菜有茭白、莲藕、竹笋、白萝卜等，可以调节视觉、安定情绪，对高血压和心肌病患者有一定的益处。'
        },
      ],
      healthyTips: [
        '各类蔬菜的营养特点各不相同，一般地，深色蔬菜的营养价值比浅色的高，维生素C、β胡萝卜素、维生素B2、铁、钾、钙等含量较多；植物化学物质较多，抗氧化、抗癌、保护心脑血管、调节免疫力的作用更强。所以每天摄入的300～500克蔬菜中，应该有一半是深色蔬菜。',
        '深色蔬菜指深绿色蔬菜(如菠菜、油菜、绿苋菜、茼蒿、芹菜叶、空心菜、菜心、莴笋叶、芥菜、西兰花、生菜、小葱、韭菜、萝卜缨、青椒、蒜薹、荷兰豆、四季豆、豇豆、苦瓜等)、红色或橘红色蔬菜(如西红柿、胡萝卜、红萝卜、南瓜、红辣椒等)和紫红色蔬菜(如红苋菜、紫甘蓝、茄子等)。',
        '浅色蔬菜则指大白菜、大头菜、白萝卜、莴笋、黄瓜、西葫芦、冬瓜等。'
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
    let nutritionTogreensListItem = this.state.nutritionTogreens.map((item,index)=>
      <li key={item.name}>
        <span>{item.name}</span>
        <span>{item.greens}</span>
      </li>
    );
    let valueHeightListItem = this.state.valueHeight.map((item,index)=>
      <li key={item.category}>
        <h4>{item.category}</h4>
        <p>{item.text}</p>
      </li>
    );
    let colorGreensListItem = this.state.colorGreens.map((item,index)=>
      <li key={item.color}>
        <p>{item.detail}</p>
      </li>
    );
    let healthyTipsListItem = this.state.healthyTips.map((item,index)=>
      <li key={index}>
        <p>{item}</p>
      </li>
    );
    return(
      <div id="article-nutrition">
        <Header handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <ArticleHeader articleTitle="春夏秋冬四季食谱" />
        <article>
          <div class="left">
            <div class="valueHeight">
              <h3>蔬菜的营养价值高低</h3>
              <ul>{valueHeightListItem}</ul>
            </div>
            <div class="nutritionTogreens">
              <h3>所含营养成分对应的蔬菜</h3>
              <ul>{nutritionTogreensListItem}</ul>
            </div>
          </div>
          <div class="right">
            <div class="healthyTips">
              <h3>健康小贴士</h3>
              <ul>{healthyTipsListItem}</ul>
            </div>
            <div class="colorGreens">
              <h3>不同颜色蔬菜的营养效果</h3>
              <ul>{colorGreensListItem}</ul>
            </div>
          </div>
        </article>
        {this.state.loginOpenToggle?<Login handleLoginClose={this.handleLoginClose} handleGotoRegist={this.handleGotoRegist} loginTrue={this.loginTrue}/>:null}
        {this.state.registOpenToggle?<Regist handleRegistClose={this.handleRegistClose} handleGotoLogin={this.handleGotoLogin} registTrue={this.registTrue}/>:null}
        <Footer />
      </div>
    );
  }
}
ReactDom.render(
  <ArticleNutrition />,
  document.getElementById('root')
)

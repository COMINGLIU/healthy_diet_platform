import React,{Component} from 'react';

class Beauty extends Component {
  constructor(props){
    super(props);
    this.state = {
      beautyList: [
        {
          colloId: '',
          vegsName: '芝麻,海带',
          colloEffect: '美容， 防衰老。芝麻能改善血液循环，促进新陈代谢，降低胆固醇。海带则含有丰富的碘和钙，能净化血液，促进甲状腺素的合成。同食则美容、抗衰老效果更佳。 '
        },
        {
          colloId: '',
          vegsName: '猪肚,豆芽',
          colloEffect: '常吃可洁白皮肤及增强免疫功能，还可抗癌。'
        },
        {
          colloId: '',
          vegsName: '乌鱼,黄瓜',
          colloEffect: '清热利尿、健脾益气、健身美容、减肥。 '
        },
        {
          colloId: '',
          vegsName: '香菇,蘑菇',
          colloEffect: '滋补强壮、消食化痰、清神降压、滑润皮肤和抗癌作用。 '
        },
        {
          colloId: '',
          vegsName: '蘑菇,扁豆',
          colloEffect: '健肤、长寿。 '
        },
        {
          colloId: '',
          vegsName: '玉竹,豆腐',
          colloEffect: '温暖身体、消除疲劳、美肌益颜。'
        },
        {
          colloId: '',
          vegsName: '葱,兔肉',
          colloEffect: '此菜肉嫩易消化，降血脂、美容。 '
        },
        {
          colloId: '',
          vegsName: '鲶鱼头,豆腐',
          colloEffect: '营养丰富，美容美体。 '
        },
        {
          colloId: '',
          vegsName: '鸡翅,油菜',
          colloEffect: '对强化肝脏及美化肌肤非常有效。 '
        },
        {
          colloId: '',
          vegsName: '莲子,地瓜',
          colloEffect: '适宜于大便干燥，习惯性便秘、习惯性便秘、慢性肝病、癌症患者等食用，此粥还具有美容功能。'
        },
        {
          colloId: '',
          vegsName: '猪腰,黑木耳',
          colloEffect: '常吃可降低心血管病发病率，起养颜、抗衰老的作用。 '
        },
        {
          colloId: '',
          vegsName: '豆苗,猪肉',
          colloEffect: '预防糖尿病，有利尿、止泻、消肿、止痛和助消化等作用，使肌肤清爽不油腻。'
        },
        {
          colloId: '',
          vegsName: '核桃,红枣',
          colloEffect: '可谓人体提供全面的营养物质，具有美容养颜的作用。'
        },
        {
          colloId: '',
          vegsName: '牛奶,芒果',
          colloEffect: '芒果富含维生素A、C，有利于视力健康，延缓细胞衰老的作用。牛奶是美容上品，二者同时食用效果更佳。'
        },
        {
          colloId: '',
          vegsName: '桂圆,百合、红糖',
          colloEffect: '桂圆对于心血不足型失眠，有很大的食疗作用，若与百合、红糖搭配食用，对妊娠杂症有一定疗效。桂圆百合是由桂圆、百合加上红糖熬制的一道健康汤品，含有丰富的氨基酸及微量元素，具有补血补气，美容养颜的功效。每日早晚服用桂圆百合汤，能够养血补脑，宁心安神，延年益寿，特别适合失眠，多梦，记忆力减退的人群食用。'
        },
        {
          colloId: '',
          vegsName: '山药,栗子',
          colloEffect: '山药、栗子同食，既可以补肾健脾，又能美容养颜、延年益寿，特别适合于女性和老年人，是可以很好的保护皮肤健康的，同时还能有效抗衰老。'
        },
      ]
    };
  }
  render(){
    let lists = this.state.beautyList;
    let listItem = lists.map((item,index) => {
      let vegsName = item.vegsName.split(',');
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
    return(
      <div id="beauty">
        <a name="beauty"><h3>美容膳食</h3></a>
        <div className="sub-content">
          <ul>{listItem}</ul>
        </div>
      </div>
    );
  }
}
export default Beauty;
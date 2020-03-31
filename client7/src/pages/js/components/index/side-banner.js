import React,{Component} from 'react';

class SideBanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      matchRecommend: [
        {
          id: '1',
          first: "百合",
          second: '鸡蛋',
          text: '滋阴润燥， 清心安神。百合能清痰火，补虚损，而蛋黄能除烦热，补阴血，同食可以更好地清心补阴。'
        },
        {
          id: '2',
          first: "鱼",
          second: '豆腐',
          text: '豆腐中的蛋氨酸含量较少，而鱼肉中这种氨基酸含量丰富;鱼肉苯丙氨酸含量比较少，而在豆腐中含量较高。因此，这两者混合食用，可取长补短，提高营养价值。更重要的是，豆腐含钙多，而鱼肉中丰富的维生素D能加强人体对钙的吸收，使其补钙效果更佳。'
        },
        {
          id: '3',
          first: "羊肉",
          second: '生姜',
          text: '冬令补虚佳品， 可治腰背冷痛、四肢风湿疼痛等。原理：羊肉可补气血和温肾阳，生姜有止痛祛风湿等作用。同食，生姜既能去腥膻等滋味，又能有助羊肉温阳祛寒。 '
        },
        {
          id: '4',
          first: "猪肝",
          second: '菠菜',
          text: '可防治贫血。猪肝富含叶酸、维生素B12以及铁等造血原料，菠菜也含有较多的叶酸和铁，同食两种食物，一荤一素，相辅相成。'
        },
        {
          id: '5',
          first: "鸭肉",
          second: '山药',
          text: '山药的柔和与鸭肉的鲜美相得益彰，还能让汤汁乳白，鲜味柔和。山药富含多种营养物质，有益肺止咳、健脾养胃的功效，鸭肉更是滋阴养肺、止咳化痰的佳品，故而两者一起煲汤不仅口味鲜美，还能健脾养胃、止咳化痰。'
        },
        {
          id: '6',
          first: "鸡肉",
          second: '栗子',
          text: '补血养身， 适于贫血之人。鸡肉为造血疗虚之品，栗子重在健脾。栗子烧鸡不仅味道鲜美，造血功能更强，尤以老母鸡烧栗子效果更佳。'
        },
        {
          id: '7',
          first: "豆腐",
          second: '萝卜',
          text: '有利消化。豆腐富含植物蛋白， 脾胃弱的人多食会引起消化不良。萝卜有很强的助消化能力，同煮可使豆腐营养被大量吸收。 '
        },
        {
          id: '8',
          first: "牛肉",
          second: '土豆',
          text: '牛肉营养价值高，并有健脾胃的作用。土豆与之同煮，不但味道好，且土豆含有丰富的维生素，能起到保障胃黏膜的作用。'
        },
        {
          id: '9',
          first: "芝麻",
          second: '海带',
          text: '美容， 防衰老。芝麻能改善血液循环，促进新陈代谢，降低胆固醇。海带则含有丰富的碘和钙，能净化血液，促进甲状腺素的合成。同食则美容、抗衰老效果更佳。 '
        }
      ]
    };
  }
  render(){
    let lists = this.state.matchRecommend;
    let listItem = lists.map((item) => 
      <li key={item.id}>
        <h4>
          <span>{item.first}</span>
          <i>+</i>
          <span>{item.second}</span>
        </h4>
        <p>{item.text}</p>
      </li>
    );
    return(
      <div id="side-banner">
        <span className="check-btn">
          <i className="iconfont icon-Icon_back"></i>
        </span>
        <div className="side-recommend-area">
          <ul>{listItem}</ul>
        </div>
        <span className="check-btn">
          <i className="iconfont icon-Icon_enter_gray"></i>
        </span>
      </div>
    );
  }
}
export default SideBanner;
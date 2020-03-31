import React,{Component} from 'react';

class LoseFit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loseLise: [
        {
          colloId: '',
          vegsName: '海带,冬瓜',
          colloEffect: '补充矿物质、降压解暑。海带含钙磷铁维生素B族等营养素，对利尿降压、消肿、润肠、抗癌有食疗作用。冬瓜跟海带一样同属夏季清热解暑的食物，这两种食物搭配在一起，不仅能消暑，还有助于减肥瘦身。'
        },
        {
          colloId: '',
          vegsName: '黄瓜,木耳',
          colloEffect: '减肥、滋补强壮、和血、平衡营养。 '
        },
        {
          colloId: '',
          vegsName: '鲫鱼,黑木耳',
          colloEffect: '很适合减肥、年老体弱者食用，且润肤养颜。 '
        },
        {
          colloId: '',
          vegsName: '乌鱼,黄瓜',
          colloEffect: '清热利尿、健脾益气、健身美容、减肥。 '
        },
        {
          colloId: '',
          vegsName: '黄瓜,马铃薯、西红柿',
          colloEffect: '减肥、润肤、延缓衰老的作用。 '
        },
        {
          colloId: '',
          vegsName: '豆腐,生菜',
          colloEffect: '具有滋阴补肾、增白皮肤、减肥健美的作用。 '
        },
        {
          colloId: '',
          vegsName: '韭菜,豆芽',
          colloEffect: '解毒、补虚，通肠利便，有利于肥胖者对脂肪的消耗，有助于减肥。 '
        },
        {
          colloId: '',
          vegsName: '豆角,木耳、鸡肉',
          colloEffect: '益气养胃润肺、降脂减肥、活血调经。'
        },
        {
          colloId: '',
          vegsName: '凤尾菇,木瓜',
          colloEffect: '补中益气、减脂、减肥、降压、健胃助消化以及提高免疫力。'
        },
        {
          colloId: '',
          vegsName: '甲鱼,冬瓜',
          colloEffect: '润肤健肤、明目、生津止渴、除湿利尿、散热解毒，多吃还有助于减肥。'
        },
        {
          colloId: '',
          vegsName: '草莓,山楂',
          colloEffect: '两者同食具有消食减肥的功效，对消化不良也有一定疗效。'
        }
      ]
    };
  }
  render(){
    let lists = this.state.loseLise;
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
      <div id="lose-fit">
        <a name="lose-fit"><h3>减肥膳食</h3></a>
        <div className="sub-content">
          <ul>{listItem}</ul>
        </div>
      </div>
    );
  }
}
export default LoseFit;
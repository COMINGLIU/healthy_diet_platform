import React,{Component} from 'react';

class VegMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      vegetables: [
        {
          id: '1',
          title: '叶菜和嫩茎类',
          vegs: ['芦荟','菠菜','芹菜','油菜','香菜','卷心菜','生菜','空心菜','苋菜','黄花菜','西洋菜','茼蒿','红甜菜','豆瓣菜','秋葵','莴苣','甘蓝菜','高丽菜']
        },
        {
          id: '2',
          title: '根茎叶类',
          vegs: ['胡萝卜','白萝卜','芥菜','小白菜','大白菜','圆白菜']
        },
        {
          id: '3',
          title: '花类蔬菜',
          vegs: ['花菜(花椰菜)','西兰花']
        },
        {
          id: '4',
          title: '葱蒜',
          vegs: ['大蒜','姜','韭菜','洋葱','青椒','红辣椒','红灯笼椒','蒜头']
        },
        {
          id: '5',
          title: '瓜类',
          vegs: ['黄瓜','南瓜','冬瓜','丝瓜','苦瓜','甜瓜','老黄瓜','西葫芦']
        },
        {
          id: '6',
          title: '豆类',
          vegs: ['黑豆','绿豆','黄豆','毛豆','豌豆','白豆角','扁豆','蚕豆']
        },
        {
          id: '7',
          title: '薯芋类蔬菜',
          vegs: ['土豆','番薯(红薯)','芋头','山药(山芋)',]
        },
        {
          id: '8',
          title: '水生蔬菜',
          vegs: ['莲藕','鱼腥草','荸荠(马蹄)','茭白','慈姑']
        },
        {
          id: '9',
          title: '茄果类',
          vegs: ['茄子','番茄']
        },
        {
          id: '10',
          title: '海藻类',
          vegs: ['紫菜','海带','发菜']
        },
        {
          id: '11',
          title: '食用菌类',
          vegs: ['黑木耳','金针菇','香菇','银耳(雪耳)']
        },
        {
          id: '12',
          title: '笋类',
          vegs: ['竹笋','芦笋','莴笋','冬笋']
        },
        {
          id: '13',
          title: '坚果类',
          vegs: ['枸杞','枸杞','杏仁','核桃','芝麻','莲子','松子','花生','白果']
        },
        {
          id: '14',
          title: '芽菜类',
          vegs: ['豆芽菜','香椿芽','海带芽','豆苗','芽菜','大豆芽']
        },
        {
          id: '15',
          title: '其他蔬菜',
          vegs: ['豆腐','百合','玉米','白菜干','牛蒡','云耳']
        },
        {
          id: '16',
          title: '蛋类',
          vegs: ['鸡蛋','鸭蛋','鹌鹑蛋']
        },
        {
          id: '17',
          title: '牛奶/粗粮',
          vegs: ['牛奶','粳米','荞麦','糯米','燕麦','米']
        }
      ],
    }
  }

  render(){
    let vegetableData = this.state.vegetables;

    let vegetableUl = [];
    for(var i=0,len=vegetableData.length;i<len;i++){
      var tempList = vegetableData[i].vegs.map(item=>
        <li key={item}>{item}</li>
      );
      vegetableUl.push(<ul className="menu-list">{tempList}</ul>);
    }
    let vegetableLIstItems = vegetableData.map((item,index)=>
      <li key={item.id}>
        <h3>{item.title}</h3>
        {vegetableUl[index]}
      </li>
    );
    return(
      <ul onClick={this.props.handleChooseMenuSearch}>
        {vegetableLIstItems}
      </ul>
    );
  }
}
export default VegMenu;
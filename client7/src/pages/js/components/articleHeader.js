import React,{Component} from 'react';
import '../../css/commonCss/articleHeader.css';


class ArticleHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      subHeader:[
        {
          title: '什么样的体质吃什么样的食材',
          url: '/articlePhysical.html'
        },
        {
          title: '春夏秋冬四季食谱',
          url: '/articleSeason.html'
        },
        {
          title: '食品搭配禁忌',
          url: '/articleAvoid.html'
        },
        {
          title: '蔬菜营养成分',
          url: '/articleNutrition.html'
        }
      ]
    };
  }
  render(){
    let lists = this.state.subHeader;
    let listItem = lists.map((item,index) => 
      <li key={index}><a href={item.url}>{item.title}</a></li>
    );
    return(
      <div className="article-header">
        <div className="sub-header">
          <ul>{listItem}</ul>
          <h2>{this.props.articleTitle}</h2>
        </div>
      </div>
    );
  }
}
export default ArticleHeader;


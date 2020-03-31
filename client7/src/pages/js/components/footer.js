import React,{Component} from 'react';
import '../../css/commonCss/footer.css';

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      hotSearchWords: ["热搜词汇：","西兰花","土豆","牛肉","豆腐","西红柿","鸡蛋","香菇","蘑菇","金针菇","海带","莲藕","山药","黄瓜","苦瓜","南瓜","胡萝卜","大白菜"],
      healthyDec: "Less greasy， more light， health of the premise， less spicy， more vegetables， healthy core， less smoking， more exercise， healthy root， drink less， and often physical， wish you good health， happiness lifetime！"
    };
    this.handleFootSearch = this.handleFootSearch.bind(this);
  }
  handleFootSearch(e){
    this.setState({
      searchValue: e.target.value
    })
  }
  render(){
    let lists = this.state.hotSearchWords;
    let listItem = lists.map((item,index) => 
      <li key={index}>
        {item}
      </li>
    );
    return (
      <footer>
        <div className="footer-search">
          <div className="footer-search-box">
            <input type="text" name="text" value={this.state.searchValue} onChange={this.handleFootSearch}/>
            <a href={this.state.searchValue?"./minihome.html?vegName="+this.state.searchValue:'./minihome.html'} target="_blank">
              <i className="iconfont icon-Icon_search"></i>
            </a>
          </div>
          <ul className="hot-seach-words">
            {listItem}
          </ul>
        </div>
        <p class="healthy-dec">{this.state.healthyDec}</p>
      </footer>
    );
  }
}
export default Footer;
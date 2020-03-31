import React,{Component} from 'react';
import Beauty from './beauty.js';
import LoseFit from './lose-fit.js';
import Healthy from './healthy.js';
import ContentRight from './content-right.js';

class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      anchor: [
        {
          text: '美容',
          name: 'beauty'
        },
        {
          text: '减肥',
          name: 'lose-fit'
        },
        {
          text: '养生',
          name: 'healthy'
        },
      ],
      anchorShow: true
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleToTop = this.handleToTop.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    window.addEventListener('scroll',this.handleScroll);
  }
  handleScroll(event){
    let scroll = document.documentElement.scrollTop||window.scrollY||window.pageYOffset;
    if(scroll>500){
      this.setState({
        anchorShow: true
      });
      document.getElementsByClassName("up")[0].style.display = 'block';
    }else {
      this.setState({
        anchorShow: false
      });
      document.getElementsByClassName("up")[0].style.display = 'none';
    }
  }
  handleToTop(){
    let oHtml = document.documentElement;
    let timer = null;
    if(oHtml.scrollTop>0){
      oHtml.scrollTop -= oHtml.scrollTop/10;
      timer = window.requestAnimationFrame(this.handleToTop);
    }else {
      window.cancelAnimationFrame(timer);
    }
  }
  handleClick(e){
    let target = e.target||e.srcElement;
  }
  render(){
    let lists = this.state.anchor;
    let listItem = lists.map(item => 
      <li key={item.text} >
        <a  href={"#"+item.name}>{item.text}</a>
      </li>
    );
    // 控制锚点menu出不出现
    let anchorshow = this.state.anchorShow?"block":"none";
    return(
      <div id="content">
        <div id="content-left" onClick={this.handleClick}>
          <div className="sub-menu">
            <ul id="anchor" style={{display: anchorshow}}>
              {listItem}
            </ul>
            <div className="up" onClick={this.handleToTop}>top</div>
          </div>
          <Beauty />
          <LoseFit />
          <Healthy 
            healthyList={this.props.healthyList}
            handleClickAddMore={this.props.handleClickAddMore}
          />
        </div>
        <ContentRight />
      </div>
    );
  }
}
export default Content;
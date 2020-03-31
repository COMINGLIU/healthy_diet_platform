import React,{Component} from 'react';
import { encode } from 'punycode';

class Healthy extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render(){
    let lists = this.props.healthyList;
    let listItem = lists.map((item,index) => {
      let vegsName = item.vegsName.split('，');
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
    // let vegsList = 
    return(
      <div id="healthy">
        <a name="healthy"></a>
        <h3>养生膳食</h3>
        <div className="sub-content">
          <ul>{listItem}</ul>
          <p className="click-add-more" onClick={this.props.handleClickAddMore}>点击加载更多</p>
        </div>
      </div>
    );
  }
}
export default Healthy;
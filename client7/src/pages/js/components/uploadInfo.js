import React,{Component} from 'react';

class UploadInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      infoList: [
        {
          name: 'time',
          text: '时间'        
        },
        {
          name: 'viewNum',
          text: '浏览量'
        },
        {
          name: 'remarkNum',
          text: '评论量'
        }
      ]
    }
  }
  render(){
    let infoListItem = this.state.infoList.map((item,index)=>
      <li key={index}>
        <span>{item.text==="时间"?"":item.text}</span>
        <span>{this.props[item.name]}</span>
      </li>
    );
    let uploadName = this.props.name;
    return(
      <div className="upload-info">
        <p>
          <i className="iconfont icon-wode_"></i>
          <span>{uploadName}</span>
        </p>
        <ul>{infoListItem}</ul>
      </div>
    );
  }
}
export default UploadInfo;
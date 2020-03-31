import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/commonCss/iconfont.css';
import '../css/usercenter/myRemark.css';
import UserCenter from '../js/components/usercenter.js';
import serverUrl from '../js/modules/serverUrl.js';

class MyRemark extends Component {
  constructor(props){
    super(props);
    this.state = {
      remark: [
        // {
        //   type: 'article',
        //   editId: 23,
        //   title: 'title',
        //   remarkText: '测试评论',
        //   remarkTime: 'sdcs'
        // },
        // {
        //   type: 'article',
        //   editId: 23,
        //   title: 'title2',
        //   remarkText: '测试评论',
        //   remarkTime: 'sdcs'
        // }
      ]
    }
  }
  componentDidMount(){
    let that = this;
    fetch(serverUrl+'/usercenter/getMyRemark',{
      method: 'get',
      mode: 'cors',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
        that.setState({
          remark: res.data
        })
        break;
        case 'fail':
          alert(res.msg);
          break;
        case 'ovedue':
          if(confirm(res.msg)){
            window.localStorage.email="";
            window.location.reload();
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  render(){
    let remarkList = this.state.remark.map((item,index) => 
      <li key={index}>
        <a href={'../share/shareDetail?type='+item.type+'&id='+item.editId} target="_blank"><h4>{item.title}</h4></a>
        <p><span>re:</span>{item.remarkText}</p>
        <time>{item.remarkTime}</time>
      </li>
    )
    return(
      <UserCenter>
        <h3>我的评论</h3>
        <ul className="myRemark user-detail-info">{remarkList}</ul>
      </UserCenter>
    );
  }
}
ReactDOM.render(
  <MyRemark />,
  document.getElementById('root')
);
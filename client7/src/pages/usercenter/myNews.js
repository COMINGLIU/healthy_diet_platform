import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/commonCss/iconfont.css';
import '../css/usercenter/myNews.css';
import UserCenter from '../js/components/usercenter.js';
import serverUrl from '../js/modules/serverUrl.js';

class MyNews extends Component {
  constructor(props){
    super(props);
    this.state = {
      myNewsData:[
        {
          type: 'article',
          editId: 23,
          title: 'title',
          remark: '测试评论',
          userName: '用户1',
          reply: '测试回复',
          remarkTime: ''
        },
        {
          type: 'article',
          editId: 23,
          title: 'title',
          remark: '测试评论',
          userName: '用户2',
          reply: '测试回复',
          remarkTime: ''
        }
      ]
    };
  }
  componentDidMount(){
    fetch(serverUrl+'/usercenter/getMyNews',{
      method: 'get',
      mode: 'cors',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }
  render(){
    let myNewsDataList = this.state.myNewsData.map((item,index) =>
      <li>
        <a href={'../share/shareDetail?type='+item.type+'&id='+item.editId} target="_blank"><h4>{item.title}</h4></a>
        <p>{item.remark}</p>
        <p><span>{item.userName}:</span>{item.remark}</p>
      </li>
    );  
    return(
      <UserCenter>
        <h3>我的消息</h3>
        <ul className="myNews user-detail-info">{myNewsDataList}</ul>
      </UserCenter>
    );
  }
}
ReactDOM.render(
  <MyNews />,
  document.getElementById('root')
);
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/commonCss/iconfont.css';
import '../css/usercenter/myPost.css';
import UserCenter from '../js/components/usercenter.js';
import serverUrl from '../js/modules/serverUrl.js';

class MyPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      myPostData: [
        // {
        //   type: 'article',
        //   id: 2,
        //   title:  'ksdncdk',
        //   time: 'ksdcsk'
        // },
        // {
        //   type: 'video',
        //   id: 4,
        //   title:  'sdkcn',
        //   time: 'ksdcsk'
        // },
        // {
        //   type: 'audio',
        //   id: 5,
        //   title:  'ksdncks',
        //   time: 'ksdcsk'
        // }
      ]
    };
    this.handleMyPost = this.handleMyPost.bind(this);
  }
  handleMyPost(e){
    let target = e.target;
    let type="",itemId="",index;
    let that = this;
    if(target.className==="iconfont icon-shanchu"){
      if(confirm('确定删除吗')){
        type=target.parentNode.parentNode.dataset.type;
        itemId=target.parentNode.parentNode.dataset.itemid;
        index = target.parentNode.parentNode.dataset.index;
        fetch(serverUrl+'/usercenter/delPost?type='+type+'&id='+itemId,{
          method: 'get',
          mode: 'cors',
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          switch(res.status){
            case 'success':
              let newMyPostData  = that.state.myPostData;
              newMyPostData.splice(index,1);
              that.setState({
                myPostData: newMyPostData
              })
              break;
            case 'fail':
              alert(res.msg);
              break;
            case 'overdue':
              if(confirm(res.msg)){
                window.localStorage.email="";
                window.location.reload();
              }
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
  componentDidMount(){
    let that = this;
    fetch(serverUrl+'/usercenter/getMyPost',{
      method: 'get',
      mode: 'cors',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          that.setState({
            myPostData: res.data
          })
          break;
        case 'fail':
          alert(res.msg);
          break;
        case 'overdue':
          if(confirm(res.msg)){
            window.localStorage.email="";
            window.location.reload();
          }
          break;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  render(){
    let myPostList = this.state.myPostData.map((item,index) =>
      <li key={index} data-type={item.type} data-itemid={item.id} data-index={index}>
        <a href={"../share/shareDetail?type="+item.type+'&id='+item.id} target="_blank"><h4>{item.title}</h4></a>
        <time>{item.time}</time>
        <button className="del"><i className="iconfont icon-shanchu"></i></button>
        <a className="edit" href={"../share/edit.html?type="+item.type+'&id='+item.id} target="_blank"><i className="iconfont icon-Icon_edit "></i></a>
      </li>
    );
    return(
      <UserCenter>
        <h3>我的帖子</h3>
        <ul className="myPost user-detail-info" onClick={this.handleMyPost}>{myPostList}</ul>
      </UserCenter>
    );
  }
}
ReactDOM.render(
  <MyPost />,
  document.getElementById('root')
);
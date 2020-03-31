import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/commonCss/iconfont.css';
import '../css/usercenter/myCollect.css';
import UserCenter from '../js/components/usercenter.js';
import serverUrl from '../js/modules/serverUrl.js';

class MyCollection extends Component {
  constructor(props){
    super(props);
    this.state = {
      collectData: [
        {
          colloId: 2,
          vegsName: '西红柿，芹菜',
          vegsId: '2，3',
          colloEffect: '思考才能是你打开你',
        },
        {
          colloId: 3,
          vegsName: '芹菜，白菜',
          vegsId: '1，2',
          colloEffect: '随便写写',
        }
      ]
    };
  }
  componentDidMount(){
    fetch(serverUrl+'/usercenter/getMyCollection',{
      method: 'get',
      mode: 'cors',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          break;
        case 'fail':  
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
    let collectLists = this.state.collectData.map((item,index) => {
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
            <a href={"./vegetableCollocation.html?colloId="+item.colloId} target="_blank">
              <h4>
                {vegsList}
              </h4>
              <p>{item.colloEffect}</p>
            </a>
            <button className="del"><i className="iconfont icon-shanchu"></i></button>
        </li>
        );
      }
    );
    return(
      <UserCenter>
        <h3>我的收藏</h3>
        <ul className="myCollection user-detail-info">{collectLists}</ul>
      </UserCenter>
    );
  }
}
ReactDOM.render(
  <MyCollection />,
  document.getElementById('root')
);